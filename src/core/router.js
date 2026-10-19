export function initRouter(renderCallback) {
  function handleRoute() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [cleanPath] = rawHash.split('?');
    const path = cleanPath || '/';
    
    // Limpiar clases de temas anteriores en el body
    document.body.className = '';
    
    // Asignar tema según la ruta
    if (path === '/vans') {
      document.body.classList.add('theme-vans');
    } else if (path === '/helios-wave') {
      document.body.classList.add('theme-helios');
    } else if (path === '/sci-khole') {
      document.body.classList.add('theme-scikhole');
    } else if (path.startsWith('/nightlife')) {
      document.body.classList.add('theme-nightlife');
    }

    renderCallback(path);
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', handleRoute);
  
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
      e.preventDefault();
      const link = e.target.closest('[data-link]');
      const href = link.getAttribute('href');
      window.location.hash = href;
    }
  });

  handleRoute();
}