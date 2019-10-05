self.addEventListener('install', (e) => {
    e.waitUntil(caches.open("stfuad.cc")
        .then((cache) => {
            return cache.addAll([
                "./json/5e Data.json"
            ]);
    }));
});