const CACHE_NAME="agrosoft-cache-v1";
const urlsToCache=["./","./index.html","./manifest.json","./style.css","./app.js","./icon-192.png","./icon-512.png","./splash.png","./logo_fainver.png","./logoisabsoft.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))))});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
