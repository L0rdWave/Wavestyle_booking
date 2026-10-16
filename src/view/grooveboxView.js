const tracks = [
  { id: 'kick', name: 'KICK', detail: 'Bombo', color: 'cyan' },
  { id: 'snare', name: 'SNARE', detail: 'Caja', color: 'purple' },
  { id: 'hat', name: 'HAT', detail: 'Hi-hat', color: 'amber' },
  { id: 'clap', name: 'CLAP', detail: 'Aplauso', color: 'pink' },
];

const initialPattern = {
  kick: [0, 4, 8, 12],
  snare: [4, 12],
  hat: [2, 6, 10, 14],
  clap: [6, 14],
};

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

        <div class="groove-sequencer-scroll" role="region" aria-label="Secuenciador de 16 pasos; desplazá horizontalmente en pantallas chicas" tabindex="0">
          <div class="groove-sequencer">
            <div class="groove-step-numbers" aria-hidden="true">
              <span></span>
              ${Array.from({ length: 16 }, (_, index) => `<span class="${index % 4 === 0 ? 'groove-beat-number' : ''}">${String(index + 1).padStart(2, '0')}</span>`).join('')}
            </div>
            ${tracks.map(track => `
              <div class="groove-track groove-track-${track.color}" data-track-row="${track.id}">
                <button class="groove-track-name" type="button" data-action="preview" data-track="${track.id}" aria-label="Escuchar ${track.detail}">
                  <span>${track.name}</span>
                  <small>${track.detail}</small>
                </button>
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
  const status = root.querySelector('[data-status]');
  const stepReadout = root.querySelector('[data-step-readout]');

  let audioContext;
  let masterGain;
  let noiseBuffer;
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
      masterGain.connect(audioContext.destination);

      noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate, audioContext.sampleRate);
      const samples = noiseBuffer.getChannelData(0);
      for (let index = 0; index < samples.length; index += 1) {
        samples[index] = Math.random() * 2 - 1;
      }
    }

    return audioContext;
  }

  async function unlockAudio() {
    const context = getAudioContext();
    if (context.state === 'suspended') {
      await context.resume();
    }
    if (context.state !== 'running') {
      throw new Error('El navegador no habilitó el audio. Tocá Play otra vez o revisá el modo silencio.');
    }
    return context;
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
    gain.connect(masterGain);
    oscillator.start(time);
    oscillator.stop(time + 0.25);
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
    noiseGain.connect(masterGain);
    noise.start(time);
    noise.stop(time + 0.19);

    tone.type = 'triangle';
    tone.frequency.setValueAtTime(185, time);
    toneGain.gain.setValueAtTime(0.0001, time);
    toneGain.gain.exponentialRampToValueAtTime(0.22, time + 0.004);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    tone.connect(toneGain);
    toneGain.connect(masterGain);
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
    gain.connect(masterGain);
    noise.start(time);
    noise.stop(time + 0.06);
  }

  function playClap(time) {
    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    noise.buffer = noiseBuffer;
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.8;
    for (let burst = 0; burst < 3; burst += 1) {
      const burstAt = time + burst * 0.022;
      gain.gain.setValueAtTime(0.0001, burstAt);
      gain.gain.exponentialRampToValueAtTime(0.23, burstAt + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, burstAt + 0.045);
    }
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start(time);
    noise.stop(time + 0.12);
  }

  const soundByTrack = {
    kick: playKick,
    snare: playSnare,
    hat: playHat,
    clap: playClap,
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
        soundByTrack[trackId](time);
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
        updateStepButton(button, isActive);
        const trackName = tracks.find(item => item.id === track).detail;
        setStatus(`${trackName}, paso ${Number(button.dataset.step) + 1}: ${isActive ? 'activado' : 'desactivado'}.`);
      }
      return;
    }
    if (action === 'random') {
      trackIds.forEach(trackId => {
        const buttons = root.querySelectorAll(`[data-track="${trackId}"][data-action="step"]`);
        buttons.forEach(stepButton => {
          const active = trackId === 'kick'
            ? Number(stepButton.dataset.step) % 4 === 0 || Math.random() > 0.84
            : Math.random() > (trackId === 'hat' ? 0.48 : 0.76);
          updateStepButton(stepButton, active);
        });
      });
      setStatus('Nuevo patrón creado. Ajustá lo que quieras.');
      return;
    }

    if (action === 'clear') {
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
  root.addEventListener('pointerdown', startDrawing);
  root.addEventListener('pointermove', continueDrawing);
  window.addEventListener('pointerup', stopDrawing);
  window.addEventListener('pointercancel', stopDrawing);

  tempoInput.addEventListener('input', () => {
    tempoValue.value = tempoInput.value;
    tempoValue.textContent = tempoInput.value;
  });

  volumeInput.addEventListener('input', () => {
    if (masterGain && audioContext) {
      masterGain.gain.setTargetAtTime(Number(volumeInput.value) / 100, audioContext.currentTime, 0.015);
    }
  });

  const cleanup = () => {
    stopPlayback();
    root.removeEventListener('click', handleClick);
    root.removeEventListener('pointerdown', startDrawing);
    root.removeEventListener('pointermove', continueDrawing);
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