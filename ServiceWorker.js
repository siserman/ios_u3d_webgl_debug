const cacheName = "TimTekkler-ios_u3d_webgl_debug-0.1";
const contentToCache = [
    "Build/ios_u3d_webgl_debug.loader.js",
    "Build/ios_u3d_webgl_debug.framework.js.unityweb",
    "Build/ios_u3d_webgl_debug.data.unityweb",
    "Build/ios_u3d_webgl_debug.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
