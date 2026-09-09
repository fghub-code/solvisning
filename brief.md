# Solvisning, brief för v1

Uppdaterad: 2026-09-09
Ersatter: Solvisning_Brief_v1.md
Status: ej påbörjad

## Vad appen ska göra

En webbapp som används på plats under en lägenhetsvisning. Användaren riktar mobilen mot ett fönster eller en balkong och tar en bild. Sedan drar hen i två reglage, ett för datum och ett för klockslag, och ser var solen står i just den vyn vid den tidpunkten. Är solen innanför bilden läggs ett varmt ljussken över fotot.

Syftet är att svara på frågan "får jag sol här i februari" utan att komma tillbaka en annan årstid.

## Avgränsning för v1

Ingår:
- Live kamerabild i webbläsaren
- Avtryckare som fryser bilden och samtidigt läser kompass och lutning
- Reglage för datum, ett år
- Reglage för tid, soluppgång till solnedgång
- Solmarkör som flyttar sig i bilden
- Varm ljusövertoning när solen är innanför bildens kanter
- Text som visar azimut, höjd och tidpunkt

Ingår inte i v1:
- Sparade objekt eller lista över visningar
- Manuell justering av väderstreck
- Skuggor från grannhus, balkongtak eller väggar
- Konto, inloggning, backend

## Det appen inte kan, och som ska sägas i gränssnittet

Appen räknar ut var solen står på himlen. Den vet inte vad som står i vägen. Ett hus mitt emot, ett balkongtak eller en trädkrona syns i bilden men finns inte i beräkningen. Ljusskenet är en visuell markering av att solen är i bild, inte en beräkning av hur ljust det blir i rummet.

Kompassen i en mobil är opålitlig inomhus. Armering och elektronik stör magnetometern. Räkna med tio till tjugo graders fel, vilket motsvarar ungefär en halvtimmes fel i soltid. Appen ska visa hur säker kompassavläsningen är, inte dölja osäkerheten.

## Teknik

En enda HTML-fil, ingen byggkedja, ingen ramverkskod. Vanilla JavaScript.

- Kamerabild: getMedia via navigator.mediaDevices.getUserMedia, spår "environment"
- Riktning: DeviceOrientationEvent. På iOS krävs DeviceOrientationEvent.requestPermission, anropad från ett knapptryck. Absolut väderstreck läses ur webkitCompassHeading på iOS och ur alpha med absolute true på Android
- Position: navigator.geolocation, för latitud och longitud
- Solberäkning: SunCalc, öppen källkod, ungefär fyra kilobyte
- Rendering: canvas ovanpå den frysta bilden

Kritisk detalj. Kompassvärdet måste läsas i samma ögonblick som bilden fryses och sparas tillsammans med bilden. Därför duger inte ett vanligt filuppladdningsfält som öppnar mobilkameran, för då vet appen inte hur telefonen var riktad. Kameran måste ligga inne i appen.

Synfältet antas till 65 grader horisontellt om det inte går att läsa ur kameraspåret. Det påverkar hur långt ut i kanten solen hamnar.

## Publicering och distribution

Kamera och sensorer kräver HTTPS. Appen kan alltså inte testas genom att öppna filen lokalt på mobilen. Den ska ligga på GitHub Pages, som är gratis och räcker för en statisk fil. Adressen blir offentlig direkt, vem som helst med länken kan öppna appen.

Efter att v1 fungerar, och inte tidigare, görs appen installerbar som PWA. Det kräver tre saker i mappen:

- `manifest.json` med appens namn, färger och startläge
- en service worker, en liten fil som cachar appen så att den startar utan nät
- ikoner i 192 och 512 pixlar

Då kan användaren välja Lägg till på hemskärmen och får en ikon som beter sig som en app. På iPhone ligger det valet under delningsknappen, vilket många inte hittar. Appen bör därför själv visa en kort instruktion första gången den öppnas i Safari.

App Store och Google Play ingår inte. Det tas upp igen först om det finns användning som motiverar avgifter och granskning.

## Integritet

Appen har ingen server och ingen databas. Bilden och positionen stannar i telefonen och skickas ingenstans. Det ska stå i appen, kort och tydligt, inte gömt i en lång text.

Positionen är en personuppgift enligt GDPR även när den bara används lokalt. Så länge inget lämnar telefonen räcker en mening i gränssnittet plus en kort integritetstext på en egen sida. I samma sekund som något börjar sparas på en server byter projektet nivå och kräver laglig grund, radering på begäran och en kontaktväg. Undvik det.

## Så mäter vi att v1 fungerar

Stå vid ett fönster med känt väderstreck. Ta en bild. Ställ reglagen på dagens datum och nuvarande klockslag. Solmarkören ska hamna där solen faktiskt syns. Är felet större än tjugo grader är kompassavläsningen problemet, inte matten.
