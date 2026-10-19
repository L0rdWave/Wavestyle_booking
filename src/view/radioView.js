const STATIONS = [
  {
    id: 'radiozora',
    name: 'RadiOzora Trance',
    provider: 'Ozora Festival · Hungría',
    affinity: 'CANAL PSYTRANCE',
    genre: 'PSYTRANCE · FULL ON · TWILIGHT · DARKPSY',
    description: 'La emisora oficial del festival Ozora: sets y producciones 100% dedicadas a la cultura psicodélica global.',
    color: 'purple',
    streamUrl: 'https://trance.out.airtime.pro/trance_a',
    fallbackUrl: 'https://hirschmilch.de:7501/psytrance.mp3',
  },
  {
    id: 'hirsch-psy',
    name: 'Hirschmilch Psytrance',
    provider: 'Hirschmilch · Alemania',
    affinity: 'CANAL PSYTRANCE',
    genre: 'PSYCHEDELIC · FULL ON · PROGRESSIVE PSY',
    description: 'Transmisión continua desde Hamburgo enfocada exclusivamente en trance psicodélico de pista sin cortes.',
    color: 'purple',
    streamUrl: 'https://hirschmilch.de:7501/psytrance.mp3',
    fallbackUrl: 'https://jointil.com/stream-beat',
  },
  {
    id: 'hirsch-hypnotic',
    name: 'Hirschmilch Hypnotic',
    provider: 'Hirschmilch · Alemania',
    affinity: 'CANAL TECHNO SCI-FI / RAW',
    genre: 'HYPNOTIC TECHNO · SCI-FI · RAW · MODULAR',
    description: 'Frecuencias hipnóticas, texturas sci-fi, loops mentales y techno crudo de atmósfera profunda.',
    color: 'silver',
    streamUrl: 'https://hirschmilch.de:7501/hypnotic.mp3',
    fallbackUrl: 'https://hirschmilch.de:7501/techno.mp3',
  },
  {
    id: 'hirsch-techno',
    name: 'Hirschmilch Techno',
    provider: 'Hirschmilch · Alemania',
    affinity: 'CANAL TECHNO UNDERGROUND',
    genre: 'PEAK TIME · DRIVING · RAW · INDUSTRIAL',
    description: 'Pulso implacable de club alemán: techno directo, driving y energético las 24 horas.',
    color: 'silver',
    streamUrl: 'https://hirschmilch.de:7501/techno.mp3',
    fallbackUrl: 'https://stream.sunshine-live.de/techno/mp3-192/stream.sunshine-live.de/',
  },
  {
    id: 'sunshine-house',
    name: 'Sunshine Live House',
    provider: 'Sunshine Live · Alemania',
    affinity: 'CANAL HOUSE & GROOVE',
    genre: 'HOUSE · FUNKY · CLUB GROOVE · VOCAL',
    description: 'El sonido clásico y actual del house de club: groove cálido, bajos funk y energía de pista.',
    color: 'amber',
    streamUrl: 'https://stream.sunshine-live.de/house/mp3-192/stream.sunshine-live.de/',
    fallbackUrl: 'https://stream.technolovers.fm/house',
  },
  {
    id: 'techhouse-tl',
    name: 'Technolovers Tech House',
    provider: 'Technolovers · Alemania',
    affinity: 'CANAL TECH HOUSE',
    genre: 'TECH HOUSE · GROOVY · BOUNCY · IBIZA CLUB',
    description: 'Percusión afilada, basslines con rebote y selección constante de tech house para cabina.',
    color: 'amber',
    streamUrl: 'https://stream.technolovers.fm/techhouse',
    fallbackUrl: 'https://stream.technolovers.fm/house',
  },
  {
    id: 'beatblender',
    name: 'SomaFM Beat Blender',
    provider: 'SomaFM · San Francisco',
    affinity: 'CANAL DEEP & DUB',
    genre: 'DEEP HOUSE · DUB TECHNO · LATE NIGHT',
    description: 'Mezclas profundas de medianoche entre deep house orgánico y dub techno atmosférico.',
    color: 'cyan',
    streamUrl: 'https://ice2.somafm.com/beatblender-128-mp3',
    fallbackUrl: 'https://ice6.somafm.com/beatblender-128-mp3',
  },
  {
    id: 'groovesalad',
    name: 'SomaFM Groove Salad',
    provider: 'SomaFM · San Francisco',
    affinity: 'CANAL CHILLOUT & AMBIENT',
    genre: 'AMBIENT · DOWNTEMPO · CHILL · ELECTRONICA',
    description: 'Un clásico libre de anuncios: beats downtempo, texturas espaciales y electrónica de escucha.',
    color: 'lime',
    streamUrl: 'https://ice2.somafm.com/groovesalad-128-mp3',
    fallbackUrl: 'https://hirschmilch.de:7501/chillout.mp3',
  },
];

// Estado persistente del reproductor (vive fuera de las vistas para no cortarse al navegar)
const radioState = {
  selectedId: STATIONS[0].id,
  isPlaying: false,
  isLoading: false,
  hasError: false,
  volume: 80,
  isMuted: false,
  dockDismissed: true,
  currentPath: '/',
  usingFallback: false,
  isIntentionalStop: false,
};

let audioElement = null;
let dockElement = null;
let viewContainer = null;
let listenersInitialized = false;

function getSelectedStation() {
  return STATIONS.find(station => station.id === radioState.selectedId) || STATIONS[0];
}

function updateMediaSessionMetadata() {
  if (!('mediaSession' in navigator)) return;

  const station = getSelectedStation();
  try {
    if (typeof MediaMetadata !== 'undefined') {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: station.name,
        artist: `Wavestyle Radio · ${station.affinity.replace('CANAL ', '')}`,
        album: station.provider,
        artwork: [
          { src: new URL('./public/icons/wavestyle-192.png', document.baseURI).href, sizes: '192x192', type: 'image/png' },
          { src: new URL('./public/icons/wavestyle-512.png', document.baseURI).href, sizes: '512x512', type: 'image/png' },
        ],
      });
    }
    navigator.mediaSession.playbackState = radioState.isPlaying ? 'playing' : 'paused';
  } catch (err) {
    console.warn('[Wavestyle Radio] No se pudo actualizar MediaSession:', err);
  }
}

function initMediaSessionHandlers() {
  if (!('mediaSession' in navigator)) return;

  const selectAdjacentStation = offset => {
    const currentIndex = STATIONS.findIndex(s => s.id === radioState.selectedId);
    const nextIndex = (currentIndex + offset + STATIONS.length) % STATIONS.length;
    playStation(STATIONS[nextIndex].id);
  };

  const actions = [
    ['play', () => playStation(radioState.selectedId)],
    ['pause', () => pauseRadio()],
    ['stop', () => stopAndDismissRadio()],
    ['previoustrack', () => selectAdjacentStation(-1)],
    ['nexttrack', () => selectAdjacentStation(1)],
  ];

  for (const [action, handler] of actions) {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch {
      // Algunos navegadores no soportan todas las acciones
    }
  }
}

function ensureAudioElement() {
  if (audioElement) return audioElement;

  audioElement = document.createElement('audio');
  audioElement.id = 'wavestyle-radio-audio';
  audioElement.preload = 'none';
  audioElement.playsInline = true;
  audioElement.setAttribute('playsinline', '');
  audioElement.setAttribute('webkit-playsinline', '');
  audioElement.setAttribute('referrerpolicy', 'no-referrer');
  audioElement.hidden = true;
  audioElement.volume = radioState.volume / 100;
  document.body.appendChild(audioElement);

  initMediaSessionHandlers();

  audioElement.addEventListener('playing', () => {
    radioState.isIntentionalStop = false;
    radioState.isPlaying = true;
    radioState.isLoading = false;
    radioState.hasError = false;
    radioState.dockDismissed = false;
    updateMediaSessionMetadata();
    updateAllRadioUI();
  });

  audioElement.addEventListener('waiting', () => {
    if (radioState.isPlaying) {
      radioState.isLoading = true;
      updateAllRadioUI();
    }
  });

  audioElement.addEventListener('pause', () => {
    if (!audioElement.ended) {
      radioState.isPlaying = false;
      radioState.isLoading = false;
      updateMediaSessionMetadata();
      updateAllRadioUI();
    }
  });

  audioElement.addEventListener('error', () => {
    if (radioState.isIntentionalStop) return;

    const station = getSelectedStation();
    if (!radioState.usingFallback && station.fallbackUrl && audioElement.src !== station.fallbackUrl) {
      radioState.usingFallback = true;
      audioElement.src = station.fallbackUrl;
      audioElement.play().catch(() => {
        radioState.isPlaying = false;
        radioState.isLoading = false;
        radioState.hasError = true;
        updateAllRadioUI();
      });
      return;
    }

    radioState.isPlaying = false;
    radioState.isLoading = false;
    radioState.hasError = true;
    updateAllRadioUI();
  });

  return audioElement;
}

function ensureCoexistenceListeners() {
  if (listenersInitialized) return;
  listenersInitialized = true;

  // Si el usuario reproduce un track local (<audio> en Vans o Helios Wave), pausar la radio automáticamente
  document.addEventListener(
    'play',
    event => {
      if (audioElement && event.target !== audioElement && !audioElement.paused) {
        pauseRadio();
      }
    },
    true,
  );

  // Si el usuario inicia la Mini Groovebox, pausar la radio para no superponer con Web Audio API
  document.addEventListener('click', event => {
    const groovePlayBtn = event.target.closest('[data-action="play"]');
    if (groovePlayBtn && radioState.isPlaying) {
      pauseRadio();
    }
  });
}

function playStation(stationId = radioState.selectedId) {
  const audio = ensureAudioElement();
  const isNewStation = stationId !== radioState.selectedId;
  radioState.selectedId = stationId;
  const station = getSelectedStation();

  // Pausar cualquier otro <audio> en la página antes de encender la radio
  document.querySelectorAll('audio').forEach(el => {
    if (el !== audio && !el.paused) {
      el.pause();
    }
  });

  radioState.isIntentionalStop = false;
  if (isNewStation || !audio.src || radioState.hasError) {
    radioState.usingFallback = false;
    audio.src = station.streamUrl;
  }

  radioState.isLoading = true;
  radioState.hasError = false;
  radioState.dockDismissed = false;
  updateAllRadioUI();

  audio.play().catch(err => {
    if (err?.name === 'AbortError') return;
    console.warn('[Wavestyle Radio] No se pudo iniciar la reproducción:', err);
    radioState.isPlaying = false;
    radioState.isLoading = false;
    radioState.hasError = true;
    updateAllRadioUI();
  });
}

function pauseRadio() {
  if (!audioElement) return;
  audioElement.pause();
  radioState.isPlaying = false;
  radioState.isLoading = false;
  updateAllRadioUI();
}

function stopAndDismissRadio() {
  radioState.isIntentionalStop = true;
  if (audioElement) {
    audioElement.pause();
    audioElement.removeAttribute('src');
    audioElement.load();
  }
  radioState.isPlaying = false;
  radioState.isLoading = false;
  radioState.hasError = false;
  radioState.dockDismissed = true;
  updateAllRadioUI();
}

function toggleRadio() {
  if (radioState.isPlaying || radioState.isLoading) {
    pauseRadio();
  } else {
    playStation(radioState.selectedId);
  }
}

function setRadioVolume(newVolume) {
  const clamped = Math.max(0, Math.min(100, Number(newVolume)));
  radioState.volume = clamped;
  radioState.isMuted = clamped === 0;
  if (audioElement) {
    audioElement.muted = radioState.isMuted;
    audioElement.volume = clamped / 100;
  }
  updateAllRadioUI();
}

function toggleMute() {
  radioState.isMuted = !radioState.isMuted;
  if (audioElement) {
    audioElement.muted = radioState.isMuted;
  }
  updateAllRadioUI();
}

function ensurePersistentDock() {
  if (dockElement) return dockElement;

  dockElement = document.createElement('aside');
  dockElement.id = 'wavestyle-radio-dock';
  dockElement.className = 'radio-mini-dock';
  dockElement.setAttribute('aria-label', 'Reproductor de radio en vivo');
  dockElement.hidden = true;

  dockElement.innerHTML = `
    <div class="radio-mini-dock-inner">
      <button type="button" class="radio-mini-toggle" data-radio-dock-action="toggle" aria-label="Pausar o reproducir radio">
        <span class="radio-mini-toggle-icon" data-radio-dock-icon>▶</span>
      </button>

      <div class="radio-mini-info">
        <div class="radio-mini-topline">
          <span class="radio-live-dot" data-radio-dock-dot></span>
          <span class="radio-mini-status" data-radio-dock-status>LIVE RADIO</span>
        </div>
        <select class="radio-mini-select" data-radio-dock-select aria-label="Cambiar emisora de radio">
          ${STATIONS.map(
            s => `<option value="${s.id}">${s.name} (${s.affinity.replace('CANAL ', '')})</option>`,
          ).join('')}
        </select>
      </div>

      <a href="#/radio" data-link class="radio-mini-expand" title="Abrir sintonizador completo" aria-label="Abrir sección de radio">
        <i data-lucide="sliders"></i>
      </a>

      <button type="button" class="radio-mini-close" data-radio-dock-action="close" title="Apagar radio y cerrar barra" aria-label="Apagar radio">
        ✕
      </button>
    </div>
  `;

  dockElement.addEventListener('click', event => {
    const actionBtn = event.target.closest('[data-radio-dock-action]');
    if (!actionBtn) return;
    const action = actionBtn.dataset.radioDockAction;
    if (action === 'toggle') {
      toggleRadio();
    } else if (action === 'close') {
      stopAndDismissRadio();
    }
  });

  const selectEl = dockElement.querySelector('[data-radio-dock-select]');
  selectEl?.addEventListener('change', event => {
    playStation(event.target.value);
  });

  document.body.appendChild(dockElement);
  window.lucide?.createIcons();
  return dockElement;
}

export function syncRadioDockRoute(path) {
  ensureCoexistenceListeners();
  ensurePersistentDock();
  radioState.currentPath = path || '/';
  updateDockUI();
}

function updateDockUI() {
  if (!dockElement) return;

  const isOnRadioPage = radioState.currentPath === '/radio';
  const shouldShowDock = !isOnRadioPage && !radioState.dockDismissed;
  dockElement.hidden = !shouldShowDock;

  if (!shouldShowDock) return;

  dockElement.classList.toggle('is-playing', radioState.isPlaying);
  dockElement.classList.toggle('is-loading', radioState.isLoading);

  const iconEl = dockElement.querySelector('[data-radio-dock-icon]');
  if (iconEl) {
    iconEl.textContent = radioState.isLoading ? '···' : radioState.isPlaying ? '❚❚' : '▶';
  }

  const statusEl = dockElement.querySelector('[data-radio-dock-status]');
  if (statusEl) {
    statusEl.textContent = radioState.isLoading
      ? 'SINTONIZANDO...'
      : radioState.hasError
        ? 'SEÑAL INTERRUMPIDA'
        : radioState.isPlaying
          ? 'EN VIVO · STREAM'
          : 'RADIO EN PAUSA';
  }

  const selectEl = dockElement.querySelector('[data-radio-dock-select]');
  if (selectEl && selectEl.value !== radioState.selectedId) {
    selectEl.value = radioState.selectedId;
  }
}

function updateViewUI() {
  if (!viewContainer || !viewContainer.isConnected) return;

  const station = getSelectedStation();
  const deck = viewContainer.querySelector('[data-radio-deck]');
  if (deck) {
    deck.dataset.color = station.color;
    deck.classList.toggle('is-playing', radioState.isPlaying);
    deck.classList.toggle('is-loading', radioState.isLoading);
  }

  const affinityEl = viewContainer.querySelector('[data-radio-affinity]');
  if (affinityEl) affinityEl.textContent = `${station.affinity} · ${station.provider}`;

  const titleEl = viewContainer.querySelector('[data-radio-title]');
  if (titleEl) titleEl.textContent = station.name;

  const genreEl = viewContainer.querySelector('[data-radio-genre]');
  if (genreEl) genreEl.textContent = station.genre;

  const descEl = viewContainer.querySelector('[data-radio-desc]');
  if (descEl) descEl.textContent = station.description;

  const statusTextEl = viewContainer.querySelector('[data-radio-status-text]');
  if (statusTextEl) {
    statusTextEl.textContent = radioState.isLoading
      ? 'CONECTANDO STREAM...'
      : radioState.hasError
        ? 'ERROR DE CONEXIÓN · REINTENTAR'
        : radioState.isPlaying
          ? 'TRANSMITIENDO EN VIVO'
          : 'SINTONIZADOR EN ESPERA';
  }

  const playBtn = viewContainer.querySelector('[data-radio-action="toggle"]');
  if (playBtn) {
    playBtn.classList.toggle('is-playing', radioState.isPlaying);
    playBtn.setAttribute('aria-pressed', String(radioState.isPlaying));
  }

  const playLabel = viewContainer.querySelector('[data-radio-play-label]');
  if (playLabel) {
    playLabel.textContent = radioState.isLoading
      ? 'Sintonizando...'
      : radioState.isPlaying
        ? 'Pausar Transmisión'
        : 'Iniciar Transmisión';
  }

  const stopBtn = viewContainer.querySelector('[data-radio-action="stop"]');
  if (stopBtn) {
    stopBtn.disabled = !radioState.isPlaying && !radioState.isLoading && radioState.dockDismissed;
  }

  const volumeInput = viewContainer.querySelector('[data-radio-volume]');
  if (volumeInput && Number(volumeInput.value) !== radioState.volume) {
    volumeInput.value = String(radioState.volume);
  }

  const volumeOutput = viewContainer.querySelector('[data-radio-volume-value]');
  if (volumeOutput) {
    volumeOutput.textContent = radioState.isMuted ? 'MUTE' : `${radioState.volume}%`;
  }

  const muteBtn = viewContainer.querySelector('[data-radio-action="mute"]');
  if (muteBtn) {
    muteBtn.classList.toggle('is-muted', radioState.isMuted);
    muteBtn.setAttribute('aria-pressed', String(radioState.isMuted));
  }

  viewContainer.querySelectorAll('[data-station-card]').forEach(card => {
    const isSelected = card.dataset.stationCard === radioState.selectedId;
    const isActivePlaying = isSelected && radioState.isPlaying;
    card.classList.toggle('is-selected', isSelected);
    card.classList.toggle('is-playing', isActivePlaying);
    card.setAttribute('aria-pressed', String(isSelected));

    const badge = card.querySelector('[data-station-state]');
    if (badge) {
      badge.textContent = isActivePlaying
        ? 'SONANDO AHORA'
        : isSelected
          ? 'SELECCIONADA'
          : 'SINTONIZAR';
    }
  });
}

function updateAllRadioUI() {
  updateViewUI();
  updateDockUI();
}

export function renderRadioView(container) {
  ensureCoexistenceListeners();
  ensurePersistentDock();
  viewContainer = container;

  const station = getSelectedStation();

  container.innerHTML = `
    <main class="project-container radio-page">
      <nav class="back-nav" aria-label="Navegación">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
      </nav>

      <header class="project-header radio-header">
        <span class="project-genre"><i data-lucide="radio"></i> SINTONIZADOR · STREAMING 24/7</span>
        <h1>Wavestyle Radio</h1>
        <p class="project-subtitle">
          Emisoras internacionales de música electrónica seleccionadas por género (Psytrance, Techno, House y Chillout). 
          Si dejás un canal encendido, te acompaña mientras navegás por el resto del sitio.
        </p>
      </header>

      <section class="radio-deck" data-radio-deck data-color="${station.color}" aria-label="Consola principal de radio">
        <div class="radio-deck-topline">
          <span class="radio-deck-affinity" data-radio-affinity>${station.affinity} · ${station.provider}</span>
          <div class="radio-deck-signal">
            <span class="radio-live-dot"></span>
            <span data-radio-status-text>SINTONIZADOR EN ESPERA</span>
          </div>
        </div>

        <div class="radio-deck-main">
          <div class="radio-deck-station-meta">
            <h2 data-radio-title>${station.name}</h2>
            <p class="radio-deck-genre" data-radio-genre>${station.genre}</p>
            <p class="radio-deck-desc" data-radio-desc>${station.description}</p>
          </div>

          <div class="radio-equalizer" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div class="radio-deck-controls">
          <button type="button" class="radio-play-btn" data-radio-action="toggle" aria-pressed="false">
            <i data-lucide="power"></i>
            <span data-radio-play-label>Iniciar Transmisión</span>
          </button>

          <button type="button" class="radio-stop-btn" data-radio-action="stop" title="Apagar radio por completo">
            <i data-lucide="square"></i>
            <span>Apagar</span>
          </button>

          <div class="radio-volume-wrap">
            <button type="button" class="radio-mute-btn" data-radio-action="mute" aria-label="Silenciar radio" aria-pressed="false">
              <i data-lucide="volume-2"></i>
            </button>
            <label class="radio-volume-label">
              <span class="sr-only">Volumen de la radio</span>
              <input type="range" min="0" max="100" value="${radioState.volume}" step="1" data-radio-volume aria-label="Volumen de la radio">
            </label>
            <output class="radio-volume-output" data-radio-volume-value>${radioState.volume}%</output>
          </div>
        </div>
      </section>

      <section class="radio-stations-section" aria-labelledby="radio-channels-heading">
        <div class="radio-section-heading">
          <span class="project-genre">FRECUENCIAS DISPONIBLES</span>
          <h2 id="radio-channels-heading">Seleccioná un canal</h2>
        </div>

        <div class="radio-stations-grid">
          ${STATIONS.map(
            item => `
              <button
                type="button"
                class="radio-station-card radio-card-${item.color}${item.id === radioState.selectedId ? ' is-selected' : ''}"
                data-station-card="${item.id}"
                aria-pressed="${item.id === radioState.selectedId}"
              >
                <div class="radio-station-card-top">
                  <span class="radio-station-affinity">${item.affinity}</span>
                  <span class="radio-station-badge" data-station-state>
                    ${item.id === radioState.selectedId && radioState.isPlaying ? 'SONANDO AHORA' : item.id === radioState.selectedId ? 'SELECCIONADA' : 'SINTONIZAR'}
                  </span>
                </div>
                <h3>${item.name}</h3>
                <p class="radio-station-genre">${item.genre}</p>
                <p class="radio-station-desc">${item.description}</p>
              </button>
            `,
          ).join('')}
        </div>
      </section>

      <p class="radio-footnote">
        <i data-lucide="shield-check"></i>
        Streams directos HTTPS (RadiOzora, Hirschmilch, Sunshine Live, Technolovers y SomaFM). 
        Se pausa automáticamente si reproducís un track de estudio o iniciás la Mini Groovebox.
      </p>
    </main>
  `;

  const handleClick = event => {
    const actionBtn = event.target.closest('[data-radio-action]');
    if (actionBtn) {
      const action = actionBtn.dataset.radioAction;
      if (action === 'toggle') toggleRadio();
      else if (action === 'stop') stopAndDismissRadio();
      else if (action === 'mute') toggleMute();
      return;
    }

    const stationCard = event.target.closest('[data-station-card]');
    if (stationCard) {
      const targetId = stationCard.dataset.stationCard;
      if (targetId === radioState.selectedId && radioState.isPlaying) {
        pauseRadio();
      } else {
        playStation(targetId);
      }
    }
  };

  const handleInput = event => {
    if (event.target.matches('[data-radio-volume]')) {
      setRadioVolume(event.target.value);
    }
  };

  container.addEventListener('click', handleClick);
  container.addEventListener('input', handleInput);

  updateAllRadioUI();

  return () => {
    container.removeEventListener('click', handleClick);
    container.removeEventListener('input', handleInput);
    if (viewContainer === container) {
      viewContainer = null;
    }
  };
}
