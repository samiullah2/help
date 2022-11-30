const CACHE_NAME = "version-1";
const urlsToCache = [
    '/index.html',
    '/offline.html'
    // Add new pages here for offline availability
];

const self = this;
// ServiceWorker installeren
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets')
                return cache.addAll(urlsToCache)
            })
    )
});


// Naar requests luisteren
// Pages die offline werken gaan tonen en wanneer user een niet-offline available page probeert te
// gaan openen gaan we de offline (fallback) page tonen
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cacheRes) => {
                return cacheRes || fetch(event.request) 
            }).catch(() => caches.match('offline.html'))
    )
});

// Service Worker activeren
// Oude cache removen en enkel de nieuwe gaan houden
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
});