// Passthrough Service Worker - 不缓存任何东西，所有请求直接转发
// 用于覆盖旧的有害SW
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  // 清除所有旧缓存
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) { return caches.delete(n); }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
