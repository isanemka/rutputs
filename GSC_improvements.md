# GSC-förbättringar för rutputs.nu — Claude Code-prompts

Baserat på Google Search Console-analys (maj 2026).
Nuläge: 22 klick, 7 390 exponeringar, 0,3% CTR, snittposition 33,6 (3 mån).

---

## ~~1. Prissidan — akut åtgärd~~ ✅

**Problem:** 1 540 exponeringar, 1 klick, position 52,5. Högst volym men sämst ranking.

```
Analysera filen för vår prissida (/pris) och gör följande förbättringar:

1. Skriv om <title>-taggen till max 60 tecken. Den ska innehålla "fönsterputs", "pris" och "Stockholm". Inkludera ett konkret prisexempel, t.ex. "Fönsterputs Stockholm — Priser från 499 kr med RUT-avdrag"

2. Skriv en ny meta description (max 155 tecken) som innehåller:
   - Prisintervall
   - RUT-avdrag som USP
   - En tydlig CTA ("Boka idag", "Få offert" eller liknande)

3. Strukturera sidinnehållet med:
   - En H1 med huvudsökordet "Pris fönsterputs Stockholm"
   - H2-rubriker för varje prissektion (t.ex. "Pris per fönster", "Paketpriser", "Vad ingår")
   - En FAQ-sektion med schema markup (JSON-LD) som besvarar:
     * "Vad kostar fönsterputs i Stockholm?"
     * "Hur mycket kostar fönsterputs per timme?"
     * "Vad kostar fönsterputs med RUT-avdrag?"
   - En pristabell med tydlig HTML <table> struktur

4. Lägg till intern länkning från prissidan till varje områdessida och tillbaka

Visa mig alla ändringar innan du sparar.
```

---

## ~~2. Snabbvinster — Spånga & Bergshamra (position 15-20)~~ ✅

**Problem:** Redan nära förstasidan men 0 klick. Behöver CTR-optimering + litet positionslyft.

```
Analysera områdessidorna för Spånga (/omrade/spanga) och Bergshamra (/omrade/bergshamra). De rankar redan på position 15-20 i Google och behöver pushas till topp 10.

Gör följande för VARJE sida:

1. Title-tag: Skriv om till formatet "[Stadsdel] Fönsterputs — Från [pris] kr | Rutputs.nu"
   Max 60 tecken, inkludera stadsdelsnamn + "fönsterputs"

2. Meta description: Unik per sida, nämn stadsdelen, RUT-avdrag och snabb bokning. Max 155 tecken.

3. H1: Exakt match "[Fönsterputs/Fönsterputsning] i [Stadsdel]"

4. Utöka innehållet till minst 800 ord med:
   - Introduktion som nämner stadsdelen naturligt 2-3 gånger
   - Sektion om tjänster ni erbjuder i just det området
   - Praktisk info (hur lång tid tar det, vad ingår)
   - Priser med RUT-avdrag
   - Minst 2 kundomdömen/recensioner från området (eller platshållare jag kan fylla i)
   - Kontakt-CTA med telefonnummer

5. Schema markup (JSON-LD) med:
   - LocalBusiness
   - Service
   - AggregateRating (om ni har recensioner)

6. Intern länkning: Länka till startsidan, prissidan och 2-3 närliggande områdessidor

Visa alla ändringar som diff.
```

---

## ~~3. Högvolym-områden — Bromma, Sollentuna, Täby (position 39-46)~~ ✅

**Problem:** Många exponeringar (344-457) men position runt 40. Behöver starkare innehåll.

```
Våra områdessidor för Bromma, Sollentuna och Täby rankar på position 39-46 i Google med 344-457 exponeringar var. Vi behöver förbättra dem rejält.

För VARJE sida:

1. Gör en innehållsaudit: Räkna ord, identifiera thin content, hitta saknade sektioner

2. Bygg ut varje sida till minst 1200 ord med:
   - Unik introduktion om fönsterputs i just den stadsdelen
   - "Varför välja Rutputs i [stadsdel]"-sektion
   - Detaljerad tjänstebeskrivning
   - Prissektion med tabell
   - FAQ med minst 5 frågor specifika för området, t.ex.:
     * "Vad kostar fönsterputs i [stadsdel]?"
     * "Hur ofta bör man putsa fönster i [stadsdel]?"
     * "Erbjuder ni fönsterputs för bostadsrättsföreningar i [stadsdel]?"
   - CTA-sektion med kontaktuppgifter

3. Optimera title och meta description (samma format som punkt 2 ovan)

4. Lägg till FAQ-schema (JSON-LD) och LocalBusiness-schema med serviceArea

5. Se till att varje sida har unika bilder med beskrivande alt-texter som inkluderar stadsdelsnamnet

Ge mig en prioriterad lista över ändringarna per sida.
```

---

## ~~4. Nya områdessidor — Kista, Viksjö, Kallhäll~~ ✅

**Problem:** Dessa sökord har exponeringar (101-166) men saknar dedicerade sidor eller har svagt innehåll.

```
Vi behöver skapa nya eller förbättra befintliga områdessidor för Kista, Viksjö och Kallhäll. Dessa sökord har redan exponeringar i Google (100-170) utan dedikerade sidor.

Skapa sidor med URL-strukturen /omrade/[stadsdel] och följande mall:

1. URL: /omrade/kista, /omrade/viksjo, /omrade/kallhall (inga å/ä/ö i URL)

2. Title-tag: "Fönsterputs i [Stadsdel] — Från [pris] kr med RUT | Rutputs"

3. Meta description: Unik per stadsdel, max 155 tecken

4. Innehållsstruktur (minst 1000 ord):
   - H1: "Fönsterputs i [Stadsdel]"
   - Intro (150 ord): Nämn stadsdelen, typ av bostäder där, varför fönsterputs behövs
   - H2 "Våra tjänster i [Stadsdel]": Lista tjänster
   - H2 "Priser för fönsterputs i [Stadsdel]": Pristabell + RUT-info
   - H2 "Så går det till": Steg-för-steg process
   - H2 "Vanliga frågor om fönsterputs i [Stadsdel]": 5 FAQ:er
   - H2 "Boka fönsterputs i [Stadsdel]": CTA med telefon och formulär

5. Schema markup: LocalBusiness + FAQPage (JSON-LD)

6. Intern länkning:
   - Från startsidan till nya sidor
   - Från prissidan till nya sidor
   - Mellan närliggande områdessidor
   - Breadcrumbs: Hem > Områden > [Stadsdel]

7. Sitemap: Uppdatera sitemap.xml med de nya sidorna

Skapa alla tre sidor och visa mig resultatet.
```

---

## ~~5. Startsidan — CTR-optimering~~ ✅

**Problem:** Bäst CTR (1,1%) men bara 5 klick av 467 exponeringar. Position 26,3.

```
Optimera startsidan (/) för bättre ranking och CTR. Den ligger idag på position 26 med 1,1% CTR.

1. Title-tag: Testa en ny variant med siffror och USP:
   "Fönsterputs Stockholm — Från 499 kr | Boka med RUT-avdrag"

2. Meta description med emojis/symboler för att sticka ut:
   "✓ Professionell fönsterputs i Stockholm från 499 kr ✓ RUT-avdrag 50% ✓ Boka enkelt online. Vi putsar fönster i hela Stockholmsområdet."

3. Förbättra H1 till "Professionell fönsterputs i Stockholm"

4. Lägg till strukturerad data:
   - Organization schema
   - LocalBusiness med:
     * name, address, telephone
     * areaServed: lista alla stadsdelar ni täcker
     * priceRange
     * aggregateRating (om ni har)
   - BreadcrumbList

5. Förbättra intern länkning:
   - Skapa en "Områden vi täcker"-sektion med länkar till alla områdessidor
   - Länka till prissidan med ankartexten "Se våra priser"
   - Lägg till en "Senaste recensioner"-sektion

6. Kontrollera att sidan laddar snabbt:
   - Kolla bildstorlekar och komprimera vid behov
   - Kontrollera att lazy loading används för bilder under folden
   - Se till att kritisk CSS är inlinad

Visa alla ändringar.
```

---

## 6. Teknisk SEO — sajtövergripande

```
Gör en teknisk SEO-audit av hela sajten rutputs.nu. Kontrollera och åtgärda:

1. CRAWLING & INDEXERING:
   - Kontrollera robots.txt — tillåter den Googlebot att crawla alla viktiga sidor?
   - Verifiera att sitemap.xml finns, är korrekt och innehåller alla sidor
   - Kolla efter noindex-taggar som inte borde vara där
   - Sök efter brutna länkar (404:or)
   - Kontrollera canonical-taggar på varje sida

2. SIDSTRUKTUR:
   - Varje sida ska ha exakt EN H1
   - Heading-hierarki ska vara logisk (H1 > H2 > H3)
   - Inga tomma heading-taggar
   - Alla bilder ska ha alt-text

3. HASTIGHET:
   - Identifiera stora bilder som behöver komprimeras
   - Kolla att bilder använder moderna format (WebP)
   - Kontrollera om CSS/JS är minifierat
   - Verifiera att GZIP/Brotli-komprimering är aktiverat

4. MOBILVÄNLIGHET:
   - Kontrollera viewport meta-tag
   - Verifiera att inga element överlappar på mobil
   - Kolla touch-targets (minst 48x48px)

5. INTERN LÄNKNING:
   - Kartlägg alla interna länkar
   - Identifiera orphan pages (sidor utan interna länkar till dem)
   - Föreslå en optimal intern länkstruktur mellan alla sidor

Ge mig en rapport med alla findings sorterade efter prioritet (kritisk/medel/låg).
```

---

## 7. Innehållsstrategi — nya sökord att rikta in sig på

```
Baserat på att rutputs.nu rankar för "fönsterputs + [stadsdel]"-sökord, hjälp mig identifiera och skapa innehåll för nya sökmöjligheter.

1. Skapa en blogg/guide-sektion med artiklar som riktar sig mot informationella sökord:
   - "Hur ofta ska man putsa fönster?" (guide, 1500 ord)
   - "Putsa fönster själv vs anlita proffs — vad lönar sig?" (jämförelse, 1200 ord)
   - "RUT-avdrag för fönsterputs — så fungerar det [2026]" (guide, 1000 ord)
   - "Fönsterputs för bostadsrättsförening — komplett guide" (guide, 1500 ord)
   - "Bästa tiden att putsa fönster" (kort guide, 800 ord)

2. Varje artikel ska ha:
   - SEO-optimerad title och meta description
   - Tydlig H1 och underrubriker
   - FAQ-schema med 3-5 frågor
   - Intern länkning till prissidan och relevanta områdessidor
   - CTA i slutet som leder till bokning

3. Skapa en hub-sida (/guide eller /tips) som länkar till alla artiklar

4. Uppdatera startsidan med en "Tips & guider"-sektion som länkar till artiklarna

Börja med de två artiklar som troligen har högst sökvolym och visa mig dem.
```

---

## 8. Löpande övervakning

```
Skapa ett script (Node.js eller Python) som jag kan köra varje vecka för att:

1. Hämta data från Google Search Console API för rutputs.nu
2. Jämföra senaste 7 dagarnas data med föregående 7 dagar
3. Generera en rapport i markdown med:
   - Totalt antal klick, exponeringar, CTR och snittposition (med förändring i %)
   - Topp 20 sökfrågor sorterade efter exponeringar
   - Sökfrågor som ökat mest i exponeringar
   - Sökfrågor som tappat mest
   - Sidor som förbättrat sin position
   - Nya sökfrågor som dykt upp
4. Flagga sökfrågor på position 11-20 som "nära förstasidan"
5. Flagga sökfrågor med hög exponering men låg CTR

Spara rapporten som veckorapport-[datum].md

Använd Google Search Console API med service account-autentisering.
Visa mig hur jag konfigurerar API-åtkomsten steg för steg.
```

---

## Prioriteringsordning

| Prio | Åtgärd                          | Förväntad effekt               | Tidsåtgång |
| ---- | ------------------------------- | ------------------------------ | ---------- |
| 1    | Spånga & Bergshamra (pos 15-20) | Klick inom 1-2 veckor          | 1-2 timmar |
| 2    | Prissidan                       | Fånga prisrelaterade sökningar | 2-3 timmar |
| 3    | Startsidan                      | Förbättra övergripande ranking | 1-2 timmar |
| 4    | Bromma, Sollentuna, Täby        | Långsiktigt trafiklyft         | 3-4 timmar |
| 5    | Nya områdessidor                | Nya sökord                     | 3-4 timmar |
| 6    | Teknisk SEO                     | Grundläggande hälsa            | 2-3 timmar |
| 7    | Innehållsstrategi               | Bredare synlighet              | 5-8 timmar |
| 8    | Löpande övervakning             | Spåra framsteg                 | 1-2 timmar |
