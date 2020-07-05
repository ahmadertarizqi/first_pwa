const CACHE_NAME = 'FIRST_PWA';
const urlsToCache = [
   "/",
   "/app_logo_favicon.png",
   "/index.html",
   "/manifest.json",
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
   "/data/imgs/movies/1Duc3EBiegywczxTWekvy03HWai.jpg",
   "/data/imgs/movies/f4aul3FyD3jv3v4bul1IrkWZvzq.jpg",
   "/data/imgs/movies/fOvqEunubL3wPskvtk2Ficfl0pH.jpg",
   "/data/imgs/movies/nPx3juctkdZvgrJ4DO35dUnVsyF.jpg",
   "/data/imgs/movies/5xPfTKBa9R6YGcxWpfRzYHjk3IA.jpg",
   "/data/imgs/movies/3B2twt8I02cLAPHG6dkDpTFbgz5.jpg",
   "/data/imgs/movies/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
   "/data/imgs/movies/oyG9TL7FcRP4EZ9Vid6uKzwdndz.jpg",
   "/data/imgs/movies/jHo2M1OiH9Re33jYtUQdfzPeUkx.jpg",
   "/data/imgs/movies/myf3qzpeN0JbuFRPwSpJcz7rmAT.jpg",
   "/data/imgs/movies/wxPhn4ef1EAo5njxwBkAEVrlJJG.jpg",
   "/data/imgs/movies/zQFjMmE3K9AX5QrBL1SXIxYQ9jz.jpg",
   "/data/imgs/tvshows/6t6r1VGQTTQecN4V0sZeqsmdU9g.jpg",
   "/data/imgs/tvshows/ajmkAwuK1TRFWMjKoSMgoAXbnc7.jpg",
   "/data/imgs/tvshows/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg",
   "/data/imgs/tvshows/wcaDIAG1QdXQLRaj4vC1EFdBT2.jpg",
   "/data/imgs/tvshows/bRJOwllemPbE4JTQ0TtcVu9efff.jpg",
   "/data/imgs/tvshows/drlfSCIlMKrEeMPhi8pqY4xGxj.jpg",
   "/data/imgs/tvshows/2AoqUTKKN4kjNe1K0kIPwiItHwv.jpg",
   "/data/imgs/tvshows/gKG5QGz5Ngf8fgWpBsWtlg5L2SF.jpg",
   "/data/imgs/tvshows/gHUCCMy1vvj58tzE3dZqeC9SXus.jpg",
   "/data/imgs/tvshows/1YffzZDZmxonFz4MTy0gaBDC3S0.jpg",
   "/data/imgs/tvshows/gPBf35AqvXHvKEpDHaQ4D9xXxeX.jpg",
   "/data/imgs/tvshows/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
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