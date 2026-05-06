const CACHE_NAME = 'pwa-espana-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Evento Install: Guardamos los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Archivos en caché listos');
            return cache.addAll(urlsToCache);
        })
    );
});

// Evento Fetch: Interceptamos peticiones y devolvemos de la caché si es posible
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Devuelve la respuesta cacheada si existe, o haz la petición a la red
            return response || fetch(event.request);
        })
    );
});

// Evento Activate: Limpiamos cachés antiguas para no usar versiones viejas
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});