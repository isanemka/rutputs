# Checklista – Konfigurera trafik- och leadsspårning

Den här listan går igenom allt du behöver göra själv för att de tekniska
ändringarna ska börja generera leads och mätbar trafik. Bocka av i den
ordningen punkterna är listade.

---

## 1. Vercel – Environment Variables

Gå till **Vercel → Project (rutputs) → Settings → Environment Variables**
och lägg till följande för både `Production`, `Preview` och `Development`:

| Variabel | Värde | Var hittar du det? |
|---|---|---|
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics → Admin → Datastreams → Webb → Mätnings-ID |
| `VITE_GOOGLE_ADS_ID` | `AW-XXXXXXXXXX` | Google Ads → Verktyg → Konverteringar → klicka på din konverterings­åtgärd → "Installera taggen" |
| `VITE_GOOGLE_ADS_LEAD_LABEL` | `AbC-D_efGhIj` | Lead-konverteringens label (samma som `VITE_GOOGLE_ADS_CONVERSION_LABEL` om du bara har en) |
| `VITE_GOOGLE_ADS_PHONE_LABEL` | `XyZ-1_qrStuV` | Telefonklick-konverteringens label |
| `VITE_META_PIXEL_ID` | `1234567890123456` | Meta Events Manager → Datakällor → din pixel → Inställningar |
| `VITE_CLARITY_ID` | `xxxxxxxxxx` | clarity.microsoft.com → ditt projekt → Settings → Setup → "Tag" |

> **OBS:** Klicka `Redeploy` efter att variabler lagts till – de bakas in vid build-tid.

- [ ] Alla variabler tillagda i Vercel
- [ ] Sidan ny-deployad efter att variablerna lades till

---

## 2. Google Analytics 4 (GA4)

Du har redan `G-5SEKFW68XH` som default i koden. Kontrollera att:

- [ ] GA4-egendomen finns och har en aktiv data-stream för `www.rutputs.nu`
- [ ] **Markera följande events som "Conversion"** i GA4 → Admin → Events:
  - `lead_submit`
  - `conversion_lead`
  - `conversion_phone_call`
  - `phone_click`
- [ ] Verifiera att events kommer in i GA4 (DebugView), gör en testbokning från mobilen efter deploy

---

## 3. Google Search Console

- [ ] Verifiera ägarskapet av `rutputs.nu` (DNS-record eller Google Tag, finns under Settings → Ownership verification)
- [ ] Skicka in sitemap: `https://www.rutputs.nu/sitemap.xml`
- [ ] Begär indexering av de **8 nya områdessidorna**:
  - `/omrade/vallingby`, `/omrade/hasselby`, `/omrade/danderyd`,
    `/omrade/kungsholmen`, `/omrade/norrmalm`, `/omrade/bromsten`,
    `/omrade/nacka`, `/omrade/upplands-vasby`
- [ ] Begär indexering av de **5 nya tjänstesidorna**:
  - `/tjanst/villa-fonsterputs`
  - `/tjanst/lagenhet-fonsterputs`
  - `/tjanst/abonnemang-fonsterputs`
  - `/tjanst/varputs`
  - `/tjanst/hostputs`
- [ ] Kontrollera Coverage-rapporten 7-14 dagar efter att se att alla nya URL:er är indexerade

---

## 4. Google Ads – Konverteringsspårning

Du har redan ett Google Ads-konto. Konfigurera så här:

- [ ] Skapa konverteringsåtgärden **"Lead"**
  - Verktyg → Konverteringar → Ny konverteringsåtgärd → Webbplats
  - Kategori: **Skicka in lead-formulär**
  - Värde: `499 SEK` (eller "Använd olika värden för varje konvertering")
  - Räkning: **En** (per klick)
  - Konverteringsfönster: 30 dagar
  - Installationsmetod: **Google Tag** (taggen triggas via gtag som redan finns på sidan, du behöver inte klistra in scriptet manuellt)
- [ ] Skapa konverteringsåtgärden **"Telefonklick"** (samma flöde, kategori: "Telefonsamtal från klick på webbplats")
- [ ] Kopiera `AW-XXXXXXXXXX` (Conversion ID) till `VITE_GOOGLE_ADS_ID`
- [ ] Kopiera Lead-konverteringens label till `VITE_GOOGLE_ADS_LEAD_LABEL`
- [ ] Kopiera Telefonklick-konverteringens label till `VITE_GOOGLE_ADS_PHONE_LABEL`
- [ ] Testa med Google Tag Assistant att taggen triggas när du gör en testbokning
- [ ] Markera "Lead"-konverteringen som primär i den kampanj du kör

---

## 5. Meta (Facebook) Ads & Pixel

- [ ] Skapa en **Pixel** i Meta Events Manager om du inte redan har en
- [ ] Kopiera Pixel-ID till `VITE_META_PIXEL_ID` i Vercel
- [ ] Konfigurera "Lead" som en **Konfigurerad händelse** (Aggregated Event Measurement) – krävs för iOS-spårning
- [ ] Använd Meta Pixel Helper (Chrome-tillägg) för att verifiera att pixeln laddas på sidan och att `Lead`-event triggas på `/bekraftelse`
- [ ] I dina Meta-kampanjer: byt mål till **"Leads"** och välj din pixel-konverteringshändelse som optimeringspunkt

---

## 6. Google Business Profile (GBP)

Du har redan en profil med recensioner. Maxa den så här:

- [ ] **Lägg till foton** – före/efter-bilder från jobb är guld (siktar på 10+ bilder)
- [ ] **Lägg till tjänster** under "Tjänster" – matchar dina nya sidor: Villa-fönsterputs, Lägenhets-fönsterputs, Abonnemang, Företagsfönsterputs
- [ ] **Lägg till områden du täcker** under "Serviceområde" – inkludera alla 18 områden (de matchar dina landningssidor)
- [ ] **Lägg upp ett inlägg per vecka** (sektionen "Uppdateringar") – t.ex. "Bokar in maj-tider i Bromma och Solna nu"
- [ ] **Skapa en kort URL** för att be kunder lämna recensioner – gå till [Google Business Profile](https://business.google.com) → "Be om recensioner" för att hämta din direktlänk
- [ ] Skicka SMS-länk till de senaste 10 nöjda kunderna och be om en recension (mål: 20+ recensioner ger fetare rich snippets)

**När du har riktiga recensioner:** Uppdatera `src/data/reviews.ts` med
faktiska citat, författarnamn (förnamn + efternamnsbokstav), datum och
sätt `aggregateRating` och `reviewCount` till de verkliga värdena. Sätt
också `googleBusinessUrl` till din GBP-länk.

---

## 7. Microsoft Clarity (heatmaps + session replay – gratis)

Detta är inte ett måste men ger dig superinsikt om var folk klickar.

- [ ] Skapa konto på `clarity.microsoft.com` (gratis, inget kreditkort krävs)
- [ ] Skapa projekt → kopiera projekt-ID
- [ ] Lägg in i `VITE_CLARITY_ID` i Vercel
- [ ] Efter deploy: gå in i Clarity-dashboarden efter 24h och titta på:
  - Vilka knappar som klickas mest
  - Var folk skrollar bort
  - Var de fastnar i prisformuläret

---

## 8. Kvalitetstest efter deploy

När allt är deployat – kör igenom denna lista innan du startar annonser:

- [ ] Öppna `https://www.rutputs.nu/omrade/vallingby` i inkognitofönster och se att den laddar med rätt title (titta i flik-baren)
- [ ] Kör `https://www.rutputs.nu/sitemap.xml` – skall innehålla 27 URL:er
- [ ] Kör en URL genom Googles **Rich Results Test** (https://search.google.com/test/rich-results) – ska visa LocalBusiness, Service, FAQPage och BreadcrumbList
- [ ] Kör startsidan genom **PageSpeed Insights** – sikta på ≥90 på mobil
- [ ] Acceptera cookies på sidan och kolla i DevTools → Network att `gtag/js`, `fbevents.js` och `clarity.ms/tag` laddar
- [ ] Gör en testbokning hela vägen igenom till `/bekraftelse` och verifiera:
  - GA4 DebugView visar `conversion_lead`
  - Meta Pixel Helper visar `Lead`-event
  - Google Ads → Konverteringar visar "Senaste aktivitet" inom 3 timmar

---

## 9. Annons-budget (förslag på start)

Du behöver inte alla samtidigt – välj 1-2 att börja med.

| Kanal | Mål | Föreslagen start-budget | Tips |
|---|---|---|---|
| Google Search Ads | Hetaste söktrafik | 100 kr/dag | Sökord: `fönsterputs [område]`, `fönsterputs RUT`, `fönsterputs villa stockholm`. Använd dina nya områdessidor som landningssidor – matcha sökord mot område. |
| Google Performance Max | Bred täckning | 75-150 kr/dag | Slå på efter att du har minst 30 konverteringar registrerade i kontot (annars hittar algoritmen inte mönstret) |
| Meta Lead Ads | Lead med låg friktion | 75 kr/dag | Använd "Lead"-mål, koppla pixeln. Bilder från riktiga jobb fungerar bäst. |
| Google Local Services Ads | Verifierade leads | Per-lead-pris | Kräver bakgrundskontroll men ger högkvalitativa leads, värt att ansöka |

---

## 10. Off-page SEO (gör en sak per vecka)

- [ ] Lägg upp Rutputs på **hitta.se** (gratis grundkonto)
- [ ] Lägg upp på **eniro.se**
- [ ] Lägg upp på **reco.se** – be befintliga kunder lämna recension där också
- [ ] Skapa profil på **offerta.se** eller **byggstart.se** för extra leadsflöde
- [ ] Skriv ett kort gästinlägg / länksamarbete med en lokal städfirma i Stockholm – be om en länk till `rutputs.nu` i utbyte mot att du länkar till dem

---

## 11. Framtida förbättringar (när du har tid eller vill betala för det)

Saker som inte är gjorda än men ger ytterligare lyft:

- **Förenklad steg 1 i prisformuläret** – minska antalet fält i första steget till 1-2 så att fler börjar
- **Exit-intent-popup** – när användaren rör musen mot fliken på desktop: "Vänta! Få 10 % rabatt om du lämnar e-post"
- **Bloggsektion** – guideartiklar som "När är bäst att putsa fönstren?" och "Så fungerar RUT-avdraget för fönsterputs" → fångar long-tail-trafik
- **Recensionsautomatik** – SMS-länk till kunden 2 dagar efter avslutat jobb med direktlänk till Google-recension

---

## Behöver du hjälp med något av detta?
Fråga bara, så fixar jag eller går igenom det med dig steg-för-steg.
