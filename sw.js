const CACHE_NAME = "star-name-v1";

const urlsToCache = [
  "index.html",
  "style.css",
  "script.js",
  "images/Starverse.jpeg"
];

// Install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (let url of urlsToCache) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn("Failed to cache:", url);
        }
      }
    })
  );
});

// Fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});