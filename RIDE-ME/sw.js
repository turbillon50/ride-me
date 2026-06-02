// RideMe service worker — cache-first con auto-update
const CACHE_NAME = 'rideme-v3';
const ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS).catch((err) => console.warn('Some assets failed to cache:', err))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Eliminar caches viejos
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    // Tomar control de las páginas abiertas
    await self.clients.claim();
    // Forzar recarga de todas las páginas controladas para que sirvan
    // contenido nuevo y no la versión cacheada por el SW anterior.
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => { try { c.navigate(c.url); } catch {} });
  })());
});

// Strategy:
// - HTML / navegación: network-first (siempre intenta fresco, fallback a cache)
// - Assets estáticos: cache-first (rápido)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const isHtml = request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');

  if (isHtml) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request, { cache: 'no-store' });
        if (fresh && fresh.status === 200) {
          const copy = fresh.clone();
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, copy).catch(() => {});
        }
        return fresh;
      } catch {
        const cached = await caches.match(request);
        return cached || caches.match('/');
      }
    })());
    return;
  }

  // Otros recursos: cache-first
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, copy).catch(() => {}));
      }
      return response;
    } catch {
      return caches.match('/');
    }
  })());
});

// Permite a la página pedir actualización inmediata
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
