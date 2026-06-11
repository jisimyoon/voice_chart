const CACHE='er-zone-v3';
const ASSETS=['./', './index.html', './manifest.json'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});
// 캐시 안 쓰고 항상 네트워크에서 받기 (개발 중)
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('api.openai.com')||e.request.url.includes('anthropic.com')) return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
