const tracks = [
  { id: 'kick', name: 'KICK', detail: 'Bombo', color: 'cyan' },
  { id: 'bass', name: 'BASS', detail: 'Bajo', color: 'lime' },
  { id: 'snare', name: 'SNARE', detail: 'Caja', color: 'purple' },
  { id: 'hat', name: 'HAT', detail: 'Hi-hat', color: 'amber' },
  { id: 'clap', name: 'CLAP', detail: 'Aplauso', color: 'pink' },
  { id: 'openhat', name: 'OPEN HAT', detail: 'Hi-hat abierto', color: 'blue' },
  { id: 'rimshot', name: 'RIM', detail: 'Rimshot', color: 'red' },
  { id: 'lowtom', name: 'LOW TOM', detail: 'Tom grave', color: 'orange' },
  { id: 'hitom', name: 'HIGH TOM', detail: 'Tom agudo', color: 'violet' },
  { id: 'cowbell', name: 'COWBELL', detail: 'Cencerro', color: 'green' },
  { id: 'fx', name: 'FX GLITCH', detail: 'Stab / Sci-Fi', color: 'cyan' },
  { id: 'lead', name: 'MELODY', detail: 'Piano roll · escala', color: 'gold' },
];

const STEP_COUNT = 32;
const NOTE_COUNT = 8;
const drumTrackIds = tracks.filter(track => track.id !== 'lead' && track.id !== 'bass').map(track => track.id);

const initialPattern = {
  kick: [0, 4, 8, 12, 16, 20, 24, 28],
  bass: [2, 3, 6, 10, 11, 14, 18, 19, 22, 26, 27, 30],
  snare: [4, 12, 20, 28],
  hat: [2, 6, 10, 14, 18, 22, 26, 30],
  clap: [4, 12, 20, 28],
  openhat: [6, 14, 22, 30],
  rimshot: [3, 11, 19, 27],
  lowtom: [15, 31],
  hitom: [7, 23],
  cowbell: [6, 14, 22, 30],
  fx: [0, 31],
};

const genrePresets = {
  house: {
    name: 'Funky House',
    bpm: 124,
    swing: 0.12,
    scale: [146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66],
    scaleNotes: ['D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4'],
    bassDegrees: [0, 0, 2, 3, 0, 2, 3, 0, 0, 0, 2, 3, 0, 2, 3, 0],
    delay: { time: 0.36, feedback: 0.22, wet: 0.16, tracks: ['rimshot', 'cowbell', 'fx', 'lead'] },
    pattern: {
      kick: [0, 4, 8, 12, 16, 20, 24, 28],
      bass: [2, 3, 6, 10, 11, 14, 18, 19, 22, 26, 27, 30],
      snare: [4, 12, 20, 28],
      hat: [2, 6, 10, 14, 18, 22, 26, 30],
      clap: [4, 12, 20, 28],
      openhat: [6, 14, 22, 30],
      rimshot: [3, 11, 19, 27],
      lowtom: [15, 31],
      hitom: [7, 23],
      cowbell: [6, 14, 22, 30],
      fx: [0, 31],
    },
    melody: [[0, 4], [3, 2], [6, 1], [10, 4], [12, 5], [15, 2], [18, 4], [21, 6], [24, 5], [27, 2], [30, 1]],
  },
  techno: {
    name: 'Raw Techno',
    bpm: 138,
    swing: 0.02,
    scale: [130.81, 146.83, 155.56, 174.61, 196, 207.65, 233.08, 261.63],
    scaleNotes: ['C3', 'D3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4'],
    bassDegrees: [0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0],
    delay: { time: 0.5, feedback: 0.34, wet: 0.22, tracks: ['rimshot', 'hitom', 'fx', 'lead'] },
    pattern: {
      kick: [0, 4, 8, 12, 16, 20, 24, 28],
      bass: [2, 6, 10, 14, 18, 22, 26, 30],
      snare: [4, 12, 20, 28],
      hat: [2, 6, 10, 14, 18, 22, 26, 30],
      clap: [4, 12, 20, 28],
      openhat: [7, 15, 23, 31],
      rimshot: [3, 11, 19, 27],
      lowtom: [7, 15, 23, 31],
      hitom: [5, 13, 21, 29],
      cowbell: [2, 10, 18, 26],
      fx: [15, 30, 31],
    },
    melody: [[0, 0], [6, 0], [8, 3], [14, 2], [16, 0], [22, 0], [24, 3], [29, 1]],
  },
  psytrance: {
    name: 'Full-on Uplifting',
    bpm: 145,
    swing: 0,
    scale: [110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220],
    scaleNotes: ['A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3'],
    bassDegrees: [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 0],
    delay: { time: 0.25, feedback: 0.2, wet: 0.16, tracks: ['hitom', 'fx', 'lead'] },
    pattern: {
      kick: [0, 4, 8, 12, 16, 20, 24, 28],
      bass: [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 27, 29, 30, 31],
      snare: [],
      hat: [2, 6, 10, 14, 18, 22, 26, 30],
      clap: [12, 28],
      openhat: [6, 14, 22, 30],
      rimshot: [7, 15, 23, 31],
      lowtom: [15, 31],
      hitom: [3, 11, 19, 27],
      cowbell: [6, 14, 22, 30],
      fx: [15, 31],
    },
    melody: [[2, 4], [6, 6], [10, 7], [14, 4], [18, 5], [22, 7], [26, 6], [30, 4]],
  },
};

// Caché en memoria de los ArrayBuffers descargados para no volver a pedirlos al cambiar de ruta
const rawSampleCache = new Map();

function noteNameAtOctave(note, octaveOffset) {
  return note.replace(/(-?\d+)$/, (_, octave) => String(Number(octave) + octaveOffset));
}

function makeBassPattern(preset) {
  const notes = Array(STEP_COUNT).fill(null);
  preset.pattern.bass.forEach(step => {
    notes[step] = preset.bassDegrees[step % 16];
  });
  return notes;
}

function encodeWavFromStereoChunks(leftChunks, rightChunks, sampleRate) {
  const totalSamples = leftChunks.reduce((sum, arr) => sum + arr.length, 0);
  const numChannels = 2;
  const bytesPerSample = 2;
  const dataSize = totalSamples * numChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeStr = (offset, text) => {
    for (let i = 0; i < text.length; i += 1) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
  view.setUint16(32, numChannels * bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let c = 0; c < leftChunks.length; c += 1) {
    const left = leftChunks[c];
    const right = rightChunks[c];
    for (let i = 0; i < left.length; i += 1) {
      const l = Math.max(-1, Math.min(1, left[i]));
      const r = Math.max(-1, Math.min(1, right[i]));
      view.setInt16(offset, l < 0 ? l * 0x8000 : l * 0x7fff, true);
      view.setInt16(offset + 2, r < 0 ? r * 0x8000 : r * 0x7fff, true);
      offset += 4;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function renderPitchedTrack(trackId, name, detail, color, volume, notes, activeNotes, action, octaveOffset = 0) {
  return `
    <section class="groove-pitched-track groove-track-${color}" data-pitched-track="${trackId}">
      <div class="groove-pitched-heading">
        <div class="groove-track-controls">
          <div class="groove-track-toprow">
            <button class="groove-track-name" type="button" data-action="preview" data-track="${trackId}" aria-label="Escuchar ${detail}">
              <span>${name}</span>
              <small data-pitched-scale="${trackId}">${detail}</small>
            </button>
            <div class="groove-track-ms" role="group" aria-label="Random, Mute y Solo para ${name}">
              <button type="button" class="groove-ms-btn groove-rand-btn" data-action="random-track" data-track="${trackId}" title="Generar patrón inteligente para ${name}">🎲</button>
              <button type="button" class="groove-ms-btn groove-mute-btn" data-action="mute-track" data-track="${trackId}" aria-pressed="false" title="Silenciar pista (Mute)">M</button>
              <button type="button" class="groove-ms-btn groove-solo-btn" data-action="solo-track" data-track="${trackId}" aria-pressed="false" title="Aislar pista (Solo)">S</button>
            </div>
          </div>
          <label class="groove-track-volume">
            <span>VOL</span>
            <input type="range" min="0" max="100" value="${volume}" step="1" data-track-volume="${trackId}" aria-label="Volumen de ${detail}">
            <output data-track-volume-value="${trackId}">${volume}</output>
          </label>
        </div>
        <span class="groove-pitched-hint">${trackId === 'bass' ? 'Tocá 🎲 en BASS para crear líneas de bajo del género actual' : 'Tocá 🎲 en SYNTH para generar melodías en escala (Compás A + B)'}</span>
      </div>
      ${notes.map((note, noteIndex) => `
        <div class="groove-pitched-row">
          <span class="groove-melody-note" data-note-label="${trackId}-${noteIndex}">${noteNameAtOctave(note, octaveOffset)}</span>
          ${Array.from({ length: STEP_COUNT }, (_, step) => {
            const isActive = activeNotes[step] === noteIndex;
            return `
              <button
                type="button"
                class="groove-step groove-melody-step${step === 16 ? ' groove-bar-start' : ''}${isActive ? ' is-active' : ''}"
                data-action="${action}"
                data-step="${step}"
                data-note="${noteIndex}"
                aria-label="${name} ${noteNameAtOctave(note, octaveOffset)}, compás ${Math.floor(step / 16) + 1}, paso ${(step % 16) + 1}; tocar para seleccionar"
                aria-pressed="${isActive}"
              ></button>
            `;
          }).join('')}
        </div>
      `).join('')}
    </section>
  `;
}

export function renderGroovebox() {
  return `
    <main class="project-container groovebox-page">
      <div class="back-nav">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
      </div>

      <header class="project-header groovebox-header">
        <span class="project-genre"><i data-lucide="activity"></i> LABORATORIO · SAMPLER & LIVE FX</span>
        <h1>Mini Groovebox</h1>
        <p class="project-subtitle">Armá tu loop con samples de estudio reales, usá el generador inteligente 🎲 por canal o manipulá los filtros DJ en vivo.</p>
      </header>

      <section class="groovebox" aria-label="Mini Groovebox">
        <div class="groovebox-topline">
          <div>
            <span class="groovebox-eyebrow">WAVESTYLE / SEQUENCER & LIVE DECK</span>
            <p class="groovebox-hint">Cada canal tiene su propio dado 🎲 con lógica musical para variar un solo instrumento sin romper tu base.</p>
          </div>
          <span class="groovebox-live"><span aria-hidden="true"></span> SAMPLES 24-BIT WAV</span>
        </div>

        <div class="groovebox-controls">
          <button class="groove-play-button" type="button" data-action="play" aria-pressed="false">
            <i data-lucide="play" aria-hidden="true"></i>
            <span data-play-label>Reproducir</span>
          </button>

          <label class="groove-tempo">
            <span class="groove-control-label">TEMPO</span>
            <span class="groove-tempo-value"><output data-tempo-value>124</output> <small>BPM</small></span>
            <input type="range" min="70" max="160" value="124" step="1" data-control="tempo" aria-label="Tempo en BPM">
          </label>

          <div class="groove-volume">
            <label class="groove-control-label" for="groove-volume">MASTER</label>
            <div class="groove-volume-control">
              <i data-lucide="volume-2" aria-hidden="true"></i>
              <input id="groove-volume" type="range" min="0" max="100" value="80" data-control="volume" aria-label="Volumen">
            </div>
          </div>

          <div class="groovebox-actions">
            <button type="button" class="groove-utility-button groove-rec-button" data-action="record" aria-pressed="false" title="Grabar lo que suena a archivo .WAV">
              <span class="groove-rec-dot" aria-hidden="true"></span>
              <span data-rec-label>REC .WAV</span>
            </button>
            <button type="button" class="groove-utility-button" data-action="share" title="Copiar link con tu loop actual">
              <i data-lucide="share-2" aria-hidden="true"></i><span>Compartir</span>
            </button>
            <button type="button" class="groove-utility-button" data-action="random" title="Generar un groove completo estructurado según el género actual" aria-label="Generar Groove Inteligente">
              <i data-lucide="sparkles" aria-hidden="true"></i><span>Groove IA</span>
            </button>
            <button type="button" class="groove-utility-button" data-action="clear" aria-label="Borrar todos los pasos">
              <i data-lucide="rotate-ccw" aria-hidden="true"></i><span>Limpiar</span>
            </button>
          </div>
        </div>

        <div class="groove-presets" role="group" aria-label="Plantillas de género">
          <span class="groove-control-label">TEMPLATES & KITS DE ESTUDIO</span>
          <div class="groove-preset-buttons">
            <button type="button" class="groove-preset-button is-selected" data-action="preset" data-preset="house" aria-pressed="true">
              <span>House</span><small>Funky · 124 BPM</small>
            </button>
            <button type="button" class="groove-preset-button" data-action="preset" data-preset="techno" aria-pressed="false">
              <span>Techno</span><small>Raw · 138 BPM</small>
            </button>
            <button type="button" class="groove-preset-button" data-action="preset" data-preset="psytrance" aria-pressed="false">
              <span>Psytrance</span><small>Full-on · 145 BPM</small>
            </button>
          </div>
        </div>

        <!-- MÓDULO DJ PERFORMANCE FX -->
        <div class="groove-fx-rack" role="region" aria-label="Efectos de performance DJ en vivo">
          <div class="groove-fx-header">
            <span class="groove-control-label">DJ PERFORMANCE FX · LIVE CABIN</span>
            <button type="button" class="groove-fx-reset" data-action="reset-fx" title="Restaurar filtros y efectos al centro">
              Reset FX
            </button>
          </div>

          <div class="groove-fx-grid">
            <label class="groove-fx-control">
              <div class="groove-fx-label-row">
                <span>DJ FILTER (LPF / HPF)</span>
                <output data-fx-output="dj-filter">CLEAN</output>
              </div>
              <input type="range" min="-100" max="100" value="0" step="1" data-control="dj-filter" aria-label="Filtro maestro LPF y HPF">
            </label>

            <label class="groove-fx-control">
              <div class="groove-fx-label-row">
                <span>ACID / SYNTH CUTOFF</span>
                <output data-fx-output="acid-drive">40%</output>
              </div>
              <input type="range" min="0" max="100" value="40" step="1" data-control="acid-drive" aria-label="Brillo y resonancia de bajo y sintetizador">
            </label>

            <label class="groove-fx-control">
              <div class="groove-fx-label-row">
                <span>SPACE DUB ECHO</span>
                <output data-fx-output="dub-echo">20%</output>
              </div>
              <input type="range" min="0" max="100" value="20" step="1" data-control="dub-echo" aria-label="Nivel de delay espacial">
            </label>

            <div class="groove-fx-buttons">
              <button type="button" class="groove-kill-kick-btn" data-action="kill-kick" aria-pressed="false" title="Cortar o soltar el Kick para armar el drop">
                <span>KILL KICK</span>
                <small data-kill-kick-label>DROP ACTIVO</small>
              </button>
            </div>
          </div>
        </div>

        <div class="groove-tabs" role="tablist" aria-label="Familias de instrumentos">
          <button type="button" class="groove-tab is-selected" role="tab" id="groove-tab-keyboard" aria-controls="groove-panel-keyboard" aria-selected="true" data-action="tab" data-panel="keyboard">
            <span>Teclado</span><small>Bajo + Synth Lead</small>
          </button>
          <button type="button" class="groove-tab" role="tab" id="groove-tab-drums" aria-controls="groove-panel-drums" aria-selected="false" tabindex="-1" data-action="tab" data-panel="drums">
            <span>Percusión & FX</span><small>10 canales + 🎲 / M / S</small>
          </button>
        </div>

        <section class="groove-panel" id="groove-panel-keyboard" role="tabpanel" aria-labelledby="groove-tab-keyboard" data-panel-content="keyboard">
          <div class="groove-sequencer-scroll" role="region" aria-label="Teclado: bajo y sintetizador en 32 pasos; deslizá horizontalmente" tabindex="0">
            <div class="groove-sequencer">
              <div class="groove-step-numbers" aria-hidden="true">
                <span>PISTA / 🎲·M·S</span>
                ${Array.from({ length: STEP_COUNT }, (_, index) => `<span class="${index % 4 === 0 ? 'groove-beat-number' : ''}${index === 16 ? ' groove-bar-start' : ''}">${String((index % 16) + 1).padStart(2, '0')}</span>`).join('')}
              </div>
              ${renderPitchedTrack('bass', 'BASS', 'Bajo · D2 menor', 'lime', 100, genrePresets.house.scaleNotes, makeBassPattern(genrePresets.house), 'bass-step', -1)}
              ${renderPitchedTrack('lead', 'SYNTH', 'Synth · D4 menor', 'gold', 75, genrePresets.house.scaleNotes, Object.assign(Array(STEP_COUNT).fill(null), Object.fromEntries(genrePresets.house.melody)), 'melody-step', 1)}
            </div>
          </div>
        </section>

        <section class="groove-panel" id="groove-panel-drums" role="tabpanel" aria-labelledby="groove-tab-drums" data-panel-content="drums" hidden>
          <div class="groove-sequencer-scroll" role="region" aria-label="Percusión en 32 pasos; deslizá horizontalmente" tabindex="0">
            <div class="groove-sequencer">
              <div class="groove-step-numbers" aria-hidden="true">
                <span>PERCUSIÓN / 🎲·M·S</span>
                ${Array.from({ length: STEP_COUNT }, (_, index) => `<span class="${index % 4 === 0 ? 'groove-beat-number' : ''}${index === 16 ? ' groove-bar-start' : ''}">${String((index % 16) + 1).padStart(2, '0')}</span>`).join('')}
              </div>
              ${tracks.filter(track => drumTrackIds.includes(track.id)).map(track => `
                <div class="groove-track groove-track-${track.id} groove-track-${track.color}" data-track-row="${track.id}">
                  <div class="groove-track-controls">
                    <div class="groove-track-toprow">
                      <button class="groove-track-name" type="button" data-action="preview" data-track="${track.id}" aria-label="Escuchar ${track.detail}">
                        <span>${track.name}</span>
                        <small>${track.detail}</small>
                      </button>
                      <div class="groove-track-ms" role="group" aria-label="Random, Mute y Solo para ${track.name}">
                        <button type="button" class="groove-ms-btn groove-rand-btn" data-action="random-track" data-track="${track.id}" title="Generar patrón inteligente para ${track.detail}">🎲</button>
                        <button type="button" class="groove-ms-btn groove-mute-btn" data-action="mute-track" data-track="${track.id}" aria-pressed="false" title="Silenciar ${track.detail}">M</button>
                        <button type="button" class="groove-ms-btn groove-solo-btn" data-action="solo-track" data-track="${track.id}" aria-pressed="false" title="Solo ${track.detail}">S</button>
                      </div>
                    </div>
                    <label class="groove-track-volume">
                      <span>VOL</span>
                      <input type="range" min="0" max="100" value="100" step="1" data-track-volume="${track.id}" aria-label="Volumen de ${track.detail}">
                      <output data-track-volume-value="${track.id}">100</output>
                    </label>
                  </div>
                  ${Array.from({ length: STEP_COUNT }, (_, index) => `
                    <button
                      type="button"
                      class="groove-step${initialPattern[track.id].includes(index) ? ' is-active' : ''}"
                      data-action="step"
                      data-track="${track.id}"
                      data-step="${index}"
                      aria-label="${track.detail}, compás ${Math.floor(index / 16) + 1}, paso ${(index % 16) + 1}; tocar para activar o desactivar"
                      aria-pressed="${initialPattern[track.id].includes(index)}"
                    ></button>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <div class="groovebox-footer">
          <p class="groove-status" data-status aria-live="polite">Tocá Reproducir para escuchar el kit de estudio o probá los filtros DJ en vivo.</p>
          <span class="groove-step-readout"><span data-step-readout>--</span> / 32</span>
        </div>
      </section>

      <p class="groovebox-note"><i data-lucide="smartphone" aria-hidden="true"></i> Deslizá horizontalmente los 32 pasos, combiná Mute/Solo, grabá tu sesión en WAV o compartí el link de tu creación.</p>
    </main>
  `;
}

export function initGroovebox(root) {
  if (typeof root.__grooveCleanup === 'function') root.__grooveCleanup();
  const trackIds = drumTrackIds;
  const pattern = Object.fromEntries(
    trackIds.map(trackId => [
      trackId,
      Array.from(root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`))
        .map(button => button.getAttribute('aria-pressed') === 'true'),
    ]),
  );
  const playButton = root.querySelector('[data-action="play"]');
  const playLabel = root.querySelector('[data-play-label]');
  const recButton = root.querySelector('[data-action="record"]');
  const recLabel = root.querySelector('[data-rec-label]');
  const killKickBtn = root.querySelector('[data-action="kill-kick"]');
  const killKickLabel = root.querySelector('[data-kill-kick-label]');
  const tempoInput = root.querySelector('[data-control="tempo"]');
  const tempoValue = root.querySelector('[data-tempo-value]');
  const volumeInput = root.querySelector('[data-control="volume"]');
  const djFilterInput = root.querySelector('[data-control="dj-filter"]');
  const acidDriveInput = root.querySelector('[data-control="acid-drive"]');
  const dubEchoInput = root.querySelector('[data-control="dub-echo"]');
  const trackVolumeInputs = Object.fromEntries(
    Array.from(root.querySelectorAll('[data-track-volume]'))
      .map(input => [input.dataset.trackVolume, input]),
  );
  const status = root.querySelector('[data-status]');
  const stepReadout = root.querySelector('[data-step-readout]');

  let audioContext;
  let masterGain;
  let djFilterNode;
  let masterCompressor;
  let trackGains = {};
  let bassDucker;
  let delaySends = {};
  let delayNode;
  let delayFeedback;
  let delayReturn;
  let activeGenre = 'house';
  let activeScale = genrePresets.house.scale;
  let activeSwing = genrePresets.house.swing;
  const bassPattern = makeBassPattern(genrePresets.house);
  const melodyPattern = Array(STEP_COUNT).fill(null);
  genrePresets.house.melody.forEach(([step, note]) => {
    melodyPattern[step] = note;
  });

  // Estados de Live Performance (Mute, Solo, Kill Kick, FX Macros y Grabadora WAV)
  const mutedTracks = new Set();
  const soloedTracks = new Set();
  let kickKilled = false;
  let acidDriveAmount = 0.4;
  let dubEchoAmount = 0.2;
  let isRecording = false;
  let recorderNode = null;
  let recLeftChunks = [];
  let recRightChunks = [];
  let recAutoStopTimer = null;

  let noiseBuffer;
  let audioUnlockPromise;
  let audioOutputPrimed = false;
  let schedulerId;
  let nextStepAt = 0;
  let nextStepIndex = 0;
  let isPlaying = false;
  let drawingPointerId = null;
  let drawingMode = '';
  let drawingValue;
  const visualTimers = new Set();

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  function isTrackAudible(trackId) {
    if (trackId === 'kick' && kickKilled) return false;
    if (soloedTracks.size > 0) {
      return soloedTracks.has(trackId) && !mutedTracks.has(trackId);
    }
    return !mutedTracks.has(trackId);
  }

  function updateMuteSoloUI() {
    root.querySelectorAll('[data-action="mute-track"]').forEach(btn => {
      const isMuted = mutedTracks.has(btn.dataset.track);
      btn.classList.toggle('is-active', isMuted);
      btn.setAttribute('aria-pressed', String(isMuted));
    });
    root.querySelectorAll('[data-action="solo-track"]').forEach(btn => {
      const isSolo = soloedTracks.has(btn.dataset.track);
      btn.classList.toggle('is-active', isSolo);
      btn.setAttribute('aria-pressed', String(isSolo));
    });
  }

  function applyDjFilterValue(rawVal) {
    const val = Number(rawVal);
    const out = root.querySelector('[data-fx-output="dj-filter"]');
    if (out) {
      out.textContent = val > -5 && val < 5 ? 'CLEAN' : val < 0 ? `LPF ${val}%` : `HPF +${val}%`;
    }
    if (!audioContext || !djFilterNode) return;

    const now = audioContext.currentTime;
    if (val > -5 && val < 5) {
      djFilterNode.type = 'allpass';
      djFilterNode.frequency.setTargetAtTime(1000, now, 0.02);
      djFilterNode.Q.setTargetAtTime(0.001, now, 0.02);
    } else if (val <= -5) {
      const norm = Math.abs(val) / 100; // 0.05..1
      const freq = 18000 * Math.pow(130 / 18000, norm);
      djFilterNode.type = 'lowpass';
      djFilterNode.frequency.setTargetAtTime(freq, now, 0.02);
      djFilterNode.Q.setTargetAtTime(1.8 + norm * 1.4, now, 0.02);
    } else {
      const norm = val / 100; // 0.05..1
      const freq = 30 * Math.pow(3800 / 30, norm);
      djFilterNode.type = 'highpass';
      djFilterNode.frequency.setTargetAtTime(freq, now, 0.02);
      djFilterNode.Q.setTargetAtTime(1.6 + norm * 1.2, now, 0.02);
    }
  }

  function applyDubEchoValue(rawVal) {
    dubEchoAmount = Number(rawVal) / 100;
    const out = root.querySelector('[data-fx-output="dub-echo"]');
    if (out) out.textContent = `${Math.round(dubEchoAmount * 100)}%`;

    if (!audioContext || !delayFeedback || !delayReturn) return;
    const now = audioContext.currentTime;
    const presetDelay = genrePresets[activeGenre]?.delay || genrePresets.house.delay;
    delayFeedback.gain.setTargetAtTime(Math.min(0.78, presetDelay.feedback + dubEchoAmount * 0.45), now, 0.02);
    delayReturn.gain.setTargetAtTime(dubEchoAmount * 0.55, now, 0.02);
  }

  function configureGenreSound(genre) {
    const preset = genrePresets[genre];
    if (!preset) return;

    activeGenre = genre;
    activeScale = preset.scale;
    activeSwing = preset.swing;
    const groovebox = root.querySelector('.groovebox');
    if (groovebox) groovebox.dataset.genre = genre;
    const scaleMode = 'menor';
    const bassLabel = root.querySelector('[data-pitched-scale="bass"]');
    const pianoLabel = root.querySelector('[data-pitched-scale="lead"]');
    if (bassLabel) bassLabel.textContent = `Bajo · ${noteNameAtOctave(preset.scaleNotes[0], -1)} ${scaleMode}`;
    if (pianoLabel) pianoLabel.textContent = `Synth · ${noteNameAtOctave(preset.scaleNotes[0], 1)} ${scaleMode}`;
    root.querySelectorAll('[data-note-label]').forEach(label => {
      const [trackId, noteIndex] = label.dataset.noteLabel.split('-');
      label.textContent = noteNameAtOctave(preset.scaleNotes[Number(noteIndex)], trackId === 'bass' ? -1 : 1);
    });

    if (audioContext && delayNode) {
      const beatDuration = 60 / Number(tempoInput.value);
      delayNode.delayTime.setTargetAtTime(beatDuration * preset.delay.time, audioContext.currentTime, 0.02);
      tracks.forEach(track => {
        const amount = preset.delay.tracks.includes(track.id) ? 0.36 : 0;
        delaySends[track.id].gain.setTargetAtTime(amount, audioContext.currentTime, 0.02);
      });
      applyDubEchoValue(dubEchoInput?.value ?? 20);
    }
  }

  function getAudioContext() {
    if (!audioContext) {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) {
        throw new Error('Este navegador no tiene soporte para Web Audio.');
      }

      if (navigator.audioSession && navigator.audioSession.type !== 'playback') {
        try {
          navigator.audioSession.type = 'playback';
        } catch (error) {
          console.warn('No se pudo configurar la sesión de audio de reproducción:', error);
        }
      }

      audioContext = new AudioContextConstructor();
      audioContext.addEventListener('statechange', handleAudioStateChange);
      masterGain = audioContext.createGain();
      masterGain.gain.value = Number(volumeInput.value) / 100;

      djFilterNode = audioContext.createBiquadFilter();
      djFilterNode.type = 'allpass';
      djFilterNode.frequency.value = 1000;
      djFilterNode.Q.value = 0.001;

      masterCompressor = audioContext.createDynamicsCompressor();
      masterCompressor.threshold.value = -12;
      masterCompressor.knee.value = 3;
      masterCompressor.ratio.value = 12;
      masterCompressor.attack.value = 0.003;
      masterCompressor.release.value = 0.12;

      masterGain.connect(djFilterNode);
      djFilterNode.connect(masterCompressor);
      masterCompressor.connect(audioContext.destination);

      trackGains = Object.fromEntries(tracks.map(track => {
        const trackId = track.id;
        const gain = audioContext.createGain();
        gain.gain.value = Number(trackVolumeInputs[trackId].value) / 100;
        gain.connect(masterGain);
        return [trackId, gain];
      }));
      bassDucker = audioContext.createGain();
      bassDucker.gain.value = 1;
      bassDucker.connect(trackGains.bass);
      delayNode = audioContext.createDelay(1);
      delayFeedback = audioContext.createGain();
      delayReturn = audioContext.createGain();
      delayNode.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayNode.connect(delayReturn);
      delayReturn.connect(masterGain);
      delaySends = Object.fromEntries(tracks.map(track => {
        const send = audioContext.createGain();
        send.gain.value = 0;
        trackGains[track.id].connect(send);
        send.connect(delayNode);
        return [track.id, send];
      }));
      configureGenreSound(activeGenre);
      applyDjFilterValue(djFilterInput?.value ?? 0);

      noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate, audioContext.sampleRate);
      const samples = noiseBuffer.getChannelData(0);
      for (let index = 0; index < samples.length; index += 1) {
        samples[index] = Math.random() * 2 - 1;
      }

      loadAllSamples(audioContext);
    }

    return audioContext;
  }

  function unlockAudio() {
    const context = getAudioContext();
    if (context.state === 'running') return Promise.resolve(context);

    if (!audioUnlockPromise) {
      audioUnlockPromise = context.resume()
        .then(() => {
          if (context.state !== 'running') {
            throw new Error('El navegador no habilitó el audio. Tocá Play otra vez o revisá el volumen del dispositivo.');
          }
          return context;
        })
        .finally(() => {
          audioUnlockPromise = undefined;
        });
    }

    return audioUnlockPromise;
  }

  function primeAudioOutput() {
    if (audioOutputPrimed || !audioContext || audioContext.state === 'closed') return;

    const silentBuffer = audioContext.createBuffer(1, 1, audioContext.sampleRate);
    const source = audioContext.createBufferSource();
    source.buffer = silentBuffer;
    source.connect(audioContext.destination);
    source.start();
    audioOutputPrimed = true;
  }

  function primeAudioFromGesture(event) {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button[data-action="play"], button[data-action="preview"], button[data-action="record"]');
    if (!button) return;

    try {
      const unlockPromise = unlockAudio();
      primeAudioOutput();
      unlockPromise.catch(showAudioError);
    } catch (error) {
      showAudioError(error);
    }
  }

  function handleAudioStateChange() {
    if (!isPlaying || !audioContext || audioContext.state === 'running' || audioContext.state === 'closed') return;

    stopPlayback();
    setStatus('El navegador pausó el audio. Tocá Reproducir para activarlo de nuevo.', true);
  }

  // Caché de buffers decodificados por instancia de AudioContext
  const sampleBuffers = {};
  let sampleLoadPromise = null;
  let activeOpenHatGain = null;

  const SAMPLE_FILES = {
    'kick-house': 'kick-house.wav',
    'kick-techno': 'kick-techno.wav',
    'kick-psy': 'kick-psy.wav',
    'snare-house': 'snare-house.wav',
    'snare-techno': 'snare-techno.wav',
    'snare-psy': 'snare-psy.wav',
    'hat-club': 'hat-club.wav',
    'hat-psy': 'hat-psy.wav',
    'openhat-club': 'openhat-club.wav',
    'openhat-psy': 'openhat-psy.wav',
    'clap-house': 'clap-house.wav',
    'clap-techno': 'clap-techno.wav',
    'clap-psy': 'clap-psy.wav',
    rimshot: 'rimshot.wav',
    lowtom: 'lowtom.wav',
    hitom: 'hitom.wav',
    cowbell: 'cowbell.wav',
    'fx-house': 'fx-house.wav',
    'fx-techno': 'fx-techno.wav',
    'fx-psy': 'fx-psy.wav',
    'bass-house': 'bass-house.wav',
    'bass-techno': 'bass-techno.wav',
    'bass-psy': 'bass-psy.wav',
    'lead-house': 'lead-house.wav',
    'lead-techno': 'lead-techno.wav',
    'lead-psy': 'lead-psy.wav',
  };

  async function fetchSampleArrayBuffer(fileName) {
    if (rawSampleCache.has(fileName)) {
      return rawSampleCache.get(fileName);
    }

    const urls = [
      new URL(`./public/audio/groovebox/${fileName}`, document.baseURI).href,
      new URL(`./audio/groovebox/${fileName}`, document.baseURI).href,
    ];
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const buf = await response.arrayBuffer();
          rawSampleCache.set(fileName, buf);
          return buf;
        }
      } catch {
        // Intentar ruta alternativa
      }
    }
    throw new Error(`No se pudo cargar el sample ${fileName}`);
  }

  function loadAllSamples(context) {
    if (sampleLoadPromise) return sampleLoadPromise;

    sampleLoadPromise = Promise.all(
      Object.entries(SAMPLE_FILES).map(async ([key, fileName]) => {
        try {
          const rawBuffer = await fetchSampleArrayBuffer(fileName);
          const decoded = await context.decodeAudioData(rawBuffer.slice(0));
          sampleBuffers[key] = decoded;
        } catch (err) {
          console.warn(`[Groovebox] Fallback sintetizado para ${key}:`, err);
        }
      }),
    );

    return sampleLoadPromise;
  }

  function playSampleBuffer(buffer, time, destination, {
    gain = 1,
    playbackRate = 1,
    maxDuration = null,
    attack = 0.001,
    release = 0.04,
    filterType = null,
    filterFreq = 20000,
    filterEndFreq = null,
    filterQ = 0.7,
    isOpenHat = false,
  } = {}) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.setValueAtTime(playbackRate, time);

    const env = audioContext.createGain();
    const naturalDuration = buffer.duration / playbackRate;
    const totalDuration = maxDuration ? Math.min(naturalDuration, maxDuration) : naturalDuration;
    const releaseStart = Math.max(time + attack + 0.005, time + totalDuration - release);

    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(gain, time + attack);
    env.gain.setValueAtTime(gain, releaseStart);
    env.gain.exponentialRampToValueAtTime(0.0001, time + totalDuration);

    if (filterType) {
      const filter = audioContext.createBiquadFilter();
      filter.type = filterType;
      filter.Q.value = filterQ;
      filter.frequency.setValueAtTime(filterFreq, time);
      if (filterEndFreq) {
        filter.frequency.exponentialRampToValueAtTime(
          Math.max(40, filterEndFreq),
          time + Math.min(0.18, totalDuration * 0.8),
        );
      }
      source.connect(filter);
      filter.connect(env);
    } else {
      source.connect(env);
    }

    env.connect(destination);
    source.start(time);
    source.stop(time + totalDuration + 0.01);

    if (isOpenHat) {
      activeOpenHatGain = env;
    }
  }

  function playKick(time) {
    const key = activeGenre === 'psytrance'
      ? 'kick-psy'
      : activeGenre === 'techno'
        ? 'kick-techno'
        : 'kick-house';
    const buffer = sampleBuffers[key];

    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.kick, {
        gain: 0.96,
        maxDuration: activeGenre === 'psytrance' ? 0.24 : 0.38,
        release: 0.045,
      });
    } else {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(165, time);
      oscillator.frequency.exponentialRampToValueAtTime(48, time + 0.055);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.82, time + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
      oscillator.connect(gain);
      gain.connect(trackGains.kick);
      oscillator.start(time);
      oscillator.stop(time + 0.17);
    }

    bassDucker.gain.cancelScheduledValues(time);
    bassDucker.gain.setValueAtTime(0.28, time);
    bassDucker.gain.linearRampToValueAtTime(1, time + (activeGenre === 'psytrance' ? 0.065 : 0.095));
  }

  function playBass(time, step = 0) {
    const noteIndex = bassPattern[step] ?? 0;
    const fundamental = activeScale[noteIndex] / 2;
    const stepDuration = 60 / Number(tempoInput.value) / 4;
    const duration = activeGenre === 'psytrance' ? stepDuration * 0.72 : stepDuration * 0.88;
    const driveMultiplier = 0.55 + acidDriveAmount * 1.45;
    const extraResonance = acidDriveAmount * 3.2;

    const sampleConfig = activeGenre === 'psytrance'
      ? { key: 'bass-psy', rootFreq: 55.0, gain: 0.86, cutoffStart: 2200 * driveMultiplier, cutoffEnd: 380 * driveMultiplier }
      : activeGenre === 'techno'
        ? { key: 'bass-techno', rootFreq: 65.406, gain: 0.84, cutoffStart: 1800 * driveMultiplier, cutoffEnd: 340 * driveMultiplier }
        : { key: 'bass-house', rootFreq: 65.406, gain: 0.82, cutoffStart: 1600 * driveMultiplier, cutoffEnd: 420 * driveMultiplier };

    const buffer = sampleBuffers[sampleConfig.key];
    if (buffer) {
      playSampleBuffer(buffer, time, bassDucker, {
        gain: sampleConfig.gain,
        playbackRate: fundamental / sampleConfig.rootFreq,
        maxDuration: duration,
        attack: 0.002,
        release: activeGenre === 'psytrance' ? 0.022 : 0.04,
        filterType: 'lowpass',
        filterFreq: Math.min(14000, sampleConfig.cutoffStart),
        filterEndFreq: Math.min(6000, sampleConfig.cutoffEnd),
        filterQ: (activeGenre === 'techno' ? 1.6 : 0.9) + extraResonance,
      });
    }

    const sub = audioContext.createOscillator();
    const subGain = audioContext.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(fundamental, time);
    subGain.gain.setValueAtTime(0.0001, time);
    subGain.gain.exponentialRampToValueAtTime(buffer ? 0.24 : 0.42, time + 0.003);
    subGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    sub.connect(subGain);
    subGain.connect(bassDucker);
    sub.start(time);
    sub.stop(time + duration + 0.005);
  }

  function playLead(time, noteIndex = 0) {
    const baseFrequency = activeScale[noteIndex] * 2;
    const duration = Math.min(0.45, (60 / Number(tempoInput.value) / 4) * 1.9);
    const driveMultiplier = 0.5 + acidDriveAmount * 1.6;
    const extraResonance = acidDriveAmount * 3.8;

    const sampleConfig = activeGenre === 'psytrance'
      ? { key: 'lead-psy', rootFreq: 261.626, gain: 0.74, cutoffStart: 5400 * driveMultiplier, cutoffEnd: 1200 * driveMultiplier }
      : activeGenre === 'techno'
        ? { key: 'lead-techno', rootFreq: 293.665, gain: 0.72, cutoffStart: 4400 * driveMultiplier, cutoffEnd: 980 * driveMultiplier }
        : { key: 'lead-house', rootFreq: 349.228, gain: 0.76, cutoffStart: 5000 * driveMultiplier, cutoffEnd: 1450 * driveMultiplier };

    const buffer = sampleBuffers[sampleConfig.key];
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.lead, {
        gain: sampleConfig.gain,
        playbackRate: baseFrequency / sampleConfig.rootFreq,
        maxDuration: duration,
        attack: 0.002,
        release: 0.06,
        filterType: 'lowpass',
        filterFreq: Math.min(16000, sampleConfig.cutoffStart),
        filterEndFreq: Math.min(8000, sampleConfig.cutoffEnd),
        filterQ: (activeGenre === 'psytrance' ? 1.8 : 1.0) + extraResonance,
      });
      return;
    }

    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(baseFrequency, time);
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.exponentialRampToValueAtTime(0.28, time + 0.003);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(envelope);
    envelope.connect(trackGains.lead);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.01);
  }

  function playSnare(time) {
    const key = activeGenre === 'psytrance'
      ? 'snare-psy'
      : activeGenre === 'techno'
        ? 'snare-techno'
        : 'snare-house';
    const buffer = sampleBuffers[key];
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.snare, {
        gain: 0.85,
        maxDuration: 0.28,
        release: 0.04,
      });
    }
  }

  function playHat(time) {
    if (activeOpenHatGain) {
      try {
        activeOpenHatGain.gain.cancelScheduledValues(time);
        activeOpenHatGain.gain.setTargetAtTime(0.0001, time, 0.008);
      } catch {
        // Ignorar si ya finalizó
      }
      activeOpenHatGain = null;
    }

    const key = activeGenre === 'psytrance' ? 'hat-psy' : 'hat-club';
    const buffer = sampleBuffers[key];
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.hat, {
        gain: 0.74,
        maxDuration: 0.095,
        release: 0.025,
      });
    }
  }

  function playClap(time) {
    const key = activeGenre === 'psytrance'
      ? 'clap-psy'
      : activeGenre === 'techno'
        ? 'clap-techno'
        : 'clap-house';
    const buffer = sampleBuffers[key];
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.clap, {
        gain: 0.82,
        maxDuration: 0.32,
        release: 0.05,
      });
    }
  }

  function playOpenHat(time) {
    const key = activeGenre === 'psytrance' ? 'openhat-psy' : 'openhat-club';
    const buffer = sampleBuffers[key];
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.openhat, {
        gain: 0.78,
        maxDuration: 0.34,
        release: 0.06,
        isOpenHat: true,
      });
    }
  }

  function playRimshot(time) {
    const buffer = sampleBuffers.rimshot;
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.rimshot, {
        gain: 0.78,
        maxDuration: 0.22,
        release: 0.03,
      });
    }
  }

  function playLowTom(time) {
    const buffer = sampleBuffers.lowtom;
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.lowtom, {
        gain: 0.84,
        playbackRate: 0.88,
        maxDuration: 0.32,
        release: 0.045,
      });
    }
  }

  function playHighTom(time) {
    const buffer = sampleBuffers.hitom;
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.hitom, {
        gain: 0.82,
        playbackRate: 1.12,
        maxDuration: 0.28,
        release: 0.04,
      });
    }
  }

  function playCowbell(time) {
    const buffer = sampleBuffers.cowbell;
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.cowbell, {
        gain: 0.72,
        playbackRate: 1.0,
        maxDuration: 0.26,
        release: 0.04,
      });
    }
  }

  function playFx(time) {
    const key = activeGenre === 'psytrance'
      ? 'fx-psy'
      : activeGenre === 'techno'
        ? 'fx-techno'
        : 'fx-house';
    const buffer = sampleBuffers[key];
    if (buffer) {
      playSampleBuffer(buffer, time, trackGains.fx, {
        gain: 0.76,
        maxDuration: 0.48,
        release: 0.07,
      });
    }
  }

  const soundByTrack = {
    kick: playKick,
    bass: playBass,
    snare: playSnare,
    hat: playHat,
    clap: playClap,
    openhat: playOpenHat,
    rimshot: playRimshot,
    lowtom: playLowTom,
    hitom: playHighTom,
    cowbell: playCowbell,
    fx: playFx,
    lead: playLead,
  };

  function setPlayhead(step, delay) {
    let timer;
    timer = window.setTimeout(() => {
      visualTimers.delete(timer);
      root.querySelectorAll('.groove-step.is-current').forEach(button => {
        button.classList.remove('is-current');
      });
      root.querySelectorAll(`[data-step="${step}"]`).forEach(button => {
        button.classList.add('is-current');
      });
      stepReadout.textContent = String(step + 1).padStart(2, '0');
    }, Math.max(0, delay * 1000));
    visualTimers.add(timer);
  }

  function scheduleStep(step, time) {
    trackIds.forEach(trackId => {
      if (pattern[trackId][step] && isTrackAudible(trackId)) {
        soundByTrack[trackId](time, step);
      }
    });
    if (bassPattern[step] !== null && isTrackAudible('bass')) {
      playBass(time, step);
    }
    if (melodyPattern[step] !== null && isTrackAudible('lead')) {
      playLead(time, melodyPattern[step]);
    }
    setPlayhead(step, time - audioContext.currentTime);
  }

  function scheduler() {
    while (nextStepAt < audioContext.currentTime + 0.1) {
      const step = nextStepIndex;
      const stepDuration = 60 / Number(tempoInput.value) / 4;
      const swingOffset = step % 2 === 1 ? (60 / Number(tempoInput.value)) * activeSwing : 0;
      scheduleStep(step, nextStepAt + swingOffset);
      nextStepAt += stepDuration;
      nextStepIndex = (nextStepIndex + 1) % STEP_COUNT;
    }
  }

  function stopWavRecording(download = true) {
    if (!isRecording) return;
    isRecording = false;
    window.clearTimeout(recAutoStopTimer);
    recAutoStopTimer = null;

    if (recorderNode) {
      try {
        masterCompressor?.disconnect(recorderNode);
        recorderNode.disconnect();
      } catch {
        // Ignorar desconexión previa
      }
      recorderNode.onaudioprocess = null;
      recorderNode = null;
    }

    recButton?.classList.remove('is-recording');
    recButton?.setAttribute('aria-pressed', 'false');
    if (recLabel) recLabel.textContent = 'REC .WAV';

    if (download && recLeftChunks.length > 0 && audioContext) {
      const wavBlob = encodeWavFromStereoChunks(recLeftChunks, recRightChunks, audioContext.sampleRate);
      const url = URL.createObjectURL(wavBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wavestyle-loop-${activeGenre}-${tempoInput.value}bpm.wav`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
      setStatus(`¡Grabación lista! Se descargó wavestyle-loop-${activeGenre}-${tempoInput.value}bpm.wav`);
    }

    recLeftChunks = [];
    recRightChunks = [];
  }

  async function toggleWavRecording() {
    if (isRecording) {
      stopWavRecording(true);
      return;
    }

    if (!isPlaying) {
      await startPlayback();
    } else {
      await unlockAudio();
    }

    recLeftChunks = [];
    recRightChunks = [];
    recorderNode = audioContext.createScriptProcessor(4096, 2, 2);
    recorderNode.onaudioprocess = event => {
      if (!isRecording) return;
      recLeftChunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
      recRightChunks.push(new Float32Array(event.inputBuffer.getChannelData(1)));
    };

    masterCompressor.connect(recorderNode);
    recorderNode.connect(audioContext.destination);
    isRecording = true;

    recButton?.classList.add('is-recording');
    recButton?.setAttribute('aria-pressed', 'true');
    if (recLabel) recLabel.textContent = 'BAJAR .WAV';
    setStatus('Grabando sesión en vivo... Tocá BAJAR .WAV cuando quieras guardar el archivo.');

    recAutoStopTimer = window.setTimeout(() => {
      if (isRecording) stopWavRecording(true);
    }, 30000);
  }

  function stopPlayback() {
    if (isRecording) stopWavRecording(true);
    isPlaying = false;
    window.clearInterval(schedulerId);
    schedulerId = undefined;
    visualTimers.forEach(timer => window.clearTimeout(timer));
    visualTimers.clear();
    root.querySelectorAll('.groove-step.is-current').forEach(button => {
      button.classList.remove('is-current');
    });
    stepReadout.textContent = '--';
    playButton.setAttribute('aria-pressed', 'false');
    playButton.classList.remove('is-playing');
    playLabel.textContent = 'Reproducir';
  }

  async function startPlayback() {
    const context = await unlockAudio();
    await loadAllSamples(context);
    isPlaying = true;
    nextStepIndex = 0;
    nextStepAt = audioContext.currentTime + 0.05;
    scheduler();
    schedulerId = window.setInterval(scheduler, 25);
    playButton.setAttribute('aria-pressed', 'true');
    playButton.classList.add('is-playing');
    playLabel.textContent = 'Detener';
    setStatus('Loop en marcha con samples de estudio reales. ¡Usá los filtros DJ o Mute/Solo en vivo!');
  }

  function updateStepButton(button, isActive) {
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    pattern[button.dataset.track][Number(button.dataset.step)] = isActive;
  }

  function renderPitchPattern(trackId, activeNotes) {
    const action = trackId === 'bass' ? 'bass-step' : 'melody-step';
    root.querySelectorAll(`[data-action="${action}"]`).forEach(button => {
      const isActive = activeNotes[Number(button.dataset.step)] === Number(button.dataset.note);
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setPitchStep(trackId, step, noteIndex) {
    const activeNotes = trackId === 'bass' ? bassPattern : melodyPattern;
    activeNotes[step] = noteIndex;
    renderPitchPattern(trackId, activeNotes);
  }

  function updatePresetSelection(presetId = '') {
    root.querySelectorAll('[data-action="preset"]').forEach(button => {
      const isSelected = button.dataset.preset === presetId;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
  }

  function selectPanel(panelName) {
    root.querySelectorAll('[data-action="tab"]').forEach(tab => {
      const selected = tab.dataset.panel === panelName;
      tab.classList.toggle('is-selected', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    root.querySelectorAll('[data-panel-content]').forEach(panel => {
      panel.hidden = panel.dataset.panelContent !== panelName;
    });
  }

  function applyGenrePreset(presetId) {
    const preset = genrePresets[presetId];
    if (!preset) return;

    trackIds.forEach(trackId => {
      const activeSteps = new Set(preset.pattern[trackId] || []);
      root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`).forEach(button => {
        updateStepButton(button, activeSteps.has(Number(button.dataset.step)));
      });
    });

    bassPattern.splice(0, bassPattern.length, ...makeBassPattern(preset));
    melodyPattern.fill(null);
    preset.melody.forEach(([step, note]) => {
      melodyPattern[step] = note;
    });
    renderPitchPattern('bass', bassPattern);
    renderPitchPattern('lead', melodyPattern);
    configureGenreSound(presetId);
    tempoInput.value = String(preset.bpm);
    tempoValue.value = String(preset.bpm);
    tempoValue.textContent = String(preset.bpm);
    updatePresetSelection(presetId);
    setStatus(`Kit ${preset.name} cargado a ${preset.bpm} BPM con samples dedicados.`);
  }

  async function shareCurrentLoop() {
    const payload = {
      g: activeGenre,
      b: Number(tempoInput.value),
      d: Object.fromEntries(
        trackIds.map(id => [
          id,
          pattern[id].reduce((acc, active, idx) => {
            if (active) acc.push(idx);
            return acc;
          }, []),
        ]),
      ),
      bs: bassPattern,
      ml: melodyPattern,
    };

    const encoded = btoa(JSON.stringify(payload))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    const shareUrl = `${window.location.origin}${window.location.pathname}#/games?loop=${encoded}`;
    window.history.replaceState(null, '', `#/games?loop=${encoded}`);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus('¡Link de tu loop copiado al portapapeles! Compartilo con quien quieras.');
    } catch {
      setStatus('Link de tu loop generado en la barra de direcciones del navegador.');
    }
  }

  function restoreLoopFromHashIfPresent() {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf('?');
    if (queryIndex === -1) return;

    const params = new URLSearchParams(hash.slice(queryIndex + 1));
    const encoded = params.get('loop');
    if (!encoded) return;

    try {
      const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      if (decoded.g && genrePresets[decoded.g]) {
        configureGenreSound(decoded.g);
        updatePresetSelection(decoded.g);
      }
      if (typeof decoded.b === 'number' && decoded.b >= 70 && decoded.b <= 160) {
        tempoInput.value = String(decoded.b);
        tempoValue.value = String(decoded.b);
        tempoValue.textContent = String(decoded.b);
      }
      if (decoded.d && typeof decoded.d === 'object') {
        trackIds.forEach(trackId => {
          const stepsSet = new Set(Array.isArray(decoded.d[trackId]) ? decoded.d[trackId] : []);
          root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`).forEach(button => {
            updateStepButton(button, stepsSet.has(Number(button.dataset.step)));
          });
        });
      }
      if (Array.isArray(decoded.bs) && decoded.bs.length === STEP_COUNT) {
        bassPattern.splice(0, STEP_COUNT, ...decoded.bs);
        renderPitchPattern('bass', bassPattern);
      }
      if (Array.isArray(decoded.ml) && decoded.ml.length === STEP_COUNT) {
        melodyPattern.splice(0, STEP_COUNT, ...decoded.ml);
        renderPitchPattern('lead', melodyPattern);
      }
      setStatus('¡Loop compartido cargado con éxito! Tocá Reproducir para escucharlo.');
    } catch (err) {
      console.warn('[Groovebox] No se pudo decodificar el loop compartido:', err);
    }
  }

  // =========================================================================
  // MOTOR DE GENERACIÓN MUSICAL INTELIGENTE (POR CANAL 🎲 & GROOVE IA GLOBAL)
  // =========================================================================

  function pickFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function expand16To32WithTurnaround(bar1Steps, turnaroundAdd = [], turnaroundRemove = []) {
    const removeSet = new Set(turnaroundRemove);
    const set = new Set();
    bar1Steps.forEach(s => {
      if (s >= 0 && s < 16) {
        set.add(s);
        if (!removeSet.has(s + 16)) {
          set.add(s + 16);
        }
      }
    });
    turnaroundAdd.forEach(s => {
      if (s >= 0 && s < 32) set.add(s);
    });
    return Array.from(set).sort((a, b) => a - b);
  }

  function getCurrentDrumSignature(trackId) {
    const active = [];
    root.querySelectorAll(`[data-track="${trackId}"][data-action="step"].is-active`).forEach(btn => {
      active.push(Number(btn.dataset.step));
    });
    return active.join(',');
  }

  function generateSmartDrumSteps(trackId, genre) {
    const libraries = {
      kick: {
        house: [
          expand16To32WithTurnaround([0, 4, 8, 12], [31]),
          expand16To32WithTurnaround([0, 4, 8, 12], [30]),
          expand16To32WithTurnaround([0, 4, 8, 12], [15, 30, 31]),
          expand16To32WithTurnaround([0, 4, 8, 12], [27], [28]),
          expand16To32WithTurnaround([0, 4, 8, 12], []),
        ],
        techno: [
          expand16To32WithTurnaround([0, 4, 8, 12], [31]),
          expand16To32WithTurnaround([0, 4, 8, 12], [15, 30, 31]),
          expand16To32WithTurnaround([0, 3, 4, 8, 12], [31]),
          expand16To32WithTurnaround([0, 4, 8, 11, 12], [30, 31]),
          expand16To32WithTurnaround([0, 4, 8, 12], [29, 31]),
        ],
        psytrance: [
          expand16To32WithTurnaround([0, 4, 8, 12], []),
          expand16To32WithTurnaround([0, 4, 8, 12], [31]),
          expand16To32WithTurnaround([0, 4, 8, 12], [30, 31]),
          expand16To32WithTurnaround([0, 4, 8, 12], [15, 31]),
        ],
      },
      snare: {
        house: [
          expand16To32WithTurnaround([4, 12], []),
          expand16To32WithTurnaround([4, 12], [31]),
          expand16To32WithTurnaround([4, 12], [15, 29, 31]),
          expand16To32WithTurnaround([4, 12], [27, 30]),
        ],
        techno: [
          expand16To32WithTurnaround([4, 12], []),
          expand16To32WithTurnaround([4, 12], [30, 31]),
          expand16To32WithTurnaround([4, 11, 12], [31]),
          expand16To32WithTurnaround([4, 12], [14, 15, 30, 31]),
        ],
        psytrance: [
          [12, 28],
          [12, 28, 31],
          [4, 12, 20, 28, 30, 31],
          [14, 15, 28, 30, 31],
        ],
      },
      clap: {
        house: [
          expand16To32WithTurnaround([4, 12], []),
          expand16To32WithTurnaround([4, 12], [15, 31]),
          expand16To32WithTurnaround([4, 12], [27]),
          [4, 12, 20, 28, 30],
        ],
        techno: [
          expand16To32WithTurnaround([4, 12], []),
          [12, 28],
          expand16To32WithTurnaround([4, 12], [31]),
          [4, 12, 20, 27, 28],
        ],
        psytrance: [
          [12, 28],
          expand16To32WithTurnaround([4, 12], []),
          [12, 28, 30, 31],
          [4, 12, 20, 28],
        ],
      },
      hat: {
        house: [
          expand16To32WithTurnaround([2, 6, 10, 14], [31]),
          expand16To32WithTurnaround([2, 3, 6, 10, 11, 14], [31]),
          expand16To32WithTurnaround([1, 2, 5, 6, 9, 10, 13, 14], []),
          expand16To32WithTurnaround([0, 2, 4, 6, 8, 10, 12, 14], [15, 31]),
          expand16To32WithTurnaround([2, 6, 7, 10, 14, 15], []),
        ],
        techno: [
          expand16To32WithTurnaround([2, 6, 10, 14], []),
          expand16To32WithTurnaround([0, 2, 4, 6, 8, 10, 12, 14], [15, 31]),
          expand16To32WithTurnaround([1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15], []),
          expand16To32WithTurnaround([2, 3, 6, 7, 10, 11, 14, 15], []),
        ],
        psytrance: [
          expand16To32WithTurnaround([2, 6, 10, 14], []),
          expand16To32WithTurnaround([0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15], []),
          expand16To32WithTurnaround([2, 5, 6, 10, 13, 14], [31]),
          expand16To32WithTurnaround([1, 2, 5, 6, 9, 10, 13, 14], [15, 31]),
        ],
      },
      openhat: {
        house: [
          expand16To32WithTurnaround([2, 6, 10, 14], []),
          expand16To32WithTurnaround([6, 14], []),
          expand16To32WithTurnaround([2, 6, 10, 14], [31]),
          expand16To32WithTurnaround([2, 6, 10, 14, 15], []),
        ],
        techno: [
          expand16To32WithTurnaround([2, 6, 10, 14], []),
          expand16To32WithTurnaround([2, 6, 10, 14], [15, 31]),
          expand16To32WithTurnaround([6, 14], [30]),
          expand16To32WithTurnaround([2, 7, 10, 15], []),
        ],
        psytrance: [
          expand16To32WithTurnaround([2, 6, 10, 14], []),
          expand16To32WithTurnaround([6, 14], []),
          expand16To32WithTurnaround([2, 6, 10, 14], [30]),
        ],
      },
      rimshot: {
        house: [
          expand16To32WithTurnaround([3, 11], [30]),
          expand16To32WithTurnaround([3, 6, 11], []),
          expand16To32WithTurnaround([7, 15], [27]),
          expand16To32WithTurnaround([1, 9, 14], []),
        ],
        techno: [
          expand16To32WithTurnaround([3, 11], []),
          expand16To32WithTurnaround([3, 7, 11, 15], []),
          expand16To32WithTurnaround([6, 14], [31]),
          expand16To32WithTurnaround([2, 5, 10, 13], []),
        ],
        psytrance: [
          expand16To32WithTurnaround([7, 15], []),
          expand16To32WithTurnaround([3, 11], [31]),
          expand16To32WithTurnaround([6, 13, 15], []),
        ],
      },
      lowtom: {
        house: [
          [15, 31],
          expand16To32WithTurnaround([7, 15], []),
          expand16To32WithTurnaround([3, 14], [31]),
          [11, 15, 27, 31],
        ],
        techno: [
          expand16To32WithTurnaround([3, 7, 11, 15], []),
          expand16To32WithTurnaround([7, 15], [30]),
          expand16To32WithTurnaround([2, 7, 10, 15], []),
          expand16To32WithTurnaround([6, 11, 14], [31]),
        ],
        psytrance: [
          [15, 31],
          [14, 15, 30, 31],
          expand16To32WithTurnaround([7, 15], []),
        ],
      },
      hitom: {
        house: [
          [7, 23],
          expand16To32WithTurnaround([6, 13], [29]),
          [7, 14, 23, 30],
          expand16To32WithTurnaround([3, 10], []),
        ],
        techno: [
          expand16To32WithTurnaround([5, 13], [29]),
          expand16To32WithTurnaround([3, 11], [27, 30]),
          expand16To32WithTurnaround([6, 14], []),
        ],
        psytrance: [
          expand16To32WithTurnaround([3, 11], []),
          [7, 13, 23, 29],
          [13, 14, 29, 30],
        ],
      },
      cowbell: {
        house: [
          expand16To32WithTurnaround([6, 14], []),
          expand16To32WithTurnaround([2, 10], [30]),
          [3, 14, 19, 30],
          [6, 11, 22, 27],
        ],
        techno: [
          expand16To32WithTurnaround([2, 10], []),
          [6, 14, 22, 30],
          [3, 15, 19, 31],
        ],
        psytrance: [
          [6, 14, 22, 30],
          [2, 10, 18, 26],
          [11, 27],
        ],
      },
      fx: {
        house: [
          [0, 31],
          [15, 31],
          [0, 15, 30],
          [28, 31],
          [0],
        ],
        techno: [
          [15, 30, 31],
          [0, 31],
          [7, 15, 23, 31],
          [14, 30],
        ],
        psytrance: [
          [15, 31],
          [0, 15, 31],
          [7, 15, 23, 30, 31],
          [28, 30, 31],
        ],
      },
    };

    const genrePool = libraries[trackId]?.[genre] || libraries[trackId]?.house || [[0, 8, 16, 24]];
    const currentSig = getCurrentDrumSignature(trackId);
    const candidates = genrePool.filter(steps => steps.join(',') !== currentSig);
    return pickFrom(candidates.length > 0 ? candidates : genrePool);
  }

  function generateSmartBassPattern(genre) {
    const currentSig = bassPattern.map(v => (v === null ? '-' : v)).join(',');

    const buildCandidate = () => {
      const next = Array(STEP_COUNT).fill(null);

      if (genre === 'psytrance') {
        // Modos auténticos de Psytrance: Rolling K-B-B-B, Galope doble o Offbeat + Pickup
        const rhythmMode = pickFrom(['rolling', 'rolling', 'gallop', 'triplet-drive']);
        const accentNote = pickFrom([7, 4, 2, 1]); // Octava, 5ta, 3ra menor o 2da frigia
        const turnaroundNote = pickFrom([7, 5, 4, 1]);

        for (let bar = 0; bar < 2; bar += 1) {
          const offset = bar * 16;
          for (let beat = 0; beat < 4; beat += 1) {
            const b = offset + beat * 4;
            if (rhythmMode === 'rolling') {
              next[b + 1] = 0;
              next[b + 2] = 0;
              next[b + 3] = beat === 3 ? turnaroundNote : (beat === 1 && Math.random() > 0.45 ? accentNote : 0);
            } else if (rhythmMode === 'gallop') {
              next[b + 2] = 0;
              next[b + 3] = beat === 3 ? turnaroundNote : 0;
            } else {
              next[b + 1] = 0;
              next[b + 2] = beat % 2 === 1 ? accentNote : 0;
              next[b + 3] = beat === 3 ? turnaroundNote : 0;
            }
          }
        }
        return next;
      }

      if (genre === 'techno') {
        // Secuencias hipnóticas oscuras de 8 pasos repetidas en 4 bloques con variación final
        const templates8 = [
          [null, 0, 0, null, null, 0, 2, null],
          [null, null, 0, null, null, null, 0, 1],
          [null, 0, 0, 2, null, 0, 0, 1],
          [0, null, 0, 0, null, 2, 0, null],
          [null, null, 0, 7, null, null, 0, 4],
        ];
        const motif = pickFrom(templates8);
        const darkMap = [0, 1, 2, 4, 7];
        const remap = {
          0: 0,
          1: pickFrom([1, 2]),
          2: pickFrom([2, 4]),
          4: pickFrom([3, 4]),
          7: 7,
        };
        for (let step = 0; step < STEP_COUNT; step += 1) {
          const base = motif[step % 8];
          next[step] = base === null ? null : (remap[base] ?? darkMap[0]);
        }
        next[30] = pickFrom([1, 2, 4]);
        next[31] = pickFrom([0, 7, null]);
        return next;
      }

      // House / Tech-House: Groove funky sincopado en estructura A (0..15) + A' (16..31)
      const houseRhythms16 = [
        [2, 3, 6, 10, 11, 14],
        [0, 2, 6, 7, 10, 14, 15],
        [2, 5, 6, 10, 13, 14],
        [2, 3, 6, 10, 14, 15],
        [2, 6, 9, 10, 14, 15],
      ];
      const activeSteps16 = pickFrom(houseRhythms16);
      const scalePool = [0, 0, 2, 3, 4, 6, 7];
      const bar1Notes = Array(16).fill(null);

      activeSteps16.forEach((step, idx) => {
        if (idx === 0 || step === 0 || step === 2) {
          bar1Notes[step] = 0; // Anclar inicio en tónica
        } else {
          bar1Notes[step] = pickFrom(scalePool);
        }
      });

      for (let i = 0; i < 16; i += 1) {
        next[i] = bar1Notes[i];
        next[i + 16] = bar1Notes[i];
      }
      // Variación de cierre en los últimos 3 pasos (turnaround funky)
      next[29] = null;
      next[30] = pickFrom([2, 3, 4, 6]);
      next[31] = pickFrom([0, 7, null]);
      return next;
    };

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const candidate = buildCandidate();
      const sig = candidate.map(v => (v === null ? '-' : v)).join(',');
      if (sig !== currentSig) return candidate;
    }
    return buildCandidate();
  }

  function generateSmartMelodyPattern(genre) {
    const currentSig = melodyPattern.map(v => (v === null ? '-' : v)).join(',');

    const buildCandidate = () => {
      const next = Array(STEP_COUNT).fill(null);
      const rhythmMotifs16 = {
        house: [
          [0, 3, 6, 10, 12, 15],
          [2, 6, 9, 12, 14],
          [0, 6, 10, 14],
          [3, 6, 11, 14, 15],
          [0, 2, 6, 10, 13],
        ],
        techno: [
          [0, 6, 8, 14],
          [2, 5, 8, 11, 14],
          [0, 3, 6, 9, 12, 14],
          [1, 6, 9, 14, 15],
        ],
        psytrance: [
          [2, 6, 10, 14],
          [2, 5, 6, 10, 13, 14],
          [0, 3, 6, 10, 14, 15],
          [2, 6, 7, 10, 14, 15],
        ],
      };

      const steps16 = pickFrom(rhythmMotifs16[genre] || rhythmMotifs16.house);
      const consonantNotes = genre === 'techno'
        ? [0, 1, 2, 3, 4, 6]
        : [0, 2, 3, 4, 5, 6, 7];

      const anchorNote = pickFrom([0, 4, 7]);
      const bar1 = Array(16).fill(null);

      steps16.forEach((step, idx) => {
        if (idx === 0) {
          bar1[step] = anchorNote;
        } else {
          bar1[step] = pickFrom(consonantNotes);
        }
      });

      // Estructura Pregunta (Compás 1) y Respuesta (Compás 2)
      for (let i = 0; i < 16; i += 1) {
        next[i] = bar1[i];
        next[i + 16] = bar1[i];
      }

      // Variar la resolución en los últimos 4 pasos del segundo compás
      const lastActiveStep = [...steps16].reverse()[0] + 16;
      const resolveNotes = [0, 2, 4, 7].filter(n => n !== next[lastActiveStep]);
      next[lastActiveStep] = pickFrom(resolveNotes);

      if (Math.random() > 0.4) {
        next[30] = pickFrom([2, 4, 6, 7]);
      }
      return next;
    };

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const candidate = buildCandidate();
      const sig = candidate.map(v => (v === null ? '-' : v)).join(',');
      if (sig !== currentSig) return candidate;
    }
    return buildCandidate();
  }

  function applyDrumStepsToDOM(trackId, activeStepsArray) {
    const activeSet = new Set(activeStepsArray);
    root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`).forEach(button => {
      updateStepButton(button, activeSet.has(Number(button.dataset.step)));
    });
  }

  function randomizeSingleTrack(trackId) {
    if (trackId === 'bass') {
      const nextBass = generateSmartBassPattern(activeGenre);
      bassPattern.splice(0, STEP_COUNT, ...nextBass);
      renderPitchPattern('bass', bassPattern);
      return;
    }
    if (trackId === 'lead') {
      const nextMelody = generateSmartMelodyPattern(activeGenre);
      melodyPattern.splice(0, STEP_COUNT, ...nextMelody);
      renderPitchPattern('lead', melodyPattern);
      return;
    }
    if (drumTrackIds.includes(trackId)) {
      const nextSteps = generateSmartDrumSteps(trackId, activeGenre);
      applyDrumStepsToDOM(trackId, nextSteps);
    }
  }

  function generateSmartFullGroove() {
    mutedTracks.clear();
    soloedTracks.clear();
    updateMuteSoloUI();

    // 1. Base sólida obligatoria: Kick, Hat, OpenHat, Clap/Snare y FX sutil
    applyDrumStepsToDOM('kick', generateSmartDrumSteps('kick', activeGenre));
    applyDrumStepsToDOM('hat', generateSmartDrumSteps('hat', activeGenre));
    applyDrumStepsToDOM('openhat', generateSmartDrumSteps('openhat', activeGenre));
    applyDrumStepsToDOM('fx', generateSmartDrumSteps('fx', activeGenre));

    if (activeGenre === 'psytrance') {
      applyDrumStepsToDOM('clap', generateSmartDrumSteps('clap', activeGenre));
      // En Psytrance la caja suele ir limpia o solo en el redoble final para no ensuciar el bajo
      applyDrumStepsToDOM('snare', Math.random() > 0.5 ? [14, 15, 30, 31] : []);
    } else {
      const backbeat = generateSmartDrumSteps('snare', activeGenre);
      applyDrumStepsToDOM('snare', backbeat);
      applyDrumStepsToDOM('clap', [4, 12, 20, 28]);
    }

    // 2. Regla Anti-Ensalada para percusiones accesorias (Rim, LowTom, HiTom, Cowbell):
    // Activamos solo 2 percusiones en diálogo (Pregunta/Respuesta) y limpiamos las otras 2.
    const auxTracks = ['rimshot', 'lowtom', 'hitom', 'cowbell'];
    const shuffledAux = [...auxTracks].sort(() => Math.random() - 0.5);
    const chosenA = shuffledAux[0];
    const chosenB = shuffledAux[1];
    const silentA = shuffledAux[2];
    const silentB = shuffledAux[3];

    const stepsA = generateSmartDrumSteps(chosenA, activeGenre);
    const usedByA = new Set(stepsA);
    const stepsB = generateSmartDrumSteps(chosenB, activeGenre).filter(step => !usedByA.has(step));

    applyDrumStepsToDOM(chosenA, stepsA);
    applyDrumStepsToDOM(chosenB, stepsB.length > 0 ? stepsB : [7, 23]);
    applyDrumStepsToDOM(silentA, []);
    applyDrumStepsToDOM(silentB, []);

    // 3. Bajo y Synth en escala con estructura A + A'
    randomizeSingleTrack('bass');
    randomizeSingleTrack('lead');
  }

  function getStepButton(target) {
    return target instanceof Element
      ? target.closest('button[data-action="step"], button[data-action="bass-step"], button[data-action="melody-step"]')
      : null;
  }

  function startDrawing(event) {
    const button = getStepButton(event.target);
    if (!button || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;

    if (button.hasPointerCapture && button.hasPointerCapture(event.pointerId)) {
      button.releasePointerCapture(event.pointerId);
    }
    drawingPointerId = event.pointerId;
    drawingMode = button.dataset.action;
    updatePresetSelection();
    if (drawingMode === 'bass-step' || drawingMode === 'melody-step') {
      const step = Number(button.dataset.step);
      const note = Number(button.dataset.note);
      const trackId = drawingMode === 'bass-step' ? 'bass' : 'lead';
      const activeNotes = trackId === 'bass' ? bassPattern : melodyPattern;
      drawingValue = activeNotes[step] === note ? null : note;
      setPitchStep(trackId, step, drawingValue);
    } else {
      drawingValue = button.getAttribute('aria-pressed') !== 'true';
      updateStepButton(button, drawingValue);
    }
    const trackName = drawingMode === 'bass-step' ? 'Bajo' : drawingMode === 'melody-step' ? 'Synth' : tracks.find(track => track.id === button.dataset.track).detail;
    const stepNumber = Number(button.dataset.step) + 1;
    setStatus(`${trackName}, paso ${stepNumber}: ${drawingValue === null || drawingValue === false ? 'desactivado' : 'activado'}.`);
  }

  function continueDrawing(event) {
    if (event.pointerId !== drawingPointerId) return;
    const button = getStepButton(document.elementFromPoint(event.clientX, event.clientY));
    if (!button || !root.contains(button) || button.dataset.action !== drawingMode) return;
    if (drawingMode === 'bass-step' || drawingMode === 'melody-step') {
      setPitchStep(drawingMode === 'bass-step' ? 'bass' : 'lead', Number(button.dataset.step), drawingValue);
    } else {
      updateStepButton(button, drawingValue);
    }
  }

  function stopDrawing(event) {
    if (event.pointerId === drawingPointerId) {
      drawingPointerId = null;
      drawingMode = '';
    }
  }

  function showAudioError(error) {
    console.error('No se pudo iniciar el audio de la groovebox:', error);
    setStatus(error instanceof Error ? error.message : 'No se pudo iniciar el audio. Probá de nuevo.', true);
  }

  function handleTabKeydown(event) {
    if (!(event.target instanceof Element) || !event.target.matches('[role="tab"]') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const currentIndex = tabs.indexOf(event.target);
    const nextTab = tabs[(currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    selectPanel(nextTab.dataset.panel);
    nextTab.focus();
  }

  async function handleClick(event) {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const { action, track } = button.dataset;
    if (action === 'tab') {
      selectPanel(button.dataset.panel);
      return;
    }
    if (action === 'mute-track' && track) {
      if (mutedTracks.has(track)) mutedTracks.delete(track);
      else mutedTracks.add(track);
      updateMuteSoloUI();
      const label = tracks.find(t => t.id === track)?.name || track.toUpperCase();
      setStatus(`${label}: ${mutedTracks.has(track) ? 'SILENCIADO (Mute)' : 'ACTIVO'}.`);
      return;
    }
    if (action === 'solo-track' && track) {
      if (soloedTracks.has(track)) soloedTracks.delete(track);
      else {
        soloedTracks.add(track);
        mutedTracks.delete(track);
      }
      updateMuteSoloUI();
      const label = tracks.find(t => t.id === track)?.name || track.toUpperCase();
      setStatus(soloedTracks.size > 0 ? `Modo SOLO activo (${label}).` : 'Modo SOLO desactivado; suenan todas las pistas.');
      return;
    }
    if (action === 'kill-kick') {
      kickKilled = !kickKilled;
      killKickBtn?.classList.toggle('is-killed', kickKilled);
      killKickBtn?.setAttribute('aria-pressed', String(kickKilled));
      if (killKickLabel) {
        killKickLabel.textContent = kickKilled ? 'KICK CORTADO' : 'DROP ACTIVO';
      }
      setStatus(kickKilled ? 'KILL KICK activado: bombo en espera para el drop.' : '¡DROP! Bombo activo nuevamente.');
      return;
    }
    if (action === 'reset-fx') {
      if (djFilterInput) {
        djFilterInput.value = '0';
        applyDjFilterValue(0);
      }
      if (acidDriveInput) {
        acidDriveInput.value = '40';
        acidDriveAmount = 0.4;
        const out = root.querySelector('[data-fx-output="acid-drive"]');
        if (out) out.textContent = '40%';
      }
      if (dubEchoInput) {
        dubEchoInput.value = '20';
        applyDubEchoValue(20);
      }
      if (kickKilled) {
        kickKilled = false;
        killKickBtn?.classList.remove('is-killed');
        killKickBtn?.setAttribute('aria-pressed', 'false');
        if (killKickLabel) killKickLabel.textContent = 'DROP ACTIVO';
      }
      mutedTracks.clear();
      soloedTracks.clear();
      updateMuteSoloUI();
      setStatus('Efectos DJ, filtro maestro y canales Mute/Solo restaurados.');
      return;
    }
    if (action === 'share') {
      await shareCurrentLoop();
      return;
    }
    if (action === 'record') {
      try {
        await toggleWavRecording();
      } catch (error) {
        showAudioError(error);
      }
      return;
    }
    if (action === 'step') {
      if (event.detail === 0) {
        const isActive = button.getAttribute('aria-pressed') !== 'true';
        updatePresetSelection();
        updateStepButton(button, isActive);
        const trackName = tracks.find(item => item.id === track).detail;
        setStatus(`${trackName}, paso ${Number(button.dataset.step) + 1}: ${isActive ? 'activado' : 'desactivado'}.`);
      }
      return;
    }
    if (action === 'bass-step' || action === 'melody-step') {
      if (event.detail === 0) {
        const step = Number(button.dataset.step);
        const note = Number(button.dataset.note);
        const trackId = action === 'bass-step' ? 'bass' : 'lead';
        const activeNotes = trackId === 'bass' ? bassPattern : melodyPattern;
        setPitchStep(trackId, step, activeNotes[step] === note ? null : note);
        updatePresetSelection();
      }
      return;
    }
    if (action === 'preset') {
      applyGenrePreset(button.dataset.preset);
      return;
    }
    if (action === 'random-track' && track) {
      updatePresetSelection();
      mutedTracks.delete(track);
      updateMuteSoloUI();
      randomizeSingleTrack(track);
      const trackInfo = tracks.find(t => t.id === track);
      setStatus(`🎲 Patrón inteligente de ${trackInfo ? trackInfo.name : track.toUpperCase()} generado (${genrePresets[activeGenre].name}).`);
      return;
    }
    if (action === 'random') {
      updatePresetSelection();
      generateSmartFullGroove();
      setStatus(`✨ Groove IA generado para ${genrePresets[activeGenre].name} (estructura A + B sin saturar canales).`);
      return;
    }

    if (action === 'clear') {
      updatePresetSelection();
      trackIds.forEach(trackId => {
        root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`).forEach(stepButton => updateStepButton(stepButton, false));
      });
      bassPattern.fill(null);
      renderPitchPattern('bass', bassPattern);
      melodyPattern.fill(null);
      renderPitchPattern('lead', melodyPattern);
      setStatus('Secuenciador limpio. Armá tu ritmo.');
      return;
    }

    if (action === 'play') {
      if (isPlaying) {
        stopPlayback();
        setStatus('Loop detenido.');
        return;
      }

      try {
        await startPlayback();
      } catch (error) {
        stopPlayback();
        showAudioError(error);
      }
      return;
    }

    if (action === 'preview' && soundByTrack[track]) {
      try {
        const context = await unlockAudio();
        await loadAllSamples(context);
        soundByTrack[track](context.currentTime + 0.01);
        setStatus(`${tracks.find(item => item.id === track).detail} listo.`);
      } catch (error) {
        showAudioError(error);
      }
    }
  }

  root.addEventListener('click', handleClick);
  root.addEventListener('keydown', handleTabKeydown);
  root.addEventListener('pointerdown', primeAudioFromGesture);
  root.addEventListener('pointerdown', startDrawing);
  root.addEventListener('pointermove', continueDrawing);
  window.addEventListener('pointerup', stopDrawing);
  window.addEventListener('pointercancel', stopDrawing);

  tempoInput.addEventListener('input', () => {
    tempoValue.value = tempoInput.value;
    tempoValue.textContent = tempoInput.value;
    if (delayNode && audioContext) {
      delayNode.delayTime.setTargetAtTime(
        (60 / Number(tempoInput.value)) * genrePresets[activeGenre].delay.time,
        audioContext.currentTime,
        0.02,
      );
    }
    updatePresetSelection();
  });

  volumeInput.addEventListener('input', () => {
    if (masterGain && audioContext) {
      masterGain.gain.setTargetAtTime(Number(volumeInput.value) / 100, audioContext.currentTime, 0.015);
    }
  });

  djFilterInput?.addEventListener('input', () => {
    applyDjFilterValue(djFilterInput.value);
  });

  djFilterInput?.addEventListener('dblclick', () => {
    djFilterInput.value = '0';
    applyDjFilterValue(0);
  });

  acidDriveInput?.addEventListener('input', () => {
    acidDriveAmount = Number(acidDriveInput.value) / 100;
    const out = root.querySelector('[data-fx-output="acid-drive"]');
    if (out) out.textContent = `${Math.round(acidDriveAmount * 100)}%`;
  });

  dubEchoInput?.addEventListener('input', () => {
    applyDubEchoValue(dubEchoInput.value);
  });

  function updateTrackVolume(event) {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.matches('[data-track-volume]')) return;
    const trackId = input.dataset.trackVolume;
    const value = Number(input.value);
    const output = root.querySelector(`[data-track-volume-value="${trackId}"]`);
    output.value = String(value);
    output.textContent = String(value);
    if (trackGains[trackId] && audioContext) {
      trackGains[trackId].gain.setTargetAtTime(value / 100, audioContext.currentTime, 0.015);
    }
  }

  root.addEventListener('input', updateTrackVolume);

  restoreLoopFromHashIfPresent();

  const cleanup = () => {
    stopPlayback();
    root.removeEventListener('click', handleClick);
    root.removeEventListener('keydown', handleTabKeydown);
    root.removeEventListener('pointerdown', primeAudioFromGesture);
    root.removeEventListener('pointerdown', startDrawing);
    root.removeEventListener('pointermove', continueDrawing);
    root.removeEventListener('input', updateTrackVolume);
    window.removeEventListener('pointerup', stopDrawing);
    window.removeEventListener('pointercancel', stopDrawing);
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.removeEventListener('statechange', handleAudioStateChange);
      void audioContext.close();
    }
    if (root.__grooveCleanup === cleanup) delete root.__grooveCleanup;
  };
  root.__grooveCleanup = cleanup;
  return cleanup;
}