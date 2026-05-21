# SEO — API-setup för rutputs.nu

## Google Search Console API (veckorapport)

### Förutsättningar

- [ ] **gcloud CLI** installerat — https://cloud.google.com/sdk/docs/install
- [ ] **Node.js ≥ 18** (redan installerat)
- [ ] Du är inloggad på det Google-konto som är kopplat till GSC för rutputs.nu

### Engångsinställning

1. **Autentisera med Application Default Credentials:**
   ```bash
   gcloud auth application-default login \
     --scopes=https://www.googleapis.com/auth/webmasters.readonly
   ```
   Webbläsaren öppnas — logga in med kontot som har GSC-åtkomst.

2. **Verifiera att kontot har åtkomst i GSC:**
   - Gå till [Google Search Console](https://search.google.com/search-console) → Inställningar → Användare och behörigheter
   - Ditt Google-konto ska ha minst **Begränsad** behörighet för `https://www.rutputs.nu`

3. **Aktivera Search Console API i Google Cloud:**
   - Gå till [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Enable APIs
   - Sök efter **Google Search Console API** och aktivera den
   - (Välj eller skapa ett projekt — projektet behöver inga roller, bara API:t aktiverat)

4. **Koppla ADC till rätt projekt** *(om du har flera Google Cloud-projekt):*
   ```bash
   gcloud config set project DITT_PROJEKT_ID
   ```

### Köra rapporten

```bash
npm run gsc-report
```

Rapporten sparas som `reports/veckorapport-YYYY-MM-DD.md`.

### Felsökning

- **"Could not load the default credentials"** → Kör steg 1 ovan igen
- **"Access Not Configured"** → Search Console API är inte aktiverat (steg 3)
- **403 Forbidden** → Ditt konto saknar GSC-behörighet (steg 2)
- **Inga rader i rapporten** → GSC har normalt 2–3 dagars fördröjning; data för igår saknas ofta

---

## Google Analytics 4 (framtida)

*Inte implementerat ännu — lägg till här om GA4 API:et kopplas in.*
