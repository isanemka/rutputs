# Guide-backlog

Prioriterad lista med guide-ämnen att producera (~1 varannan vecka). Varje ämne
har en föreslagen slug och målssökfras. Bocka av när guiden är publicerad.

## Arbetsflöde

1. `npm run guide:new -- "Ämnet"` (sätt `OPENAI_API_KEY` för LLM-ifyllt utkast).
2. Granska/redigera utkastet i `src/data/_drafts/<slug>.ts` — fakta, RUT-belopp,
   ton, interna länkar.
3. `npm run guide:publish -- <slug>` flyttar in det i `guides-content.js`
   (formaterar filen automatiskt).
4. `npm run guide:image -- <slug>` genererar delningsbild (OG + IG-kvadrat) via
   OpenAI till `public/og/`. Kräver `OPENAI_API_KEY`. Granska bilden.
5. `npm run build`, granska `/guide/<slug>`, committa (inkl. bilderna).

---

## Pris & ekonomi

- [ ] **Vad kostar fönsterputsning i Stockholm?** — `vad-kostar-fonsterputsning-stockholm` — _"vad kostar fönsterputsning"_
- [ ] **RUT-avdrag: vem får använda det och hur mycket?** — `rut-avdrag-vem-far-anvanda` — _"rut avdrag vem får använda"_

## Skötsel & tips

- [ ] **Hur putsar man fönster utan ränder?** — `putsa-fonster-utan-rander` — _"putsa fönster utan ränder"_
- [ ] **Bästa tiden på året att putsa fönster** — `basta-tiden-putsa-fonster` — _"bästa tiden att putsa fönster"_
- [ ] **Putsa inglasad balkong – guide** — `putsa-inglasad-balkong` — _"putsa inglasad balkong"_
- [ ] **Putsa spröjsade och gamla fönster** — `putsa-sprojsade-fonster` — _"putsa spröjsade fönster"_
- [ ] **Miljövänlig fönsterputs – metoder och medel** — `miljovanlig-fonsterputs` — _"miljövänlig fönsterputs"_
- [ ] **Checklista inför fönsterputsarens besök** — `checklista-infor-fonsterputs` — _"förbereda inför fönsterputs"_

## Säsong

- [ ] **Fönsterputs inför vintern – höstcheck** — `fonsterputs-infor-vintern` — _"fönsterputs inför vintern"_

## Jämförelser

- [ ] **Putsa fönster själv eller anlita proffs?** — `putsa-fonster-sjalv-eller-proffs` — _"putsa fönster själv eller anlita"_
- [ ] **Fönsterputs i innerstaden vs förort** — `fonsterputs-innerstad-vs-forort` — _"fönsterputs stockholm innerstad"_

## Företag

- [ ] **Fönsterputs för bostadsrättsförening** — `fonsterputs-brf` — _"fönsterputs brf"_
- [ ] **Hur ofta ska företag putsa skyltfönster?** — `hur-ofta-putsa-skyltfonster` — _"hur ofta putsa skyltfönster"_

---

## Redan publicerade (skriv inte dubbletter)

- `hur-ofta-ska-man-putsa-fonster`
- `rut-avdrag-fonsterputs-2026`
