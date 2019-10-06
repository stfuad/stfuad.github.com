self.addEventListener('install', (e) => {
    e.waitUntil(caches.open("stfuad.cc")
        .then((cache) => {
            return cache.addAll([
                "./navigation.html",
                "./classes/sheets.module.js",
                "./classes/spellModal.module.js",
                "./json/5e Data.json",
                "./modules/bestiary.module.js",
                "./modules/classes.module.js",
                "./modules/creature.module.js",
                "./modules/feats.module.js",
                "./modules/htmlElements.module.js",
                "./modules/item.module.js",
                "./modules/magicItems.module.js",
                "./modules/races.module.js",
                "./modules/sorting.module.js",
                "./modules/spell.module.js",
                "./modules/spells.module.js"
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

/* self.addEventListener('import', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || import(e.request);
        })
    );

    console.log("Waiting for import requests");
}) */