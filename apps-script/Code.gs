const MAX_FLYER_BYTES = 8 * 1024 * 1024;
const MAX_SET_BYTES = 18 * 1024 * 1024;
const MAX_TOTAL_UPLOAD_BYTES = 22 * 1024 * 1024;
const MAX_SUBMISSIONS_PER_TOKEN_PER_DAY = 5;
const MAX_SUBMISSIONS_PER_DAY = 30;
const USER_ERROR_PREFIX = 'USER:';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Intake')
    .setTitle('Wavestyle · Proponer una fecha')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitProposal(form) {
  let proposalFolder;
  try {
    const config = getConfig_();
    const token = requiredText_(form && form.accessToken, 200, 'Ingresá el token de acceso.');
    const tokenHash = sha256Hex_(token);
    const tokenIsAllowed = config.accessTokenHashes
      .map(hash => constantTimeEquals_(hash, tokenHash))
      .reduce((allowed, matches) => allowed || matches, false);
    if (!tokenIsAllowed) {
      throw userError_('El token no es válido. Revisalo e intentá de nuevo.');
    }

    checkRateLimit_(tokenHash);
    const proposal = validateProposal_(form);
    const rootFolder = DriveApp.getFolderById(config.driveFolderId);
    const sharing = rootFolder.getSharingAccess();
    if (sharing === DriveApp.Access.ANYONE || sharing === DriveApp.Access.ANYONE_WITH_LINK) {
      throw userError_('El destino de almacenamiento no es privado. Avisale al administrador.');
    }

    const proposalId = Utilities.getUuid();
    const safeTitle = proposal.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48) || 'evento';
    proposalFolder = rootFolder.createFolder(`${proposal.eventDate}-${safeTitle}-${proposalId.slice(0, 8)}`);

    const flyerFile = saveUpload_(proposalFolder, proposal.flyer, 'flyer');
    const setFile = proposal.djSet
      ? saveUpload_(proposalFolder, proposal.djSet, 'dj-set')
      : null;

    const record = {
      id: proposalId,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      event: {
        title: proposal.title,
        date: proposal.eventDate,
        time: proposal.eventTime,
        genre: proposal.genre,
        venue: proposal.venue,
        city: proposal.city,
        description: proposal.description,
        ticketsUrl: proposal.ticketsUrl,
        promoterUrl: proposal.promoterUrl,
        youtubeUrl: proposal.youtubeUrl,
      },
      submittedBy: {
        name: proposal.contactName,
        email: proposal.contactEmail,
      },
      files: {
        flyer: fileRecord_(flyerFile),
        djSet: setFile ? fileRecord_(setFile) : null,
      },
      consent: true,
    };

    proposalFolder.createFile(
      Utilities.newBlob(JSON.stringify(record, null, 2), 'application/json', 'proposal.json'),
    );

    const notificationSent = sendNotification_(config.notificationEmail, proposal, proposalId, proposalFolder);
    return {
      success: true,
      reference: proposalId.slice(0, 8).toUpperCase(),
      notificationSent,
    };
  } catch (error) {
    if (proposalFolder) {
      try {
        proposalFolder.setTrashed(true);
      } catch (cleanupError) {
        console.error('No se pudo limpiar una propuesta incompleta de Drive.', cleanupError);
      }
    }

    const message = error && error.message ? String(error.message) : '';
    if (message.startsWith(USER_ERROR_PREFIX)) {
      throw new Error(message.slice(USER_ERROR_PREFIX.length));
    }
    console.error('No se pudo guardar una propuesta de Nightlife.', error);
    throw new Error('No pudimos guardar la propuesta. Probá de nuevo más tarde o contactá al administrador.');
  }
}

function getConfig_() {
  const properties = PropertiesService.getScriptProperties();
  const tokenJson = properties.getProperty('ACCESS_TOKEN_HASHES');
  const driveFolderId = properties.getProperty('DRIVE_FOLDER_ID');
  const notificationEmail = properties.getProperty('NOTIFICATION_EMAIL');

  if (!tokenJson || !driveFolderId || !notificationEmail) {
    throw userError_('El formulario todavía no está configurado. Avisale al administrador.');
  }

  let accessTokenHashes;
  try {
    accessTokenHashes = JSON.parse(tokenJson);
  } catch {
    throw userError_('La configuración del formulario no es válida. Avisale al administrador.');
  }
  if (
    !Array.isArray(accessTokenHashes)
    || accessTokenHashes.length === 0
    || accessTokenHashes.some(hash => !/^[a-f0-9]{64}$/i.test(hash))
  ) {
    throw userError_('La configuración del formulario no es válida. Avisale al administrador.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notificationEmail)) {
    throw userError_('El correo de notificación no está configurado. Avisale al administrador.');
  }

  return { accessTokenHashes, driveFolderId, notificationEmail };
}

function validateProposal_(form) {
  const title = requiredText_(form.title, 100, 'Completá el nombre del evento.');
  const eventDate = requiredText_(form.eventDate, 10, 'Completá la fecha del evento.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    throw userError_('La fecha ingresada no es válida.');
  }
  const [year, month, day] = eventDate.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);
  if (
    parsedDate.getFullYear() !== year
    || parsedDate.getMonth() !== month - 1
    || parsedDate.getDate() !== day
    || parsedDate < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  ) {
    throw userError_('Elegí una fecha de hoy o posterior.');
  }

  const contactEmail = requiredText_(form.contactEmail, 254, 'Completá un correo de contacto.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    throw userError_('El correo de contacto no parece válido.');
  }
  if (form.consent !== 'on') {
    throw userError_('Necesitamos tu aceptación para recibir y revisar esta propuesta.');
  }

  const flyer = getUpload_(form.flyer);
  if (!flyer) throw userError_('Adjuntá el flyer del evento (JPG, PNG o WebP).');
  const djSet = getUpload_(form.djSet);
  validateUpload_(flyer, 'flyer');
  if (djSet) validateUpload_(djSet, 'dj-set');
  const totalBytes = flyer.bytes.length + (djSet ? djSet.bytes.length : 0);
  if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) {
    throw userError_('El tamaño total de los archivos supera el máximo de 22 MB.');
  }

  const youtubeUrl = optionalUrl_(form.youtubeUrl, 'El enlace de YouTube debe usar una URL HTTPS válida.');
  if (youtubeUrl && !/^https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\//i.test(youtubeUrl)) {
    throw userError_('El enlace del video debe ser de YouTube.');
  }

  return {
    title,
    eventDate,
    eventTime: optionalText_(form.eventTime, 20),
    genre: requiredText_(form.genre, 100, 'Completá el género musical.'),
    venue: requiredText_(form.venue, 120, 'Completá el lugar o venue.'),
    city: requiredText_(form.city, 100, 'Completá la ciudad.'),
    description: optionalText_(form.description, 1200),
    ticketsUrl: optionalUrl_(form.ticketsUrl, 'El enlace de entradas debe usar HTTPS.'),
    promoterUrl: optionalUrl_(form.promoterUrl, 'El enlace de la productora debe usar HTTPS.'),
    youtubeUrl,
    contactName: requiredText_(form.contactName, 100, 'Completá tu nombre.'),
    contactEmail,
    flyer,
    djSet,
  };
}

function requiredText_(value, maxLength, errorMessage) {
  const text = String(value == null ? '' : value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  if (!text || text.length > maxLength) throw userError_(errorMessage);
  return text;
}

function optionalText_(value, maxLength) {
  const text = String(value == null ? '' : value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  if (text.length > maxLength) throw userError_('Uno de los campos de texto supera el máximo permitido.');
  return text;
}

function optionalUrl_(value, errorMessage) {
  const url = optionalText_(value, 500);
  if (!url) return '';
  if (!/^https:\/\/[a-z0-9.-]+(?::\d{1,5})?(?:[/?#][^\s]*)?$/i.test(url)) {
    throw userError_(errorMessage);
  }
  return url;
}

function getUpload_(value) {
  if (!value || typeof value.getBytes !== 'function') return null;
  const bytes = value.getBytes();
  if (!bytes || bytes.length === 0) return null;
  return { blob: value, bytes };
}

function saveUpload_(folder, upload, namePrefix) {
  const type = validateUpload_(upload, namePrefix);
  const blob = upload.blob.copyBlob()
    .setContentType(type.mime)
    .setName(`${namePrefix}.${type.extension}`);
  return folder.createFile(blob);
}

function validateUpload_(upload, namePrefix) {
  const maxBytes = namePrefix === 'flyer' ? MAX_FLYER_BYTES : MAX_SET_BYTES;
  if (upload.bytes.length > maxBytes) {
    throw userError_(namePrefix === 'flyer'
      ? 'El flyer no puede superar los 8 MB.'
      : 'El DJ set no puede superar los 18 MB.');
  }

  const type = detectFileType_(upload.bytes);
  if (!type || (namePrefix === 'flyer' && !type.mime.startsWith('image/'))
    || (namePrefix === 'dj-set' && !type.mime.startsWith('audio/'))) {
    throw userError_(namePrefix === 'flyer'
      ? 'El flyer debe ser una imagen JPG, PNG o WebP válida.'
      : 'El DJ set debe ser un audio MP3, WAV, M4A o OGG válido.');
  }
  return type;
}

function detectFileType_(signedBytes) {
  const bytes = signedBytes.slice(0, 12).map(byte => byte & 0xff);
  const ascii = (start, length) => String.fromCharCode(...bytes.slice(start, start + length));

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: 'image/jpeg', extension: 'jpg' };
  }
  if (ascii(0, 8) === '\x89PNG\r\n\x1a\n') {
    return { mime: 'image/png', extension: 'png' };
  }
  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP') {
    return { mime: 'image/webp', extension: 'webp' };
  }
  if (ascii(0, 3) === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)) {
    return { mime: 'audio/mpeg', extension: 'mp3' };
  }
  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WAVE') {
    return { mime: 'audio/wav', extension: 'wav' };
  }
  if (ascii(0, 4) === 'OggS') {
    return { mime: 'audio/ogg', extension: 'ogg' };
  }
  if (ascii(4, 4) === 'ftyp') {
    return { mime: 'audio/mp4', extension: 'm4a' };
  }
  return null;
}

function fileRecord_(file) {
  return { name: file.getName(), driveFileId: file.getId() };
}

function sendNotification_(email, proposal, proposalId, folder) {
  try {
    if (MailApp.getRemainingDailyQuota() < 1) {
      console.error(`No quedó cuota de correo para avisar la propuesta ${proposalId}.`);
      return false;
    }
    const subject = `Wavestyle · Nueva propuesta pendiente: ${proposal.title}`;
    const body = [
      'Se recibió una propuesta de evento para revisar.',
      '',
      `Referencia: ${proposalId}`,
      `Evento: ${proposal.title}`,
      `Fecha: ${proposal.eventDate}`,
      `Lugar: ${proposal.venue}, ${proposal.city}`,
      `Género: ${proposal.genre}`,
      `Contacto: ${proposal.contactName} (${proposal.contactEmail})`,
      '',
      'La propuesta sigue pendiente y no se publicó en el sitio.',
      `Carpeta privada en Drive: ${folder.getUrl()}`,
    ].join('\n');
    MailApp.sendEmail(email, subject, body);
    return true;
  } catch (error) {
    console.error(`No se pudo enviar el aviso para la propuesta ${proposalId}.`, error);
    return false;
  }
}

function checkRateLimit_(tokenHash) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw userError_('El formulario está ocupado. Esperá un momento e intentá de nuevo.');
  try {
    const properties = PropertiesService.getScriptProperties();
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
    const allProperties = properties.getProperties();
    Object.keys(allProperties)
      .filter(key => key.startsWith('RATE_') && !key.endsWith(`_${today}`))
      .forEach(key => properties.deleteProperty(key));

    const tokenKey = `RATE_TOKEN_${tokenHash.slice(0, 16)}_${today}`;
    const globalKey = `RATE_GLOBAL_${today}`;
    const tokenCount = Number(properties.getProperty(tokenKey) || 0);
    const globalCount = Number(properties.getProperty(globalKey) || 0);
    if (tokenCount >= MAX_SUBMISSIONS_PER_TOKEN_PER_DAY || globalCount >= MAX_SUBMISSIONS_PER_DAY) {
      throw userError_('Se alcanzó el límite diario de propuestas. Probá mañana.');
    }
    properties.setProperties({
      [tokenKey]: String(tokenCount + 1),
      [globalKey]: String(globalCount + 1),
    });
  } finally {
    lock.releaseLock();
  }
}

function sha256Hex_(value) {
  return Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    value,
    Utilities.Charset.UTF_8,
  ).map(byte => (byte & 0xff).toString(16).padStart(2, '0')).join('');
}

function constantTimeEquals_(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

function userError_(message) {
  return new Error(`${USER_ERROR_PREFIX}${message}`);
}
