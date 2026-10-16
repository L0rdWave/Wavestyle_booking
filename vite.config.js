import { defineConfig } from 'vite';
import { createHash } from 'node:crypto';
import { cp, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const base = '/Wavestyle_booking/';

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  }));
  return nested.flat();
}

function pwaServiceWorker() {
  return {
    name: 'wavestyle-pwa-service-worker',
    apply: 'build',
    async closeBundle() {
      const outputDirectory = resolve(process.cwd(), 'dist');
      await cp(resolve(process.cwd(), 'public'), resolve(outputDirectory, 'public'), { recursive: true });
      const files = (await listFiles(outputDirectory))
        .filter(path => !/\.(?:zip|rar)$/i.test(path))
        .filter(path => !path.endsWith(`${sep}service-worker.js`))
        .map(path => ({
          absolutePath: path,
          relativePath: path.slice(outputDirectory.length + 1).split(sep).join('/'),
        }))
        .filter(file => !file.relativePath.startsWith('public/'));
      const hash = createHash('sha256');
      for (const file of files) {
        hash.update(file.relativePath);
        hash.update(await readFile(file.absolutePath));
      }
      const cacheName = `wavestyle-${hash.digest('hex').slice(0, 12)}`;
      const relativeFiles = files.map(file => file.relativePath);
      const assetUrls = relativeFiles.map(path => `${base}${path}`);
      const legacyPublicUrls = relativeFiles
        .filter(path => /^(?:images|audio|icons)\//.test(path) || /^(?:favicon\.svg|icons\.svg|manifest\.webmanifest)$/.test(path))
        .map(path => `${base}public/${path}`);
      const essentialUrls = assetUrls.filter(path =>
        /\/(?:index\.html|manifest\.webmanifest|favicon\.svg)$/.test(path)
        || /\/assets\/.*\.(?:js|css)$/.test(path)
        || /\/icons\/.*\.(?:svg|png)$/.test(path),
      );
      essentialUrls.push(
        `${base}public/manifest.webmanifest`,
        `${base}public/favicon.svg`,
        `${base}public/icons/wavestyle-180.png`,
        `${base}public/icons/wavestyle-192.png`,
        `${base}public/icons/wavestyle-512.png`,
      );
      const optionalUrls = [
        ...assetUrls.filter(path => !essentialUrls.includes(path) && !/\/(?:images|audio)\//.test(path)),
        ...legacyPublicUrls,
      ];
      const worker = `const CACHE_NAME = ${JSON.stringify(cacheName)};
const CACHE_PREFIX = 'wavestyle-';
const APP_BASE = ${JSON.stringify(base)};
const ESSENTIAL_URLS = ${JSON.stringify(essentialUrls)};
const OPTIONAL_URLS = ${JSON.stringify(optionalUrls)};
const SKIP_CACHE = /\\.(?:zip|rar)(?:$|\\?)/i;

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
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
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
          await cache.put(APP_BASE + 'index.html', response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(APP_BASE + 'index.html');
        if (cached) return cached;
        return new Response('Wavestyle todavía no está disponible sin conexión. Conectate a Internet y volvé a abrir la app.', {
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
`;
      await writeFile(resolve(outputDirectory, 'service-worker.js'), worker);
    },
  };
}

export default defineConfig({
  base,
  plugins: [pwaServiceWorker()],
});
