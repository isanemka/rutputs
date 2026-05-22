# SEO — API-setup för rutputs.nu

## Google Search Console API (veckorapport)

### Förutsättningar

- [ ] **gcloud CLI** installerat — https://cloud.google.com/sdk/docs/install
- [ ] **Node.js ≥ 18** (redan installerat)
- [ ] Du är inloggad på det Google-konto som är kopplat till GSC för rutputs.nu

### Engångsinställning

1. **Autentisera med Application Default Credentials:**

   ```bash
   gcloud auth login
   gcloud auth application-default login \
     --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly
   gcloud auth application-default set-quota-project rutputs
   ```

   Webbläsaren öppnas (två gånger) — logga in med kontot som har GSC-åtkomst.

2. **Verifiera att kontot har åtkomst i GSC:**

   - Gå till [Google Search Console](https://search.google.com/search-console) → Inställningar → Användare och behörigheter
   - Ditt Google-konto ska ha minst **Begränsad** behörighet för `https://www.rutputs.nu`

3. **Aktivera Search Console API i Google Cloud:**

   ```bash
   gcloud services enable searchconsole.googleapis.com --project=rutputs
   ```

4. **Egendomen i GSC är en domänegenskap** — använd `sc-domain:`-formatet:

   ```bash
   # Standard (inget behövs om du inte ändrat GSC_SITE_URL)
   npm run gsc-report
   # Explicit:
   GSC_SITE_URL=sc-domain:rutputs.nu npm run gsc-report
   ```

### Köra rapporten

```bash
npm run gsc-report
```

Rapporten sparas som `reports/veckorapport-YYYY-MM-DD.md`.

### Felsökning

- **"Could not load the default credentials"** → Kör steg 1 ovan igen
- **"requires a quota project"** → Kör `gcloud auth application-default set-quota-project rutputs`
- **"Access Not Configured"** → Search Console API är inte aktiverat (steg 3)
- **403 Forbidden / "User does not have sufficient permission"** → Fel konto eller fel URL-format; kontrollera att `sc-domain:rutputs.nu` används
- **Inga rader i rapporten** → GSC har normalt 2–3 dagars fördröjning; data för igår saknas ofta

---

## Google Analytics 4 (framtida)

_Inte implementerat ännu — lägg till här om GA4 API:et kopplas in._
