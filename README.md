# Solvisning

Webbapp för lägenhetsvisningar. Rikta mobilen mot ett fönster, ta en bild, dra i reglage för datum och tid och se var solen står i vyn.

Brief och handover finns i `OUTPUT/Solvisning/`.

## Status

Steg 1: `index.html` visar mobilkamerans bild i helskärm med en avtryckarknapp som ännu inte gör något.

## Så startar du lokalt

Kameran kräver `https` eller `localhost`, så det går inte att öppna filen direkt från skrivbordet.

```
cd KOD/solvisning
python3 -m http.server 8000
```

Öppna sedan `http://localhost:8000` i webbläsaren och godkänn kamerabehörigheten.

## Teknik

En enda HTML-fil, ingen byggkedja, vanilla JavaScript. Publiceras på GitHub Pages när v1 fungerar.
