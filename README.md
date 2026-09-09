# Solvisning

Webbapp för lägenhetsvisningar. Rikta mobilen mot ett fönster, ta en bild, dra i reglage för datum och tid och se var solen står i vyn.

Brief och handover finns i `OUTPUT/Solvisning/`.

## Status

Publicerad på GitHub Pages: https://fghub-code.github.io/solvisning/

Klart och verifierat på iPhone:

- Steg 1: kamerabild i helskärm, avtryckarknapp
- Steg 2: knappen fryser bilden på en canvas och läser kompass och lutning i samma ögonblick, värdena visas i en panel

Nästa steg: reglage för datum och tid, sedan solberäkning med SunCalc och en solmarkör i bilden.

## Så startar du lokalt

Kameran kräver `https` eller `localhost`, så det går inte att öppna filen direkt från skrivbordet.

```
cd KOD/solvisning
python3 -m http.server 8000
```

Öppna sedan `http://localhost:8000` i webbläsaren och godkänn kamerabehörigheten.

## Teknik

En enda HTML-fil, ingen byggkedja, vanilla JavaScript. Publiceras på GitHub Pages när v1 fungerar.
