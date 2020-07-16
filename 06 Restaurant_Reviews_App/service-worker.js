//setting the cache files

const cacheName = 'cachedfiles-v1';
const cacheFiles = [
    './',
    './index.html',
    './restaurant.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './css/styles.css',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './restaurant.html?id=1',
    './restaurant.html?id=2',
    './restaurant.html?id=3',
    './restaurant.html?id=4',
    './restaurant.html?id=5',
    './restaurant.html?id=6',
    './restaurant.html?id=7',
    './restaurant.html?id=8',
    './restaurant.html?id=9',
    './restaurant.html?id=10'
];

//installing service worker
self.addEventListener('install', function (e) {
    console.log('serviceWorker has been installed successfully');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('serviceWorker caching files');
            return cache.addAll(cacheFiles);
        })
    )
});

//activating service worker
self.addEventListener('activate', function (e) {
    console.log('serviceWorker has been Activated suuceesfully');
    e.waitUntil(
        caches.keys().then(function(cacheName) {
            return Promise.all(cacheName.map(function(thisCacheName){
                if(thisCacheName !== cacheName){
                    console.log('[serviceWorker] deleting cached files', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

//fetch event for service worker
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.open(cacheName).then(function (cache) {
            return cache.match(e.request).then(function (response) {
                return response || fetch(e.request).then(function (response) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        }))
});