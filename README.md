# Solläge

Webbapp för lägenhetsvisningar. Rikta mobilen mot ett fönster, ta en bild, dra i reglage för datum och tid och se var solen står i vyn.

Appnamnet sätts i `index.html` via konstanten `APPNAMN` (splash, startsida, fliktitel) och separat i `manifest.json`, `apple-mobile-web-app-title` och `integritet.html`.

Brief och handover finns i `OUTPUT/Solvisning/`.

## Status

Publicerad på GitHub Pages: https://fghub-code.github.io/solvisning/

Klart och verifierat på iPhone:

- Steg 1: kamerabild i helskärm, avtryckarknapp
- Steg 2: knappen fryser bilden på en canvas och läser kompass och lutning i samma ögonblick
- Steg 3: reglage för datum och tid
- Steg 4a: position via geolocation, SunCalc inlagd, solens azimut och höjd visas, tidsreglaget snävt till soluppgång–solnedgång
- Steg 4b: solmarkör och varm övertoning projiceras in i bilden (hålkameramodell, 65° synfält, rollkompensation)
- Reglagen flyttade till en smal list i nederkanten, kompass och sol till en kompakt rad högst upp
- Startsida med guide och `integritet.html`
- Kantpil och vrid-råd när solen är utanför bild
- Installerbar som PWA: `manifest.json`, `sw.js`, ikoner i `ikoner/`

Kompassen verifierad mot iPhones kompassapp (2° skillnad).

Kvar: kalibrera synfält (`FOV_HORISONTELL`) och rolltecken mot verkligheten i dagsljus, ta bort felsökningsrutan.

## Så startar du lokalt

Kameran kräver `https` eller `localhost`, så det går inte att öppna filen direkt från skrivbordet.

```
cd KOD/solvisning
python3 -m http.server 8000
```

Öppna sedan `http://localhost:8000` i webbläsaren och godkänn kamerabehörigheten.

## Teknik

En enda HTML-fil, ingen byggkedja, vanilla JavaScript. Publiceras på GitHub Pages när v1 fungerar.
