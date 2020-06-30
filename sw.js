const CACHE_NAME = 'FIRST_PWA';
const urlsToCache = [
   "/",
   "/index.html",
   "/navigation.html",
   "/pages/about.html",
   "/pages/movies.html",
   "/pages/tvshows.html",
   "/pages/home.html",
   "/css/materialize.min.css",
   "/css/custom.css",
   "/js/materialize.min.js",
   "/js/dayjs.min.js",
   "/js/nav.js",
   "/js/app.js",
   "/img/icons.svg",
   "/img/bg-banner.jpg",
   "/data/movies.json",
   "/data/tvshows.json",
];

self.addEventListener('install', function(ev) {
   ev.waitUntil(
      caches.open(CACHE_NAME)
            .then(function(cache) {
               return cache.addAll(urlsToCache);
            })
   );
});

self.addEventListener('fetch', function(ev) {
   // console.log(ev.request, 'hihik')
   ev.respondWith(
      caches.match(ev.request, { cacheName: CACHE_NAME })
            .then(function(response) {
               if(response) {
                  console.log('ServiceWorker: Gunakan aset dari Cache', response.url);
                  return response;
               }

               console.log('ServiceWorker: Memuat aset dari server', ev.request.url);
               return fetch(ev.request);
            })
   );
});

self.addEventListener('activate', function(ev) {
   ev.waitUntil(
      caches.keys().then(function(cacheNames) {
         return Promise.all(
            cacheNames.map(function(cacheName) {
              if(cacheName !== CACHE_NAME) {
                 console.log(`Service Worker : cache ${cacheName} dihapus`);
                 return caches.delete(cacheName);
              } 
            })
         )
      })
   )
});