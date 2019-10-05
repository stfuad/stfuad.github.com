self.addEventListener('install', (e) => {
    e.waitUntil(caches.open("stfuad.cc")
        .then((cache) => {
            return cache.addAll([
                "./json/5e Data.json"
            ]);
    }));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});