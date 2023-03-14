const cacheName = 'cache-v1';

const offlinePageCacheName = "cache-offline-v1"

const precacheResources = ['/', '/index.html', '/js/main.js', '/css/style.css'];

const offlinePage = 'offline.html'

self.addEventListener('install', (event) => {
     console.log('Service worker install event!');
     // Precache resources
     event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
     event.waitUntil(caches.open(offlinePageCacheName).then((cache) => cache.add(offlinePage)));
});

self.addEventListener('activate', (event) => {
     console.log('Service worker activate event!');
     // Activate service worker immediately
     self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // Intercepts all fetch requests and handles them with the custom logic below
    
    event.respondWith(
      (async () => {
      
        //Start by checking the cache
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          // If the resource wasn't in the cache, try to fetch it
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // If unable to fetch the resource, show offline page
          const cache = await caches.open(offlinePageCacheName);
          const cachedResponse = await cache.match(offlinePage);
          return cachedResponse;
        }
      })()
    );
})
