// Service worker för Solvisning. Cachar appens filer så att den startar
// utan nät. Höj versionen i CACHE när något ska tvinga fram en ny cache.
const CACHE = 'solvisning-v5';

const FILER = [
  './',
  './index.html',
  './integritet.html',
  './manifest.json',
  './ikoner/ikon-192.png',
  './ikoner/ikon-512.png',
  './ikoner/apple-touch-icon.png'
];

// Vid installation: lägg alla filer i cachen och ta över direkt.
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(FILER))
      .then(() => self.skipWaiting())
  );
});

// Vid aktivering: rensa gamla cache-versioner.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((nycklar) => Promise.all(
        nycklar.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Sidladdningar hämtas från nätet först, så att en ny version syns
  // direkt när man är online. Utan nät faller vi tillbaka på cachen.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((svar) => {
          const kopia = svar.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', kopia));
          return svar;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Allt annat: cachen först, annars nätet.
  e.respondWith(
    caches.match(req).then((traff) => traff || fetch(req))
  );
});
