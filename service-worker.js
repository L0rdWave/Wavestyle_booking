const CACHE_NAME = 'wavestyle-source-v2';
const CACHE_PREFIX = 'wavestyle-source-';
const APP_BASE = '/Wavestyle_booking/';
const ESSENTIAL_URLS = [
  APP_BASE,
  `${APP_BASE}index.html`,
  `${APP_BASE}public/manifest.webmanifest`,
  `${APP_BASE}public/favicon.svg`,
  `${APP_BASE}public/icons/wavestyle-180.png`,
  `${APP_BASE}public/icons/wavestyle-192.png`,
  `${APP_BASE}public/icons/wavestyle-512.png`,
  `${APP_BASE}src/main.js`,
  `${APP_BASE}src/pwa.js`,
  `${APP_BASE}src/core/router.js`,
  `${APP_BASE}src/components/Logo.js`,
  `${APP_BASE}src/styles/main.css`,
  `${APP_BASE}src/data/core-manifest.json`,
  `${APP_BASE}src/view/bookingView.js`,
  `${APP_BASE}src/view/constructionView.js`,
  `${APP_BASE}src/view/grooveboxView.js`,
  `${APP_BASE}src/view/heliosView.js`,
  `${APP_BASE}src/view/homeView.js`,
  `${APP_BASE}src/view/nightlifeView.js`,
  `${APP_BASE}src/view/nightlifeProposalView.js`,
  `${APP_BASE}src/view/sciKholeView.js`,
  `${APP_BASE}src/view/vansView.js`,
  `${APP_BASE}public/events.json`,
];
const OPTIONAL_URLS = [
  `${APP_BASE}public/favicon.svg`,
  `${APP_BASE}public/icons.svg`,
  `${APP_BASE}public/icons/wavestyle-app.svg`,
  `${APP_BASE}public/images/banner-hero.jpg`,
  `${APP_BASE}public/images/helios-wave-1.jpeg`,
  `${APP_BASE}public/images/logo-helios-wave.png`,
  `${APP_BASE}public/images/logo-sci-khole.png`,
  `${APP_BASE}public/images/logo-vans.png`,
  `${APP_BASE}public/images/sci-khole-1.jpeg`,
  `${APP_BASE}public/images/vans-1.jpeg`,
  `${APP_BASE}public/audio/helios-wave-twilightronix.mp3`,
  `${APP_BASE}public/audio/vans-take-you-higher.mp3`,
  `${APP_BASE}src/Documentacion/rider-tecnico-wavestyle.pdf`,
];
const SKIP_CACHE = /\.(?:zip|rar)(?:$|\?)/i;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ESSENTIAL_URLS);
    await Promise.all(OPTIONAL_URLS.map(async url => {
      try {
        const response = await fetch(url);
        if (response.ok) await cache.put(url, response);
      } catch (error) {
        console.warn('[Wavestyle] No se pudo guardar un recurso opcional para uso sin conexión:', url, error);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || SKIP_CACHE.test(url.pathname)) return;

  if (request.mode === 'navigate' && url.pathname.startsWith(APP_BASE)) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(`${APP_BASE}index.html`, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(`${APP_BASE}index.html`);
        return cached || new Response('Wavestyle todavía no está disponible sin conexión. Conectate a Internet y volvé a abrir la app.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      return new Response('', { status: 503, statusText: 'Sin conexión' });
    }
  })());
});
