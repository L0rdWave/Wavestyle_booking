const intakeUrl = import.meta.env.VITE_NIGHTLIFE_INTAKE_URL?.trim() ?? '';

export function renderNightlifeProposalView() {
  const safeUrl = getTrustedIntakeUrl(intakeUrl);
  const formContent = safeUrl
    ? `
        <div class="nightlife-intake-frame-wrap">
          <iframe
            class="nightlife-intake-frame"
            src="${escapeAttribute(safeUrl)}"
            title="Formulario privado para proponer una fecha"
            loading="lazy"
            referrerpolicy="no-referrer"
            allow="clipboard-write"
          ></iframe>
        </div>
      `
    : `
        <div class="nightlife-intake-unavailable" role="status">
          <span class="nightlife-intake-icon"><i data-lucide="shield-check"></i></span>
          <span class="project-genre">${import.meta.env.DEV ? 'CONFIGURACIÓN LOCAL' : 'FORMULARIO PRIVADO'}</span>
          <h2>${import.meta.env.DEV ? 'Backend todavía no conectado' : 'Formulario temporalmente no disponible'}</h2>
          <p>
            ${import.meta.env.DEV
              ? 'El formulario real valida el token en Google Apps Script y guarda los archivos en Drive privado. Configurá VITE_NIGHTLIFE_INTAKE_URL para probarlo; esta vista no envía datos.'
              : 'Estamos preparando el canal seguro de recepción. Por ahora, contactanos desde Booking & Contacto.'}
          </p>
          ${import.meta.env.DEV
            ? '<span class="nightlife-intake-no-send"><i data-lucide="lock-keyhole"></i> No se recopilan ni envían datos en esta vista</span>'
            : '<a href="#/booking" data-link class="nightlife-ticket-link">Ir a Booking <i data-lucide="arrow-up-right"></i></a>'}
        </div>
      `;

  return `
    <main class="project-container nightlife-container">
      <nav class="back-nav nightlife-back-nav" aria-label="Navegación">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
        <a href="#/nightlife" data-link class="back-link"><i data-lucide="radio"></i> Volver al Nightlife Hub</a>
      </nav>
      <header class="project-header nightlife-header">
        <span class="project-genre"><i data-lucide="shield-check"></i> CANAL PARA CONTACTOS DE CONFIANZA</span>
        <h1>Proponer una fecha</h1>
        <p class="project-subtitle">Las propuestas se revisan antes de publicarse. El token nunca se guarda en esta web pública.</p>
      </header>
      <section class="nightlife-intake-panel">
        ${formContent}
      </section>
    </main>
  `;
}

function getTrustedIntakeUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:'
      || url.hostname !== 'script.google.com'
      || !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
    ) {
      return '';
    }
    return url.href;
  } catch {
    return '';
  }
}

function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}
