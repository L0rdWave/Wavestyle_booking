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
];

const initialPattern = {
  kick: [0, 4, 8, 12],
  bass: [0, 3, 6, 8, 11, 14],
  snare: [4, 12],
  hat: [2, 6, 10, 14],
  clap: [6, 14],
  openhat: [6, 14],
  rimshot: [],
  lowtom: [12, 15],
  hitom: [7, 15],
  cowbell: [2, 10],
};

const genrePresets = {
  house: {
    name: 'Funky House',
    bpm: 124,
    pattern: {
      kick: [0, 4, 8, 12],
      bass: [2, 5, 6, 10, 13, 14],
      snare: [12],
      hat: [2, 6, 10, 14],
      clap: [4, 12],
      openhat: [3, 7, 11, 15],
      rimshot: [6, 14],
      lowtom: [15],
      hitom: [7],
      cowbell: [2, 10],
    },
  },
  techno: {
    name: 'Raw Techno',
    bpm: 132,
    pattern: {
      kick: [0, 4, 8, 12],
      bass: [2, 6, 10, 14],
      snare: [12],
      hat: [2, 6, 10, 14],
      clap: [4, 12],
      openhat: [7, 15],
      rimshot: [4, 12],
      lowtom: [3, 11],
      hitom: [7, 15],
      cowbell: [6, 14],
    },
  },
  psytrance: {
    name: 'Full-on Uplifting',
    bpm: 145,
    pattern: {
      kick: [0, 4, 8, 12],
      bass: [2, 6, 10, 14],
      snare: [4, 12],
      hat: [2, 6, 10, 14],
      clap: [],
      openhat: [3, 7, 11, 15],
      rimshot: [7, 15],
      lowtom: [12],
      hitom: [3, 11],
      cowbell: [6, 14],
    },
  },
};

const bassNotes = [110, 110, 130.81, 110, 146.83, 110, 164.81, 130.81, 98, 110, 130.81, 146.83, 110, 130.81, 164.81, 130.81];

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
            <p class="groovebox-hint">Tocá o arrastrá por los casilleros para dibujar el ritmo. Cada fila es un sonido.</p>
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
            <button type="button" class="groove-preset-button" data-action="preset" data-preset="house" aria-pressed="false">
              <span>House</span><small>Funky · 124 BPM</small>
            </button>
            <button type="button" class="groove-preset-button" data-action="preset" data-preset="techno" aria-pressed="false">
              <span>Techno</span><small>Raw · 132 BPM</small>
            </button>
            <button type="button" class="groove-preset-button" data-action="preset" data-preset="psytrance" aria-pressed="false">
              <span>Psytrance</span><small>Full-on · 145 BPM</small>
            </button>
          </div>
        </div>

        <div class="groove-sequencer-scroll" role="region" aria-label="Secuenciador de 16 pasos; desplazá horizontalmente en pantallas chicas" tabindex="0">
          <div class="groove-sequencer">
            <div class="groove-step-numbers" aria-hidden="true">
              <span>PISTA / VOL</span>
              ${Array.from({ length: 16 }, (_, index) => `<span class="${index % 4 === 0 ? 'groove-beat-number' : ''}">${String(index + 1).padStart(2, '0')}</span>`).join('')}
            </div>
            ${tracks.map(track => `
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
                ${Array.from({ length: 16 }, (_, index) => `
                  <button
                    type="button"
                    class="groove-step${initialPattern[track.id].includes(index) ? ' is-active' : ''}"
                    data-action="step"
                    data-track="${track.id}"
                    data-step="${index}"
                    aria-label="${track.detail}, paso ${index + 1}; tocar para activar o desactivar"
                    aria-pressed="${initialPattern[track.id].includes(index)}"
                  ></button>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="groovebox-footer">
          <p class="groove-status" data-status aria-live="polite">El audio se activa al tocar Play o un pad.</p>
          <span class="groove-step-readout"><span data-step-readout>--</span> / 16</span>
        </div>
      </section>

      <p class="groovebox-note"><i data-lucide="smartphone" aria-hidden="true"></i> También funciona en el celu: deslizá el secuenciador para ver todos los pasos.</p>
    </main>
  `;
}

export function initGroovebox(root) {
  if (typeof root.__grooveCleanup === 'function') root.__grooveCleanup();
  const trackIds = tracks.map(track => track.id);
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
  let noiseBuffer;
  let audioUnlockPromise;
  let schedulerId;
  let nextStepAt = 0;
  let nextStepIndex = 0;
  let isPlaying = false;
  let drawingPointerId = null;
  let drawingActive = false;
  const visualTimers = new Set();

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
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
      trackGains = Object.fromEntries(trackIds.map(trackId => {
        const gain = audioContext.createGain();
        gain.gain.value = Number(trackVolumeInputs[trackId].value) / 100;
        gain.connect(masterGain);
        return [trackId, gain];
      }));

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
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(155, time);
    oscillator.frequency.exponentialRampToValueAtTime(42, time + 0.16);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.9, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);
    oscillator.connect(gain);
    gain.connect(trackGains.kick);
    oscillator.start(time);
    oscillator.stop(time + 0.25);
  }

  function playBass(time, step = 0) {
    const oscillator = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(bassNotes[step % bassNotes.length], time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, time);
    filter.frequency.exponentialRampToValueAtTime(240, time + 0.2);
    filter.Q.value = 1;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.42, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(trackGains.bass);
    oscillator.start(time);
    oscillator.stop(time + 0.23);
  }

  function playSnare(time) {
    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const noiseGain = audioContext.createGain();
    const tone = audioContext.createOscillator();
    const toneGain = audioContext.createGain();

    noise.buffer = noiseBuffer;
    filter.type = 'highpass';
    filter.frequency.value = 1400;
    noiseGain.gain.setValueAtTime(0.0001, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.36, time + 0.004);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(trackGains.snare);
    noise.start(time);
    noise.stop(time + 0.19);

    tone.type = 'triangle';
    tone.frequency.setValueAtTime(185, time);
    toneGain.gain.setValueAtTime(0.0001, time);
    toneGain.gain.exponentialRampToValueAtTime(0.22, time + 0.004);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    tone.connect(toneGain);
    toneGain.connect(trackGains.snare);
    tone.start(time);
    tone.stop(time + 0.13);
  }

  function playHat(time) {
    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    noise.buffer = noiseBuffer;
    filter.type = 'highpass';
    filter.frequency.value = 7500;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.2, time + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(trackGains.hat);
    noise.start(time);
    noise.stop(time + 0.06);
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
      noise.start(burstAt);
      noise.stop(burstAt + duration + 0.005);
    });
  }

  function playOpenHat(time) {
    const noise = audioContext.createBufferSource();
    const highpass = audioContext.createBiquadFilter();
    const body = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    noise.buffer = noiseBuffer;
    highpass.type = 'highpass';
    highpass.frequency.value = 6200;
    body.type = 'peaking';
    body.frequency.value = 9000;
    body.gain.value = 2;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.2, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.32);
    noise.connect(highpass);
    highpass.connect(body);
    body.connect(gain);
    gain.connect(trackGains.openhat);
    noise.start(time);
    noise.stop(time + 0.33);
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
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency * 1.8, time);
    oscillator.frequency.exponentialRampToValueAtTime(frequency, time + 0.08);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.48, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);
    oscillator.connect(gain);
    gain.connect(output);
    oscillator.start(time);
    oscillator.stop(time + 0.25);
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
    setPlayhead(step, time - audioContext.currentTime);
  }

  function scheduler() {
    while (nextStepAt < audioContext.currentTime + 0.1) {
      scheduleStep(nextStepIndex, nextStepAt);
      nextStepAt += 60 / Number(tempoInput.value) / 4;
      nextStepIndex = (nextStepIndex + 1) % 16;
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

  function updatePresetSelection(presetId = '') {
    root.querySelectorAll('[data-action="preset"]').forEach(button => {
      const isSelected = button.dataset.preset === presetId;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
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

    tempoInput.value = String(preset.bpm);
    tempoInput.dispatchEvent(new Event('input', { bubbles: true }));
    updatePresetSelection(presetId);
    setStatus(`Template ${preset.name} aplicado a ${preset.bpm} BPM. Podés editar los pasos y el tempo.`);
  }

  function getStepButton(target) {
    return target instanceof Element ? target.closest('button[data-action="step"]') : null;
  }

  function startDrawing(event) {
    const button = getStepButton(event.target);
    if (!button || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;

    if (button.hasPointerCapture && button.hasPointerCapture(event.pointerId)) {
      button.releasePointerCapture(event.pointerId);
    }
    drawingPointerId = event.pointerId;
    drawingActive = button.getAttribute('aria-pressed') !== 'true';
    updatePresetSelection();
    updateStepButton(button, drawingActive);
    const trackName = tracks.find(track => track.id === button.dataset.track).detail;
    const stepNumber = Number(button.dataset.step) + 1;
    setStatus(`${trackName}, paso ${stepNumber}: ${drawingActive ? 'activado' : 'desactivado'}.`);
  }

  function continueDrawing(event) {
    if (event.pointerId !== drawingPointerId) return;
    const button = getStepButton(document.elementFromPoint(event.clientX, event.clientY));
    if (button && root.contains(button)) updateStepButton(button, drawingActive);
  }

  function stopDrawing(event) {
    if (event.pointerId === drawingPointerId) drawingPointerId = null;
  }

  function showAudioError(error) {
    console.error('No se pudo iniciar el audio de la groovebox:', error);
    setStatus(error instanceof Error ? error.message : 'No se pudo iniciar el audio. Probá de nuevo.', true);
  }

  async function handleClick(event) {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const { action, track } = button.dataset;
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
            : trackId === 'bass'
              ? step % 4 === 0 || Math.random() > 0.78
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
      setStatus('Nuevo patrón creado. Ajustá lo que quieras.');
      return;
    }

    if (action === 'clear') {
      updatePresetSelection();
      root.querySelectorAll('.groove-step').forEach(stepButton => updateStepButton(stepButton, false));
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
  root.addEventListener('pointerdown', primeAudioFromGesture);
  root.addEventListener('pointerdown', startDrawing);
  root.addEventListener('pointermove', continueDrawing);
  window.addEventListener('pointerup', stopDrawing);
  window.addEventListener('pointercancel', stopDrawing);

  tempoInput.addEventListener('input', () => {
    tempoValue.value = tempoInput.value;
    tempoValue.textContent = tempoInput.value;
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