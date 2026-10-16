import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const sourcePath = fileURLToPath(new URL('../apps-script/Code.gs', import.meta.url));
const accessToken = 'trusted-contact-token-with-32-chars';
const accessTokenHash = createHash('sha256').update(accessToken).digest('hex');

function createRuntime({ folderSharing = 'PRIVATE' } = {}) {
  const scriptProperties = {
    ACCESS_TOKEN_HASHES: JSON.stringify([accessTokenHash]),
    DRIVE_FOLDER_ID: 'private-folder-id',
    NOTIFICATION_EMAIL: 'owner@example.com',
  };
  const files = [];
  const proposalFolders = [];
  const sentEmails = [];
  const rootFolder = {
    getSharingAccess: () => folderSharing,
    createFolder(name) {
      const folder = {
        name,
        trashed: false,
        getUrl: () => 'https://drive.google.com/drive/folders/private-proposal',
        createFile(blob) {
          files.push({ blob, folder: name });
          return {
            getName: () => blob.name ?? 'proposal.json',
            getId: () => `file-${files.length}`,
          };
        },
        setTrashed(value) {
          this.trashed = value;
        },
      };
      proposalFolders.push(folder);
      return folder;
    },
  };
  const context = {
    console,
    Date,
    String,
    Number,
    JSON,
    Object,
    Array,
    RegExp,
    Error,
    Utilities: {
      DigestAlgorithm: { SHA_256: 'sha256' },
      Charset: { UTF_8: 'utf8' },
      computeDigest: (_algorithm, value) => [...createHash('sha256').update(value).digest()],
      formatDate: () => '20990101',
      getUuid: () => 'proposal-uuid-1234',
      newBlob(data, contentType, name) {
        return {
          data,
          contentType,
          name,
          getBytes: () => [],
        };
      },
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: key => scriptProperties[key] ?? null,
        setProperties: values => Object.assign(scriptProperties, values),
        getProperties: () => ({ ...scriptProperties }),
        deleteProperty: key => delete scriptProperties[key],
      }),
    },
    DriveApp: {
      Access: { PRIVATE: 'PRIVATE', ANYONE: 'ANYONE', ANYONE_WITH_LINK: 'ANYONE_WITH_LINK' },
      getFolderById: () => rootFolder,
    },
    MailApp: {
      getRemainingDailyQuota: () => 10,
      sendEmail: (...args) => sentEmails.push(args),
    },
    LockService: {
      getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    },
    Session: { getScriptTimeZone: () => 'America/Argentina/Buenos_Aires' },
  };
  vm.createContext(context);
  return {
    context,
    files,
    proposalFolders,
    sentEmails,
    scriptProperties,
  };
}

function upload(bytes) {
  return {
    getBytes: () => bytes,
    copyBlob() {
      const blob = { bytes, name: '', contentType: '' };
      blob.setContentType = value => { blob.contentType = value; return blob; };
      blob.setName = value => { blob.name = value; return blob; };
      return blob;
    },
  };
}

function validForm(overrides = {}) {
  return {
    accessToken,
    title: 'Noche de prueba',
    eventDate: '2099-01-01',
    eventTime: '23:00',
    genre: 'Techno',
    venue: 'Club Central',
    city: 'Buenos Aires',
    description: 'Evento de prueba',
    ticketsUrl: 'https://tickets.example/evento',
    promoterUrl: '',
    youtubeUrl: 'https://youtu.be/abcdefghijk',
    contactName: 'Contacto',
    contactEmail: 'contact@example.com',
    consent: 'on',
    flyer: upload([0xff, 0xd8, 0xff, 0x00]),
    djSet: null,
    ...overrides,
  };
}

async function loadRuntime(options) {
  const runtime = createRuntime(options);
  const source = await readFile(sourcePath, 'utf8');
  vm.runInContext(source, runtime.context, { filename: sourcePath });
  return runtime;
}

test('accepts a valid proposal, stores it in Drive, and sends a notification', async () => {
  const runtime = await loadRuntime();
  const result = runtime.context.submitProposal(validForm());

  assert.equal(result.success, true);
  assert.equal(result.notificationSent, true);
  assert.equal(runtime.proposalFolders.length, 1);
  assert.equal(runtime.files.length, 2);
  assert.equal(runtime.files[0].blob.name, 'flyer.jpg');
  assert.equal(runtime.files[1].blob.name, 'proposal.json');
  assert.equal(runtime.sentEmails.length, 1);
  assert.equal(runtime.sentEmails[0][0], 'owner@example.com');
});

test('rejects an invalid token without creating a Drive proposal', async () => {
  const runtime = await loadRuntime();

  assert.throws(
    () => runtime.context.submitProposal(validForm({ accessToken: 'wrong-token' })),
    /token no es válido/i,
  );
  assert.equal(runtime.proposalFolders.length, 0);
});

test('rejects a file whose bytes do not match an approved image format', async () => {
  const runtime = await loadRuntime();

  assert.throws(
    () => runtime.context.submitProposal(validForm({ flyer: upload([0x4d, 0x5a, 0x00, 0x00]) })),
    /flyer debe ser una imagen/i,
  );
  assert.equal(runtime.proposalFolders.length, 0);
});

test('rejects public Drive folders before creating a proposal', async () => {
  const runtime = await loadRuntime({ folderSharing: 'ANYONE' });

  assert.throws(
    () => runtime.context.submitProposal(validForm()),
    /destino de almacenamiento no es privado/i,
  );
  assert.equal(runtime.proposalFolders.length, 0);
});

test('limits each valid token to five proposals per day', async () => {
  const runtime = await loadRuntime();
  for (let index = 0; index < 5; index += 1) {
    runtime.context.submitProposal(validForm());
  }

  assert.throws(
    () => runtime.context.submitProposal(validForm()),
    /límite diario de propuestas/i,
  );
  assert.equal(runtime.proposalFolders.length, 5);
});
