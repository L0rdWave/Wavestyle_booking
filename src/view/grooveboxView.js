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
};

const genrePresets = {
  house: {
    name: 'Funky House',
    bpm: 124,
    swing: 0.12,
    scale: [146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66],
    scaleNotes: ['D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4'],
    bassDegrees: [0, 0, 2, 3, 0, 2, 3, 0, 0, 0, 2, 3, 0, 2, 3, 0],
    delay: { time: 0.36, feedback: 0.2, wet: 0.14, tracks: ['rimshot', 'cowbell', 'lead'] },
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
    delay: { time: 0.5, feedback: 0.34, wet: 0.2, tracks: ['rimshot', 'hitom', 'lead'] },
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
    delay: { time: 0.25, feedback: 0.16, wet: 0.1, tracks: ['hitom', 'lead'] },
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
    },
    melody: [[2, 4], [6, 6], [10, 7], [14, 4], [18, 5], [22, 7], [26, 6], [30, 4]],
  },
};

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

function renderPitchedTrack(trackId, name, detail, color, volume, notes, activeNotes, action, octaveOffset = 0) {
  return `
    <section class="groove-pitched-track groove-track-${color}" data-pitched-track="${trackId}">
      <div class="groove-pitched-heading">
        <div class="groove-track-controls">
          <button class="groove-track-name" type="button" data-action="preview" data-track="${trackId}" aria-label="Escuchar ${detail}">
            <span>${name}</span>
            <small data-pitched-scale="${trackId}">${detail}</small>
          </button>
          <label class="groove-track-volume">
            <span>VOL</span>
            <input type="range" min="0" max="100" value="${volume}" step="1" data-track-volume="${trackId}" aria-label="Volumen de ${detail}">
            <output data-track-volume-value="${trackId}">${volume}</output>
          </label>
        </div>
        <span class="groove-pitched-hint">${trackId === 'bass' ? 'Una nota por paso · raíz y escala del género' : 'Una nota por paso · piano brillante'}</span>
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
        <span class="project-genre"><i data-lucide="activity"></i> LABORATORIO · WEB AUDIO</span>
        <h1>Mini Groovebox</h1>
        <p class="project-subtitle">Armá un loop, tocá los pads y encontrá tu propio pulso. Sin descargas ni conexiones externas.</p>
      </header>

      <section class="groovebox" aria-label="Mini Groovebox">
        <div class="groovebox-topline">
          <div>
            <span class="groovebox-eyebrow">WAVESTYLE / SEQUENCER 01</span>
            <p class="groovebox-hint">Editá bajo y piano desde Teclado, y los golpes desde Percusión. Todo sigue el mismo loop.</p>
          </div>
          <span class="groovebox-live"><span aria-hidden="true"></span> AUDIO LOCAL</span>
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
            <label class="groove-control-label" for="groove-volume">VOLUMEN</label>
            <div class="groove-volume-control">
              <i data-lucide="volume-2" aria-hidden="true"></i>
              <input id="groove-volume" type="range" min="0" max="100" value="70" data-control="volume" aria-label="Volumen">
            </div>
          </div>

          <div class="groovebox-actions">
            <button type="button" class="groove-utility-button" data-action="random" aria-label="Crear un ritmo aleatorio">
              <i data-lucide="shuffle" aria-hidden="true"></i><span>Random</span>
            </button>
            <button type="button" class="groove-utility-button" data-action="clear" aria-label="Borrar todos los pasos">
              <i data-lucide="rotate-ccw" aria-hidden="true"></i><span>Limpiar</span>
            </button>
          </div>
        </div>

        <div class="groove-presets" role="group" aria-label="Plantillas de género">
          <span class="groove-control-label">TEMPLATES</span>
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

        <div class="groove-tabs" role="tablist" aria-label="Familias de instrumentos">
          <button type="button" class="groove-tab is-selected" role="tab" id="groove-tab-keyboard" aria-controls="groove-panel-keyboard" aria-selected="true" data-action="tab" data-panel="keyboard">
            <span>Teclado</span><small>Bajo + piano</small>
          </button>
          <button type="button" class="groove-tab" role="tab" id="groove-tab-drums" aria-controls="groove-panel-drums" aria-selected="false" tabindex="-1" data-action="tab" data-panel="drums">
            <span>Percusión</span><small>Ritmos + acentos</small>
          </button>
        </div>

        <section class="groove-panel" id="groove-panel-keyboard" role="tabpanel" aria-labelledby="groove-tab-keyboard" data-panel-content="keyboard">
          <div class="groove-sequencer-scroll" role="region" aria-label="Teclado: bajo y piano en 32 pasos; deslizá horizontalmente" tabindex="0">
            <div class="groove-sequencer">
              <div class="groove-step-numbers" aria-hidden="true">
                <span>TECLADO / VOL</span>
                ${Array.from({ length: STEP_COUNT }, (_, index) => `<span class="${index % 4 === 0 ? 'groove-beat-number' : ''}${index === 16 ? ' groove-bar-start' : ''}">${String((index % 16) + 1).padStart(2, '0')}</span>`).join('')}
              </div>
              ${renderPitchedTrack('bass', 'BASS', 'Bajo · D2 menor', 'lime', 100, genrePresets.house.scaleNotes, makeBassPattern(genrePresets.house), 'bass-step', -1)}
              ${renderPitchedTrack('lead', 'PIANO', 'Funky House · D4 menor', 'gold', 70, genrePresets.house.scaleNotes, Object.assign(Array(STEP_COUNT).fill(null), Object.fromEntries(genrePresets.house.melody)), 'melody-step', 1)}
            </div>
          </div>
        </section>

        <section class="groove-panel" id="groove-panel-drums" role="tabpanel" aria-labelledby="groove-tab-drums" data-panel-content="drums" hidden>
          <div class="groove-sequencer-scroll" role="region" aria-label="Percusión en 32 pasos; deslizá horizontalmente" tabindex="0">
            <div class="groove-sequencer">
              <div class="groove-step-numbers" aria-hidden="true">
                <span>PERCUSIÓN / VOL</span>
                ${Array.from({ length: STEP_COUNT }, (_, index) => `<span class="${index % 4 === 0 ? 'groove-beat-number' : ''}${index === 16 ? ' groove-bar-start' : ''}">${String((index % 16) + 1).padStart(2, '0')}</span>`).join('')}
              </div>
              ${tracks.filter(track => drumTrackIds.includes(track.id)).map(track => `
                <div class="groove-track groove-track-${track.id} groove-track-${track.color}" data-track-row="${track.id}">
                  <div class="groove-track-controls">
                    <button class="groove-track-name" type="button" data-action="preview" data-track="${track.id}" aria-label="Escuchar ${track.detail}">
                      <span>${track.name}</span>
                      <small>${track.detail}</small>
                    </button>
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
          <p class="groove-status" data-status aria-live="polite">El audio se activa al tocar Play o un pad.</p>
          <span class="groove-step-readout"><span data-step-readout>--</span> / 32</span>
        </div>
      </section>

      <p class="groovebox-note"><i data-lucide="smartphone" aria-hidden="true"></i> Bajo y piano en escala, percusión aparte y 32 pasos sincronizados: deslizá para recorrer el loop.</p>
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
  const tempoInput = root.querySelector('[data-control="tempo"]');
  const tempoValue = root.querySelector('[data-tempo-value]');
  const volumeInput = root.querySelector('[data-control="volume"]');
  const trackVolumeInputs = Object.fromEntries(
    Array.from(root.querySelectorAll('[data-track-volume]'))
      .map(input => [input.dataset.trackVolume, input]),
  );
  const status = root.querySelector('[data-status]');
  const stepReadout = root.querySelector('[data-step-readout]');

  let audioContext;
  let masterGain;
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
  let noiseBuffer;
  let audioUnlockPromise;
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
    if (pianoLabel) pianoLabel.textContent = `Piano · ${noteNameAtOctave(preset.scaleNotes[0], 1)} ${scaleMode}`;
    root.querySelectorAll('[data-note-label]').forEach(label => {
      const [trackId, noteIndex] = label.dataset.noteLabel.split('-');
      label.textContent = noteNameAtOctave(preset.scaleNotes[Number(noteIndex)], trackId === 'bass' ? -1 : 1);
    });

    if (audioContext && delayNode) {
      const beatDuration = 60 / Number(tempoInput.value);
      delayNode.delayTime.setTargetAtTime(beatDuration * preset.delay.time, audioContext.currentTime, 0.02);
      delayFeedback.gain.setTargetAtTime(preset.delay.feedback, audioContext.currentTime, 0.02);
      delayReturn.gain.setTargetAtTime(preset.delay.wet, audioContext.currentTime, 0.02);
      tracks.forEach(track => {
        const amount = preset.delay.tracks.includes(track.id) ? 0.32 : 0;
        delaySends[track.id].gain.setTargetAtTime(amount, audioContext.currentTime, 0.02);
      });
    }
  }

  function getAudioContext() {
    if (!audioContext) {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) {
        throw new Error('Este navegador no tiene soporte para Web Audio.');
      }

      audioContext = new AudioContextConstructor();
      masterGain = audioContext.createGain();
      masterGain.gain.value = Number(volumeInput.value) / 100;
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -12;
      compressor.knee.value = 3;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.12;
      masterGain.connect(compressor);
      compressor.connect(audioContext.destination);
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

      noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate, audioContext.sampleRate);
      const samples = noiseBuffer.getChannelData(0);
      for (let index = 0; index < samples.length; index += 1) {
        samples[index] = Math.random() * 2 - 1;
      }
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
            throw new Error('El navegador no habilitó el audio. Tocá Play otra vez o revisá el volumen del iPhone.');
          }
          return context;
        })
        .finally(() => {
          audioUnlockPromise = undefined;
        });
    }

    return audioUnlockPromise;
  }

  function primeAudioFromGesture(event) {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button[data-action="play"], button[data-action="preview"]');
    if (!button) return;

    try {
      unlockAudio().catch(showAudioError);
    } catch (error) {
      showAudioError(error);
    }
  }

  function playKick(time) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const click = audioContext.createBufferSource();
    const clickFilter = audioContext.createBiquadFilter();
    const clickGain = audioContext.createGain();

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

    click.buffer = noiseBuffer;
    clickFilter.type = 'highpass';
    clickFilter.frequency.value = 2400;
    clickGain.gain.setValueAtTime(0.0001, time);
    clickGain.gain.exponentialRampToValueAtTime(0.12, time + 0.001);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.018);
    click.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(trackGains.kick);
    click.start(time, Math.random() * 0.8);
    click.stop(time + 0.02);

    bassDucker.gain.cancelScheduledValues(time);
    bassDucker.gain.setValueAtTime(0.42, time);
    bassDucker.gain.linearRampToValueAtTime(1, time + 0.085);
  }

  function playBass(time, step = 0) {
    const noteIndex = bassPattern[step] ?? 0;
    const fundamental = activeScale[noteIndex] / 2;
    const duration = (60 / Number(tempoInput.value) / 4) * 0.76;
    const sub = audioContext.createOscillator();
    const subGain = audioContext.createGain();
    const harmonics = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const harmonicGain = audioContext.createGain();

    sub.type = 'sine';
    sub.frequency.setValueAtTime(fundamental, time);
    subGain.gain.setValueAtTime(0.0001, time);
    subGain.gain.exponentialRampToValueAtTime(0.38, time + 0.002);
    subGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    sub.connect(subGain);
    subGain.connect(bassDucker);
    sub.start(time);
    sub.stop(time + duration + 0.005);

    harmonics.type = 'sawtooth';
    harmonics.frequency.setValueAtTime(fundamental * 2, time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, time);
    filter.frequency.exponentialRampToValueAtTime(520, time + Math.min(0.045, duration * 0.7));
    filter.Q.value = 0.8;
    harmonicGain.gain.setValueAtTime(0.0001, time);
    harmonicGain.gain.exponentialRampToValueAtTime(0.18, time + 0.002);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    harmonics.connect(filter);
    filter.connect(harmonicGain);
    harmonicGain.connect(bassDucker);
    harmonics.start(time);
    harmonics.stop(time + duration + 0.005);
  }

  function playLead(time, noteIndex = 0) {
    const baseFrequency = activeScale[noteIndex] * 2;
    const duration = Math.min(0.42, (60 / Number(tempoInput.value) / 4) * 1.8);
    const partials = [
      { ratio: 1, level: 0.32, decay: 1 },
      { ratio: 2.01, level: 0.14, decay: 0.46 },
      { ratio: 3.92, level: 0.07, decay: 0.2 },
    ];
    partials.forEach(partial => {
      const oscillator = audioContext.createOscillator();
      const envelope = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(baseFrequency * partial.ratio, time);
      envelope.gain.setValueAtTime(0.0001, time);
      envelope.gain.exponentialRampToValueAtTime(partial.level, time + 0.003);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration * partial.decay);
      oscillator.connect(envelope);
      envelope.connect(trackGains.lead);
      oscillator.start(time);
      oscillator.stop(time + duration * partial.decay + 0.01);
    });
    const hammer = audioContext.createBufferSource();
    const hammerFilter = audioContext.createBiquadFilter();
    const hammerGain = audioContext.createGain();
    hammer.buffer = noiseBuffer;
    hammerFilter.type = 'highpass';
    hammerFilter.frequency.value = Math.min(7000, baseFrequency * 12);
    hammerGain.gain.setValueAtTime(0.0001, time);
    hammerGain.gain.exponentialRampToValueAtTime(0.035, time + 0.001);
    hammerGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.018);
    hammer.connect(hammerFilter);
    hammerFilter.connect(hammerGain);
    hammerGain.connect(trackGains.lead);
    hammer.start(time, Math.random() * 0.8);
    hammer.stop(time + 0.02);
  }

  function playSnare(time) {
    const noise = audioContext.createBufferSource();
    const highpass = audioContext.createBiquadFilter();
    const bodyFilter = audioContext.createBiquadFilter();
    const noiseGain = audioContext.createGain();
    const tone = audioContext.createOscillator();
    const toneGain = audioContext.createGain();

    noise.buffer = noiseBuffer;
    highpass.type = 'highpass';
    highpass.frequency.value = 520;
    bodyFilter.type = 'bandpass';
    bodyFilter.frequency.value = 1900;
    bodyFilter.Q.value = 0.65;
    noiseGain.gain.setValueAtTime(0.0001, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.34, time + 0.003);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
    noise.connect(highpass);
    highpass.connect(bodyFilter);
    bodyFilter.connect(noiseGain);
    noiseGain.connect(trackGains.snare);
    noise.start(time, Math.random() * 0.8);
    noise.stop(time + 0.16);

    tone.type = 'triangle';
    tone.frequency.setValueAtTime(205, time);
    tone.frequency.exponentialRampToValueAtTime(145, time + 0.07);
    toneGain.gain.setValueAtTime(0.0001, time);
    toneGain.gain.exponentialRampToValueAtTime(0.16, time + 0.002);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.095);
    tone.connect(toneGain);
    toneGain.connect(trackGains.snare);
    tone.start(time);
    tone.stop(time + 0.1);
  }

  function playMetalHat(time, duration, output, noiseLevel, metallicLevel, cutoff) {
    const noise = audioContext.createBufferSource();
    const highpass = audioContext.createBiquadFilter();
    const envelope = audioContext.createGain();
    [205, 271, 326, 401, 483, 547].forEach(frequency => {
      const oscillator = audioContext.createOscillator();
      const partialGain = audioContext.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = frequency;
      partialGain.gain.value = metallicLevel / 6;
      oscillator.connect(partialGain);
      partialGain.connect(highpass);
      oscillator.start(time);
      oscillator.stop(time + duration + 0.005);
    });

    noise.buffer = noiseBuffer;
    highpass.type = 'highpass';
    highpass.frequency.value = cutoff;
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.exponentialRampToValueAtTime(noiseLevel + metallicLevel, time + 0.002);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    noise.connect(highpass);
    highpass.connect(envelope);
    envelope.connect(output);
    noise.start(time, Math.random() * 0.8);
    noise.stop(time + duration + 0.005);
  }

  function playHat(time) {
    playMetalHat(time, 0.055, trackGains.hat, 0.09, 0.16, 6800);
  }

  function playClap(time) {
    const bursts = [
      { offset: 0, peak: 0.28, duration: 0.035 },
      { offset: 0.012, peak: 0.23, duration: 0.04 },
      { offset: 0.026, peak: 0.19, duration: 0.05 },
      { offset: 0.043, peak: 0.14, duration: 0.12 },
    ];

    bursts.forEach(({ offset, peak, duration }) => {
      const burstAt = time + offset;
      const noise = audioContext.createBufferSource();
      const highpass = audioContext.createBiquadFilter();
      const body = audioContext.createBiquadFilter();
      const gain = audioContext.createGain();

      noise.buffer = noiseBuffer;
      highpass.type = 'highpass';
      highpass.frequency.value = 520;
      body.type = 'bandpass';
      body.frequency.value = 1650;
      body.Q.value = 0.75;
      gain.gain.setValueAtTime(0.0001, burstAt);
      gain.gain.exponentialRampToValueAtTime(peak, burstAt + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, burstAt + duration);
      noise.connect(highpass);
      highpass.connect(body);
      body.connect(gain);
      gain.connect(trackGains.clap);
      noise.start(burstAt, Math.random() * 0.8);
      noise.stop(burstAt + duration + 0.005);
    });
  }

  function playOpenHat(time) {
    playMetalHat(time, 0.28, trackGains.openhat, 0.1, 0.18, 5900);
  }

  function playRimshot(time) {
    const noise = audioContext.createBufferSource();
    const highpass = audioContext.createBiquadFilter();
    const noiseGain = audioContext.createGain();
    const tone = audioContext.createOscillator();
    const toneGain = audioContext.createGain();

    noise.buffer = noiseBuffer;
    highpass.type = 'highpass';
    highpass.frequency.value = 2800;
    noiseGain.gain.setValueAtTime(0.0001, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.32, time + 0.001);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(trackGains.rimshot);
    noise.start(time);
    noise.stop(time + 0.05);

    tone.type = 'triangle';
    tone.frequency.setValueAtTime(1850, time);
    tone.frequency.exponentialRampToValueAtTime(720, time + 0.035);
    toneGain.gain.setValueAtTime(0.0001, time);
    toneGain.gain.exponentialRampToValueAtTime(0.42, time + 0.001);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
    tone.connect(toneGain);
    toneGain.connect(trackGains.rimshot);
    tone.start(time);
    tone.stop(time + 0.06);
  }

  function playTom(time, frequency, output) {
    const oscillator = audioContext.createOscillator();
    const harmonic = audioContext.createOscillator();
    const transient = audioContext.createBufferSource();
    const transientFilter = audioContext.createBiquadFilter();
    const transientGain = audioContext.createGain();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency * 1.8, time);
    oscillator.frequency.exponentialRampToValueAtTime(frequency, time + 0.08);
    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(frequency * 2.4, time);
    harmonic.frequency.exponentialRampToValueAtTime(frequency * 2, time + 0.06);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.48, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);
    transient.buffer = noiseBuffer;
    transientFilter.type = 'bandpass';
    transientFilter.frequency.value = frequency * 5;
    transientFilter.Q.value = 0.8;
    transientGain.gain.setValueAtTime(0.0001, time);
    transientGain.gain.exponentialRampToValueAtTime(0.1, time + 0.001);
    transientGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.025);
    oscillator.connect(gain);
    gain.connect(output);
    harmonic.connect(gain);
    transient.connect(transientFilter);
    transientFilter.connect(transientGain);
    transientGain.connect(output);
    oscillator.start(time);
    oscillator.stop(time + 0.25);
    harmonic.start(time);
    harmonic.stop(time + 0.25);
    transient.start(time, Math.random() * 0.8);
    transient.stop(time + 0.03);
  }

  function playLowTom(time) {
    playTom(time, 92, trackGains.lowtom);
  }

  function playHighTom(time) {
    playTom(time, 185, trackGains.hitom);
  }

  function playCowbell(time) {
    const first = audioContext.createOscillator();
    const second = audioContext.createOscillator();
    const highpass = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    first.type = 'square';
    first.frequency.value = 587;
    second.type = 'square';
    second.frequency.value = 845;
    highpass.type = 'highpass';
    highpass.frequency.value = 400;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.18, time + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);
    first.connect(highpass);
    second.connect(highpass);
    highpass.connect(gain);
    gain.connect(trackGains.cowbell);
    first.start(time);
    second.start(time);
    first.stop(time + 0.21);
    second.stop(time + 0.21);
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
      if (pattern[trackId][step]) {
        soundByTrack[trackId](time, step);
      }
    });
    if (bassPattern[step] !== null) {
      playBass(time, step);
    }
    if (melodyPattern[step] !== null) {
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

  function stopPlayback() {
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
    await unlockAudio();
    isPlaying = true;
    nextStepIndex = 0;
    nextStepAt = audioContext.currentTime + 0.05;
    scheduler();
    schedulerId = window.setInterval(scheduler, 25);
    playButton.setAttribute('aria-pressed', 'true');
    playButton.classList.add('is-playing');
    playLabel.textContent = 'Detener';
    setStatus('Loop en marcha. ¡Mové los pasos en vivo!');
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
      const activeSteps = new Set(preset.pattern[trackId]);
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
    tempoInput.dispatchEvent(new Event('input', { bubbles: true }));
    updatePresetSelection(presetId);
    setStatus(`Template ${preset.name} aplicado a ${preset.bpm} BPM. Podés editar los pasos y el tempo.`);
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
    const trackName = drawingMode === 'bass-step' ? 'Bajo' : drawingMode === 'melody-step' ? 'Piano' : tracks.find(track => track.id === button.dataset.track).detail;
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
    if (action === 'random') {
      updatePresetSelection();
      trackIds.forEach(trackId => {
        const buttons = root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`);
        buttons.forEach(stepButton => {
          const step = Number(stepButton.dataset.step);
          const active = trackId === 'kick'
            ? step % 4 === 0 || Math.random() > 0.84
            : Math.random() > (
              trackId === 'hat' ? 0.48
                : trackId === 'openhat' ? 0.82
                  : trackId === 'rimshot' ? 0.9
                    : trackId === 'lowtom' || trackId === 'hitom' || trackId === 'cowbell' ? 0.88
                      : 0.76
            );
          updateStepButton(stepButton, active);
        });
      });
      for (let step = 0; step < STEP_COUNT; step += 1) {
        bassPattern[step] = Math.random() > 0.24
          ? Math.floor(Math.random() * NOTE_COUNT)
          : null;
      }
      renderPitchPattern('bass', bassPattern);
      melodyPattern.fill(null);
      for (let step = 0; step < STEP_COUNT; step += 1) {
        if (Math.random() > 0.76) {
          melodyPattern[step] = Math.floor(Math.random() * NOTE_COUNT);
        }
      }
      renderPitchPattern('lead', melodyPattern);
      setStatus('Nuevo patrón creado. Ajustá lo que quieras.');
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
      void audioContext.close();
    }
    if (root.__grooveCleanup === cleanup) delete root.__grooveCleanup;
  };
  root.__grooveCleanup = cleanup;
  return cleanup;
}