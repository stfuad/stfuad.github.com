self.addEventListener('install', (e) => {
    e.waitUntil(caches.open("stfuad.cc")
        .then((cache) => {
            return cache.addAll([
                "./navigation.html",
                "./json/5e Data.json"
            ]);
    }));

    console.log("install success")
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );

    console.log("Waiting for fetch requests");
});

self.addEventListener('import', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || import(e.request);
        })
    );

    console.log("Waiting for import requests");
})