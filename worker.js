self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open("stfuad.cc")
            .then((cache) => {
                const toCache = [
                    "./",
                    "./bestiary.html",
                    "./classes.html",
                    "./feats.html",
                    "./index.html",
                    "./initiative.html",
                    "./magicItems.html",
                    "./navigation.html",
                    "./races.html",
                    "./spells.html",
                    "./classes/sheets.classes.js",
                    "./classes/spellModal.class.js",
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
                ];

                console.log("Clearing cache");

                toCache.forEach(element => {
                    console.log(element);

                    cache.delete(element);
                });

                console.log(cache);

                return cache.addAll(toCache);
            })
    );

    console.log("install success")
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});