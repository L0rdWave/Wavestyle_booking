const viteEnvironment = import.meta.env ?? {};
const baseUrl = viteEnvironment.BASE_URL ?? '/Wavestyle_booking/';
const exampleDataUrl = new URL('../data/events.example.json', import.meta.url).href;
const isDevelopment = viteEnvironment.DEV
  ?? ['localhost', '127.0.0.1'].includes(window.location.hostname);

export function renderNightlifeView(container) {
  container.innerHTML = `
    <main class="project-container nightlife-container">
      <nav class="back-nav" aria-label="Navegación">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
      </nav>

      <header class="project-header nightlife-header">
        <span class="project-genre"><i data-lucide="radio"></i> FECHAS · SESIONES · COMUNIDAD</span>
        <h1>Nightlife Hub</h1>
        <p class="project-subtitle">La frecuencia de la pista, antes, durante y después del encuentro.</p>
        <a href="#/nightlife/propose" data-link class="nightlife-propose-link">
          Proponer una fecha <i data-lucide="arrow-right"></i>
        </a>
      </header>

      <section class="nightlife-featured" id="next-event-hero" aria-labelledby="nightlife-next-title">
        <div class="nightlife-loading" role="status">
          <span class="nightlife-live-dot" aria-hidden="true"></span>
          Cargando próxima fecha...
        </div>
      </section>

      <div class="nightlife-preview-action">
        <button class="nightlife-preview-button" id="nightlife-preview-open" type="button">
          <i data-lucide="eye"></i>
          Ver ejemplo de publicación
        </button>
        <p>Una muestra con datos de prueba; no se publica en el sitio.</p>
      </div>

      <dialog class="nightlife-preview-dialog" id="nightlife-preview-dialog" aria-labelledby="nightlife-preview-title">
        <div class="nightlife-preview-dialog-content">
          <header class="nightlife-preview-dialog-header">
            <div>
              <span class="project-genre">VISTA PREVIA · DATOS DE EJEMPLO</span>
              <h2 id="nightlife-preview-title">Así se vería una fecha publicada</h2>
            </div>
            <button class="nightlife-preview-close" type="button" aria-label="Cerrar vista previa">
              <i data-lucide="x"></i>
            </button>
          </header>
          <p class="nightlife-preview-note" role="status">
            Esta muestra usa datos de prueba y no modifica ni publica fechas.
          </p>
          <div class="nightlife-preview-stage"></div>
        </div>
      </dialog>

      <section class="nightlife-section" id="upcoming-events-section" hidden>
        <div class="nightlife-section-heading">
          <span class="project-genre">EN EL RADAR</span>
          <h2>Próximas fechas</h2>
        </div>
        <div class="nightlife-event-grid" id="upcoming-events"></div>
      </section>

      <section class="nightlife-section nightlife-archive" id="past-events-section" hidden>
        <div class="nightlife-section-heading">
          <span class="project-genre">MEMORIA DE PISTA</span>
          <h2>Archivo de sesiones</h2>
        </div>
        <div class="nightlife-event-grid" id="past-events"></div>
      </section>
    </main>
  `;

  const abortController = new AbortController();
  let countdownTimer;
  let previewCountdownTimer;
  let previewAbortController;
  let detachPreviewAbortListener;
  const previewButton = container.querySelector('#nightlife-preview-open');
  const previewDialog = container.querySelector('#nightlife-preview-dialog');
  const previewCloseButton = previewDialog?.querySelector('.nightlife-preview-close');
  const openPreview = () => {
    if (!previewDialog || previewDialog.open) return;
    previewDialog.showModal();
    previewAbortController = new AbortController();
    const abortPreviewOnViewCleanup = () => previewAbortController?.abort();
    abortController.signal.addEventListener('abort', abortPreviewOnViewCleanup, { once: true });
    detachPreviewAbortListener = () => {
      abortController.signal.removeEventListener('abort', abortPreviewOnViewCleanup);
    };
    loadExamplePreview(previewDialog, previewAbortController.signal, timer => {
      previewCountdownTimer = timer;
    });
    window.lucide?.createIcons();
  };
  const closePreview = () => previewDialog?.close();
  const closeOnEscape = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePreview();
    }
  };
  const closeOnBackdrop = event => {
    if (event.target === previewDialog) closePreview();
  };
  const stopPreviewCountdown = () => {
    previewAbortController?.abort();
    previewAbortController = undefined;
    detachPreviewAbortListener?.();
    detachPreviewAbortListener = undefined;
    clearInterval(previewCountdownTimer);
    previewCountdownTimer = undefined;
  };

  previewButton?.addEventListener('click', openPreview);
  previewCloseButton?.addEventListener('click', closePreview);
  previewDialog?.addEventListener('click', closeOnBackdrop);
  previewDialog?.addEventListener('keydown', closeOnEscape);
  previewDialog?.addEventListener('close', stopPreviewCountdown);
  loadNightlifeData(container, abortController.signal, timer => {
    countdownTimer = timer;
  });

  return () => {
    abortController.abort();
    clearInterval(countdownTimer);
    stopPreviewCountdown();
    previewButton?.removeEventListener('click', openPreview);
    previewCloseButton?.removeEventListener('click', closePreview);
    previewDialog?.removeEventListener('click', closeOnBackdrop);
    previewDialog?.removeEventListener('keydown', closeOnEscape);
    previewDialog?.removeEventListener('close', stopPreviewCountdown);
    if (previewDialog?.open) previewDialog.close();
  };
}

async function loadExamplePreview(dialog, signal, setCountdownTimer) {
  const previewStage = dialog.querySelector('.nightlife-preview-stage');
  if (!previewStage) return;

  previewStage.innerHTML = `
    <section class="nightlife-featured" id="preview-next-event-hero" aria-labelledby="preview-nightlife-next-title">
      <div class="nightlife-loading" role="status">
        <span class="nightlife-live-dot" aria-hidden="true"></span>
        Cargando vista previa...
      </div>
    </section>
    <section class="nightlife-section" id="preview-upcoming-events-section" hidden>
      <div class="nightlife-section-heading">
        <span class="project-genre">EN EL RADAR</span>
        <h3>Próximas fechas</h3>
      </div>
      <div class="nightlife-event-grid" id="preview-upcoming-events"></div>
    </section>
    <section class="nightlife-section nightlife-archive" id="preview-past-events-section" hidden>
      <div class="nightlife-section-heading">
        <span class="project-genre">MEMORIA DE PISTA</span>
        <h3>Archivo de sesiones</h3>
      </div>
      <div class="nightlife-event-grid" id="preview-past-events"></div>
    </section>
  `;

  try {
    const response = await fetch(exampleDataUrl, { signal });
    if (!response.ok) {
      throw new Error(`La solicitud de eventos de ejemplo respondió ${response.status}`);
    }

    const data = await response.json();
    if (signal.aborted || !dialog.open) return;
    if (!data.nextEvent) {
      throw new Error('Los datos de ejemplo no incluyen una próxima fecha');
    }

    renderNextEvent(previewStage, data.nextEvent, { prefix: 'preview-', previewOnly: true });
    setCountdownTimer(initCountdown(previewStage, data.nextEvent.date, 'preview-'));
    renderEventList(previewStage, 'upcoming', data.upcomingEvents, { prefix: 'preview-', previewOnly: true });
    renderEventList(previewStage, 'past', data.pastEvents, { prefix: 'preview-', previewOnly: true });
    window.lucide?.createIcons();
  } catch (error) {
    if (error.name === 'AbortError') return;
    console.error('No se pudo cargar la vista previa de Nightlife:', error);
    if (!dialog.open) return;
    previewStage.innerHTML = `
      <div class="nightlife-error" role="alert">
        <i data-lucide="triangle-alert"></i>
        <h3>No se pudo cargar el ejemplo</h3>
        <p>Revisá tu conexión e intentá abrir la vista previa nuevamente.</p>
      </div>
    `;
    window.lucide?.createIcons();
  }
}

async function loadNightlifeData(container, signal, setCountdownTimer) {
  try {
    const response = await fetch(`${baseUrl}events.json`, { signal });
    if (!response.ok) {
      throw new Error(`La solicitud de eventos respondió ${response.status}`);
    }

    const data = await response.json();
    if (signal.aborted || !container.isConnected) return;
    if (!data.nextEvent && isDevelopment) {
      const exampleResponse = await fetch(exampleDataUrl, { signal });
      if (!exampleResponse.ok) {
        throw new Error(`La solicitud de eventos de desarrollo respondió ${exampleResponse.status}`);
      }
      const exampleData = await exampleResponse.json();
      if (signal.aborted || !container.isConnected) return;
      renderNextEvent(container, exampleData.nextEvent);
      container.querySelector('#next-event-hero')?.insertAdjacentHTML(
        'afterbegin',
        '<span class="nightlife-demo-label">VISTA DE DESARROLLO · NO SE PUBLICA</span>',
      );
      setCountdownTimer(initCountdown(container, exampleData.nextEvent.date));
      renderEventList(container, 'upcoming', exampleData.upcomingEvents);
      renderEventList(container, 'past', exampleData.pastEvents);
      return;
    }

    if (data.nextEvent) {
      renderNextEvent(container, data.nextEvent);
      setCountdownTimer(initCountdown(container, data.nextEvent.date));
    } else {
      renderEmptyState(container);
    }
    renderEventList(container, 'upcoming', data.upcomingEvents);
    renderEventList(container, 'past', data.pastEvents);
  } catch (error) {
    if (error.name === 'AbortError') return;
    console.error('Error al cargar los eventos:', error);
    const hero = container.querySelector('#next-event-hero');
    if (hero) {
      hero.innerHTML = `
        <div class="nightlife-error" role="alert">
          <i data-lucide="triangle-alert"></i>
          <h2>No se pudieron cargar las fechas</h2>
          <p>Revisá tu conexión e intentá volver a entrar al Nightlife Hub.</p>
        </div>
      `;
    }
  }
}

function renderEmptyState(container, prefix = '') {
  const hero = container.querySelector(`#${prefix}next-event-hero`);
  if (!hero) return;

  hero.classList.add('nightlife-empty');
  hero.innerHTML = `
    <div class="nightlife-empty-mark" aria-hidden="true"><i data-lucide="radio-tower"></i></div>
    <span class="project-genre">FRECUENCIA EN SINTONÍA</span>
    <h2 id="${prefix}nightlife-next-title">Próximas fechas: pronto</h2>
    <p>Estamos preparando los próximos encuentros. Volvé a visitarnos para enterarte de las novedades.</p>
  `;
}

function initCountdown(container, targetDateStr, prefix = '') {
  const counter = container.querySelector(`#${prefix}hub-countdown`);
  const targetDate = new Date(targetDateStr).getTime();
  if (!counter || Number.isNaN(targetDate)) {
    if (counter) counter.textContent = 'Fecha a confirmar';
    return undefined;
  }

  let timer;
  const update = () => {
    const gap = targetDate - Date.now();
    if (gap <= 0) {
      counter.textContent = '¡EL EVENTO ESTÁ EN CURSO O YA FINALIZÓ!';
      if (timer) clearInterval(timer);
      return;
    }

    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((gap % (1000 * 60)) / 1000);
    counter.textContent = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  update();
  if (targetDate > Date.now()) timer = setInterval(update, 1000);
  return timer;
}

function renderNextEvent(container, event, { prefix = '', previewOnly = false } = {}) {
  const hero = container.querySelector(`#${prefix}next-event-hero`);
  if (!hero) return;

  const imageUrl = event.flyer ? new URL(event.flyer, document.baseURI).href : '';
  const ticketUrl = getExternalUrl(event.ticketsUrl);
  const ticketAction = ticketUrl
    ? previewOnly
      ? '<span class="nightlife-ticket-link" aria-disabled="true">Obtener tickets <i data-lucide="arrow-up-right"></i></span>'
      : `<a class="nightlife-ticket-link" href="${escapeAttribute(ticketUrl)}" target="_blank" rel="noopener noreferrer">
           Obtener tickets <i data-lucide="arrow-up-right"></i>
         </a>`
    : '<span class="nightlife-ticket-unavailable">Información de tickets próximamente</span>';

  hero.innerHTML = `
    ${imageUrl ? `<div class="nightlife-featured-image" style="--event-image: url('${escapeAttribute(imageUrl)}')"></div>` : ''}
    <div class="nightlife-featured-content">
      <span class="nightlife-badge"><span class="nightlife-live-dot" aria-hidden="true"></span> PRÓXIMA FECHA CLAVE</span>
      <p class="nightlife-date">${formatDate(event.date)}</p>
      <h2 id="${prefix}nightlife-next-title">${escapeHtml(event.title)}</h2>
      <p class="nightlife-genre">${escapeHtml(event.genre)}</p>
      <div class="nightlife-countdown-label">LA CUENTA REGRESIVA YA EMPEZÓ</div>
      <div class="nightlife-countdown" id="${prefix}hub-countdown" role="timer" aria-live="off">Calculando...</div>
      <p class="nightlife-location"><i data-lucide="map-pin"></i> ${escapeHtml(event.location)}</p>
      ${ticketAction}
    </div>
  `;
}

function renderEventList(container, type, events, { prefix = '', previewOnly = false } = {}) {
  if (!Array.isArray(events) || events.length === 0) return;

  const section = container.querySelector(`#${prefix}${type}-events-section`);
  const list = container.querySelector(`#${prefix}${type}-events`);
  if (!section || !list) return;

  section.hidden = false;
  list.innerHTML = events.map(event => {
    const isPastEvent = type === 'past';
    const link = getExternalUrl(isPastEvent ? event.setAudioUrl : event.ticketsUrl);
    const label = isPastEvent ? 'Escuchar sesión' : 'Ver evento';
    const action = link
      ? previewOnly
        ? `<span class="nightlife-event-link" aria-disabled="true">${label} <i data-lucide="arrow-up-right"></i></span>`
        : `<a class="nightlife-event-link" href="${escapeAttribute(link)}" target="_blank" rel="noopener noreferrer">${label} <i data-lucide="arrow-up-right"></i></a>`
      : '';

    return `
      <article class="nightlife-event-card">
        <span class="project-genre">${escapeHtml(event.status || (isPastEvent ? 'SESIÓN ARCHIVADA' : 'PRÓXIMAMENTE'))}</span>
        <h3>${escapeHtml(event.title)}</h3>
        <p class="nightlife-event-meta">${formatDate(event.date)}${event.genre ? ` · ${escapeHtml(event.genre)}` : ''}</p>
        ${event.location ? `<p class="nightlife-event-location"><i data-lucide="map-pin"></i> ${escapeHtml(event.location)}</p>` : ''}
        ${action}
      </article>
    `;
  }).join('');
}

function formatDate(dateValue) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ? new Date(`${dateValue}T12:00:00`)
    : new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'Fecha a confirmar';

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getExternalUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
