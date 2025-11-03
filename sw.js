
const CACHE = "pig-scorekeeper-v19";
const ASSETS = ["./","./index.html"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.mode==="navigate") { e.respondWith(fetch(e.request).catch(()=>caches.match("./index.html"))); return; }
  if (url.origin===location.origin) { e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); return; }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
