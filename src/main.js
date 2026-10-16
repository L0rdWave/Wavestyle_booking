import { initRouter } from './core/router.js';
import { renderHome } from './view/homeView.js?v=groovebox-20261015';
import { renderHelios } from './view/heliosView.js?v=20261015-2230';
import { renderVans } from './view/vansView.js?v=20261015-2230';
import { renderSciKhole } from './view/sciKholeView.js';
import { renderBooking } from './view/bookingView.js?v=20261015-2230';
import { initGroovebox, renderGroovebox } from './view/grooveboxView.js?v=groovebox-keys-20261016';
import { initPwaInstall } from './pwa.js';

const app = document.getElementById('app');
let cleanupGroovebox = () => {};

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
    if (e.target.closest('a, button, .identity-card, .contact-card')) {
      cursor.classList.add('hovered');
    } else {
      cursor.classList.remove('hovered');
    }
  });
}

function render(path) {
  cleanupGroovebox();
  cleanupGroovebox = () => {};
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
  } else {
    app.innerHTML = `
      <div class="construction-container">
        <h2>404 - Frecuencia no encontrada</h2>
        <a href="#/" data-link class="back-btn">Volver al Inicio</a>
      </div>
    `;
  }

  // Inicializar íconos de Lucide tras re-renderizar la vista
  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (path === '/games') {
    cleanupGroovebox = initGroovebox(app);
  }
}

// Arrancar router y cursor
initRouter(render);
initCustomCursor();
initPwaInstall();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`)
      .catch(error => console.error('No se pudo preparar Wavestyle para uso sin conexión:', error));
  }, { once: true });
}