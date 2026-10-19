import { initRouter } from './core/router.js';
import { renderHome } from './view/homeView.js?v=radio-20261018';
import { renderHelios } from './view/heliosView.js?v=20261015-2230';
import { renderVans } from './view/vansView.js?v=20261015-2230';
import { renderSciKhole } from './view/sciKholeView.js';
import { renderBooking } from './view/bookingView.js?v=20261015-2230';
import { initGroovebox, renderGroovebox } from './view/grooveboxView.js?v=groovebox-keys-20261016';
import { renderNightlifeView } from './view/nightlifeView.js';
import { renderNightlifeProposalView } from './view/nightlifeProposalView.js';
import { renderRadioView, syncRadioDockRoute } from './view/radioView.js?v=radio-20261018';
import { initPwaInstall } from './pwa.js';

const app = document.getElementById('app');
let cleanupCurrentView = () => {};

// Sistema de Cursor Custom
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.custom-cursor-dot');

  if (!cursor || !dot) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .identity-card, .contact-card, .radio-station-card')) {
      cursor.classList.add('hovered');
    } else {
      cursor.classList.remove('hovered');
    }
  });
}

function render(path) {
  cleanupCurrentView();
  cleanupCurrentView = () => {};
  app.innerHTML = '';
  
  if (path === '/' || path === '') {
    app.innerHTML = renderHome();
  } else if (path === '/helios-wave') {
    app.innerHTML = renderHelios();
  } else if (path === '/vans') {
    app.innerHTML = renderVans();
  } else if (path === '/sci-khole') {
    app.innerHTML = renderSciKhole();
  } else if (path === '/booking') {
    app.innerHTML = renderBooking();
  } else if (path === '/games') {
    app.innerHTML = renderGroovebox();
  } else if (path === '/nightlife') {
    cleanupCurrentView = renderNightlifeView(app);
  } else if (path === '/nightlife/propose') {
    app.innerHTML = renderNightlifeProposalView();
  } else if (path === '/radio') {
    cleanupCurrentView = renderRadioView(app);
  } else {
    app.innerHTML = `
      <div class="construction-container">
        <h2>404 - Frecuencia no encontrada</h2>
        <a href="#/" data-link class="back-btn">Volver al Inicio</a>
      </div>
    `;
  }

  syncRadioDockRoute(path);

  // Inicializar íconos de Lucide tras re-renderizar la vista
  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (path === '/games') {
    cleanupCurrentView = initGroovebox(app);
  }
}

// Arrancar router y cursor
initRouter(render);
initCustomCursor();
initPwaInstall();

const viteEnvironment = import.meta.env || {};
const isProduction = viteEnvironment.PROD ?? !['localhost', '127.0.0.1'].includes(location.hostname);
const appBaseUrl = viteEnvironment.BASE_URL ?? '/Wavestyle_booking/';

if (isProduction && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${appBaseUrl}service-worker.js?v=source-v3`)
      .catch(error => console.error('No se pudo preparar Wavestyle para uso sin conexión:', error));
  }, { once: true });
}