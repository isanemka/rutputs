// Area pages (/omrade/:slug). Each area has its own copy about local housing,
// districts and practical tips, so the pages are not just the same template
// with a new place name. The page title comes from a template in
// site-pages.js; prices come from prices.js (priceRows picks the rows shown).
//
// Fields:
//   prep         'på' for areas written "på Östermalm" (default "i")
//   updatedAt    becomes <lastmod> in sitemap.xml – bump on content changes
//   content      hero lead
//   housing      paragraphs about local homes and windows
//   districts    [{ name, text }] – also used as areaServed in JSON-LD
//   tips         paragraphs with local, practical advice
//   priceRows    rows from prices.js, most relevant first
//   priceNote    what a typical home in the area costs
//   services     service slugs to link; company: true adds /foretag
//   guides       guide slugs to link
//   nearbyAreas  neighbouring area pages
//   faq          area-specific questions (also FAQPage JSON-LD)

const UPDATED = '2026-10-31';

const areas = [
  {
    slug: 'jarfalla',
    name: 'Järfälla',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Järfälla från 499 kr efter RUT-avdrag. Villor, radhus och lägenheter i Jakobsberg, Barkarby och Skälby. Begär en gratis offert.',
    content:
      'Järfälla har allt från villakvarter i Skälby och Viksjö till flerbostadshus i Jakobsberg och helt nya kvarter i Barkarbystaden. Vi putsar fönster i hela kommunen – i lägenheter, radhus, villor och lokaler – med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Bostäderna i Järfälla är blandade. Runt Jakobsbergs centrum dominerar flerbostadshus från 1960- och 70-talen, med stora vardagsrumsfönster och balkonger som ofta är inglasade. I Barkarbystaden har de nya husen stora glaspartier och fönster från golv till tak, som blir smutsiga snabbt i ett område där det fortfarande byggs.',
      'I villa- och radhusområdena, som Skälby, Viksjö och Kallhäll, är det vanligt med spröjsade fönster, altandörrar och uterum. Där tar vi med stege och putsar även fönstren på övervåningen som är svåra att nå själv.',
    ],
    districts: [
      { name: 'Jakobsberg', text: 'Lägenheter och radhus runt centrum och pendeltågsstationen, ofta med inglasade balkonger.' },
      { name: 'Barkarby', text: 'Nya flerbostadshus i Barkarbystaden med stora glaspartier, där byggdamm gör att fönstren behöver putsas oftare.' },
      { name: 'Skälby', text: 'Villakvarter och radhus med trädgårdar, ofta med spröjs och altanpartier.' },
    ],
    tips: [
      'Pollen från björk och tall lägger sig på rutorna på våren, och i områden där det byggs – som Barkarby – kommer byggdamm ovanpå det. Många i Järfälla väljer därför att putsa både vår och höst.',
      'Har du flyttat in i en nyproduktion kan det vara bra att vänta med en grundlig putsning tills byggarbetena närmast ditt hus är klara, annars kommer dammet snabbt tillbaka.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'I Järfälla putsar vi både lägenheter och hus. En tvåa i Jakobsberg kostar oftast 499–799 kr efter RUT-avdrag, medan en villa i Skälby eller Viksjö brukar hamna på 800–2 000 kr beroende på antal fönster och spröjs.',
    services: ['lagenhet-fonsterputs', 'villa-fonsterputs', 'abonnemang-fonsterputs'],
    company: true,
    guides: ['hur-ofta-ska-man-putsa-fonster', 'hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Viksjö', slug: 'viksjo' },
      { name: 'Kallhäll', slug: 'kallhall' },
      { name: 'Veddesta', slug: 'veddesta' },
      { name: 'Hässelby', slug: 'hasselby' },
      { name: 'Sollentuna', slug: 'sollentuna' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Järfälla?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en villa 800–2 000 kr. Du får ett fast pris i offerten utifrån antal fönster och vad som ska putsas.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni fönster i nybyggda lägenheter i Barkarbystaden?',
        answer:
          'Ja. Nya hus har ofta stora glaspartier och fönster som inte går att vända inåt. Vi putsar dem inifrån, från balkongen eller med teleskopskaft där det går att göra säkert.',
      },
      {
        question: 'Kan ni putsa inglasade balkonger i Jakobsberg?',
        answer:
          'Ja, vi putsar balkongglasen på både in- och utsida så långt partierna går att öppna. Ange i förfrågan att du har inglasad balkong så tar vi med det i priset.',
        linkLabel: 'Så tvättar man inglasade balkonger',
        linkTo: '/guide/hur-tvattar-man-inglasade-balkonger',
      },
      {
        question: 'Putsar ni villor och radhus i Skälby?',
        answer:
          'Ja, vi putsar alla fönster, även spröjsade och de på övervåningen. Vill du slippa boka varje gång kan du ha ett abonnemang med putsning vår och höst.',
        linkLabel: 'Läs om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
    ],
  },
  {
    slug: 'viksjo',
    name: 'Viksjö',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Viksjö från 499 kr efter RUT-avdrag. Vi putsar villor och radhus i hela Viksjö, nära Jakobsberg. Begär en gratis offert idag.',
    content:
      'Viksjö är ett av Järfällas största villa- och radhusområden, byggt till stor del på 1970-talet med mycket grönska och nära Görvälns naturreservat. Vi putsar fönster i villor, radhus och lägenheter i hela Viksjö, med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Bebyggelsen i Viksjö är till stor del radhus, kedjehus och villor från 1970-talet. Husen har ofta stora fönsterpartier mot trädgården, altandörrar och fönster i två plan. Många har bytt till nyare fönster, men det finns också gott om äldre kopplade fönster som behöver putsas mellan glasen.',
      'Runt Viksjö centrum finns även flerbostadshus med lägenheter och balkonger. Där putsar vi lägenhetsfönster och inglasade balkonger på samma sätt som i övriga Järfälla.',
    ],
    districts: [
      { name: 'Viksjö centrum', text: 'Lägenheter och radhus närmast centrum, med balkonger och uteplatser.' },
      { name: 'Görväln', text: 'Villor och hus nära Mälaren och naturreservatet, där fönster mot vattnet får mer väder.' },
      { name: 'Jakobsberg', text: 'Grannområdet mot pendeltåget, med lägenheter, radhus och villor.' },
    ],
    tips: [
      'Viksjö är grönt, och träd nära husen gör att fönstren får mer pollen, kåda och fågelspillning än i stan. Fönster som vetter mot skog får ofta ett tunt grått lager under hösten.',
      'Många radhusägare bokar därför en putsning på våren och en på hösten, gärna tillsammans med grannen – när ni bokar samma dag får ni båda rabatt.',
      'Radhusen i Viksjö har ofta samma fönster i hela längan, så det är lätt att ge ett tydligt pris. Räkna fönsterbågarna en gång när du fyller i formuläret, så är det enkelt att boka igen nästa säsong. Med abonnemang slipper du dessutom komma ihåg när det är dags.',
    ],
    priceRows: ['house', 'apartmentLarge', 'apartmentSmall'],
    priceNote:
      'De flesta hem i Viksjö är radhus eller villor, och där landar priset oftast på 800–2 000 kr efter RUT-avdrag. Ett mindre radhus med få fönster hamnar i den lägre delen av spannet.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'varputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Järfälla', slug: 'jarfalla' },
      { name: 'Kallhäll', slug: 'kallhall' },
      { name: 'Veddesta', slug: 'veddesta' },
      { name: 'Hässelby', slug: 'hasselby' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för ett radhus i Viksjö?',
        answer:
          'Ett radhus eller en villa kostar oftast 800–2 000 kr efter RUT-avdrag, beroende på hur många fönster och hur mycket spröjs huset har. En lägenhet kostar från 499 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni mellan glasen i äldre kopplade fönster?',
        answer:
          'Ja. Många hus i Viksjö har kvar fönster där innerbågen kan öppnas. Välj ”Utsida + insida + mellan” i formuläret så ingår mellanrutorna.',
      },
      {
        question: 'Kan vi boka tillsammans med grannarna i radhuslängan?',
        answer:
          'Ja, när du och en granne bokar samma dag får ni båda rabatt. Skriv grannens adress i meddelandet så planerar vi ett gemensamt besök.',
      },
      {
        question: 'Hur ofta behöver man putsa fönster i ett hus nära skogen?',
        answer:
          'Två gånger om året räcker för de flesta: på våren efter pollensäsongen och på hösten innan mörkret. Fönster som vetter mot skog kan behöva putsas lite oftare.',
        linkLabel: 'Hur ofta ska man putsa fönster?',
        linkTo: '/guide/hur-ofta-ska-man-putsa-fonster',
      },
    ],
  },
  {
    slug: 'kallhall',
    name: 'Kallhäll',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Kallhäll från 499 kr efter RUT-avdrag. För villor, radhus och lägenheter i Kallhäll och Stäket. Begär en gratis offert idag.',
    content:
      'Kallhäll ligger i norra Järfälla mot Mälaren, med villor och radhus närmast vattnet och lägenheter nära pendeltågsstationen. Vi putsar fönster i hela Kallhäll och Stäket, med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Runt Kallhälls station och centrum finns flerbostadshus med hyres- och bostadsrätter, medan villor och radhus tar över längre ut mot Mälaren och Stäket. Husen nära vattnet har ofta stora fönster för utsikten, och de fönstren är också de som utsätts mest för väder och vind.',
      'I villaområdena är det vanligt med spröjsade fönster, burspråk och fönster på övervåningen. Vi har med stege och kan putsa fönster som är svåra att nå själv, både ut- och insida.',
    ],
    districts: [
      { name: 'Kallhäll centrum', text: 'Lägenheter nära pendeltåget, ofta med balkong eller inglasad balkong.' },
      { name: 'Stäket', text: 'Villor nära Mälaren med stora fönster mot vattnet.' },
    ],
    tips: [
      'Fönster som vetter mot Mälaren får ofta mer vattenfläckar och smuts från regn och blåst, särskilt under hösten. Ett bra upplägg är att putsa efter pollensäsongen i maj och igen i september, så har du rena fönster när ljuset är som lägst.',
      'Bor du i lägenhet nära stationen kan damm från trafik och spår synas på rutorna, och då ger det mycket att putsa utsidan lite oftare än insidan.',
      'Har du ett fritidshus eller en sjöstuga nära Mälaren kan RUT-avdraget användas även där, så länge det är ditt eget fritidshus. Vi kan ta med det i samma offert som villan, så att båda putsas vid samma tillfälle.',
    ],
    priceRows: ['house', 'apartmentSmall', 'apartmentLarge'],
    priceNote:
      'I Kallhäll putsar vi både villor och lägenheter. En villa nära Mälaren kostar oftast 800–2 000 kr efter RUT-avdrag och en lägenhet nära stationen från 499 kr.',
    services: ['villa-fonsterputs', 'lagenhet-fonsterputs', 'hostputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'hur-tvattar-man-inglasade-balkonger'],
    nearbyAreas: [
      { name: 'Järfälla', slug: 'jarfalla' },
      { name: 'Viksjö', slug: 'viksjo' },
      { name: 'Veddesta', slug: 'veddesta' },
      { name: 'Upplands Väsby', slug: 'upplands-vasby' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Kallhäll?',
        answer:
          'En lägenhet kostar oftast 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok efter RUT-avdrag. En villa kostar oftast 800–2 000 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni stora fönster mot Mälaren?',
        answer:
          'Ja, panoramafönster och glaspartier mot sjön putsar vi på både in- och utsida. Ange gärna ungefärlig storlek i förfrågan så blir offerten rätt direkt.',
      },
      {
        question: 'Kan ni putsa fönster på övervåningen om jag inte har en egen stege?',
        answer:
          'Ja, vi har med oss stege och all utrustning. Du behöver bara se till att vi kommer fram till fönstren.',
      },
      {
        question: 'När är bästa tiden att putsa fönster i Kallhäll?',
        answer:
          'Många bokar i april–maj när pollen har lagt sig och i september–oktober inför vintern. Det går också bra att boka vid andra tider på året.',
        linkLabel: 'Höstputs av fönster',
        linkTo: '/tjanst/hostputs',
      },
    ],
  },
  {
    slug: 'veddesta',
    name: 'Veddesta',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Veddesta, Järfälla. Skyltfönster och kontor för företag, och lägenheter från 499 kr efter RUT-avdrag för privatpersoner. Begär offert.',
    content:
      'Veddesta är Järfällas stora verksamhetsområde mellan Jakobsberg och Barkarby. Vi putsar skyltfönster, kontorsfönster och entréer åt företag i Veddesta, och fönster i lägenheter och hus i bostadskvarteren runt omkring – med RUT-avdrag för privatpersoner.',
    housing: [
      'I Veddesta finns kontor, butiker, bilhallar, lager och verkstäder, ofta med stora glaspartier mot gatan. Rena skyltfönster och entréer gör stor skillnad för hur en verksamhet uppfattas, och för många företag passar ett återkommande upplägg med fasta intervall.',
      'Runt Veddesta finns också bostäder, och närmast Barkarby och Jakobsberg växer nya flerbostadshus fram. För privatpersoner putsar vi lägenhetsfönster och inglasade balkonger med RUT-avdrag, precis som i övriga Järfälla.',
    ],
    districts: [
      { name: 'Veddesta', text: 'Verksamhetsområdet med kontor, butiker och lager – vi putsar skyltfönster och entréer.' },
      { name: 'Barkarby', text: 'Nya bostadskvarter och handel nära Barkarby station.' },
      { name: 'Jakobsberg', text: 'Lägenheter och radhus på andra sidan, nära pendeltåget.' },
    ],
    tips: [
      'Verksamheter längs de större vägarna får snabbt ett lager av vägdamm på fönstren, särskilt under vintern när det saltas och sandas. För butiker och bilhallar brukar det löna sig att putsa skyltfönstren oftare än övriga fönster.',
      'Berätta vilka fönster som är viktigast för er, så lägger vi upp intervallen efter det. För privatpersoner i nybyggda hus kan det behövas en extra putsning det första året, när byggdammet fortfarande lägger sig.',
      'För företag kan putsningen planeras till en tid när den stör kunderna minst, till exempel tidigt på dagen. Säg till vilka tider som passar och om det finns larm eller nycklar vi behöver känna till. Har ni flera lokaler i området kan vi lägga upp samma intervall för alla.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'Företag får en offert utifrån lokalens fönster och hur ofta de ska putsas – RUT-avdrag gäller inte för företag. För privatpersoner kostar en lägenhet på 1–2 rok oftast 499–799 kr efter RUT-avdrag.',
    services: ['abonnemang-fonsterputs', 'lagenhet-fonsterputs'],
    company: true,
    guides: ['rut-avdrag-fonsterputs-2026', 'hur-tvattar-man-inglasade-balkonger'],
    nearbyAreas: [
      { name: 'Järfälla', slug: 'jarfalla' },
      { name: 'Viksjö', slug: 'viksjo' },
      { name: 'Kallhäll', slug: 'kallhall' },
      { name: 'Kista', slug: 'kista' },
    ],
    faq: [
      {
        question: 'Putsar ni skyltfönster för företag i Veddesta?',
        answer:
          'Ja, vi putsar skyltfönster, entrédörrar och kontorsfönster åt företag i Veddesta. Du kan välja enstaka putsningar eller ett återkommande upplägg.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
      {
        question: 'Gäller RUT-avdraget för företag?',
        answer:
          'Nej, RUT-avdrag gäller bara privatpersoner. Företag får en offert utan RUT-avdrag.',
      },
      {
        question: 'Vad kostar fönsterputs för en lägenhet nära Veddesta?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Kan ni putsa höga glaspartier på lokaler?',
        answer:
          'Vi putsar glaspartier som går att nå säkert från marken eller med stege. Berätta hur höga fönstren är i förfrågan, så återkommer vi med hur vi kan lösa det.',
      },
    ],
  },
  {
    slug: 'bromma',
    name: 'Bromma',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Bromma från 499 kr efter RUT-avdrag. Villor och radhus i Äppelviken, Ålsten, Nockeby och Abrahamsberg. Begär en gratis offert.',
    content:
      'Bromma är villastäder som Äppelviken, Ålsten och Södra Ängby, men också lägenheter i Abrahamsberg och Traneberg. Vi putsar fönster i hela Bromma – från spröjsade villor från tidigt 1900-tal till moderna radhus – med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Många av Brommas villor byggdes under första halvan av 1900-talet, i trädgårdsstäder som Äppelviken, Smedslätten, Nockeby och Ålsten. Husen har ofta spröjsade fönster, verandor, burspråk och kopplade fönster med innerbågar. Det tar längre tid att putsa än moderna fönster, men det är också där skillnaden syns mest. I Södra Ängby finns funkisvillor från 1930-talet med stora fönsterpartier.',
      'I Abrahamsberg, Traneberg, Alvik och Blackeberg är det i stället lamellhus och lägenheter med balkonger som dominerar. Där putsar vi lägenhetsfönster och inglasade balkonger till samma fasta priser som i övriga Stockholm.',
    ],
    districts: [
      { name: 'Äppelviken', text: 'Villor i trädgårdsstad nära Mälaren, ofta med spröjsade och kopplade fönster.' },
      { name: 'Abrahamsberg', text: 'Lamellhus och bostadsrätter med balkonger mot gröna gårdar.' },
      { name: 'Nockeby', text: 'Villor och radhus längs Nockebybanan, med stora trädgårdar och många fönster.' },
      { name: 'Ålsten', text: 'Villor nära vattnet med burspråk, verandor och fönster på flera våningar.' },
    ],
    tips: [
      'Gamla trädgårdar betyder stora träd, och i Bromma lägger sig pollen, löv och kåda på rutorna tidigt på våren. Längs de stora lederna, som Drottningholmsvägen och Bergslagsvägen, får fönster mot gatan dessutom en hinna av vägdamm.',
      'Har ditt hus spröjsade fönster eller innerbågar, nämn det i förfrågan – då blir offerten rätt från början och vi vet hur lång tid vi ska planera in.',
    ],
    priceRows: ['house', 'apartmentLarge', 'apartmentSmall'],
    priceNote:
      'En villa i Bromma kostar oftast 800–2 000 kr efter RUT-avdrag. Äldre villor med många spröjsade fönster och innerbågar hamnar i den övre delen av spannet. En lägenhet i Abrahamsberg eller Traneberg kostar från 499 kr.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'lagenhet-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026', 'hur-tvattar-man-inglasade-balkonger'],
    nearbyAreas: [
      { name: 'Kungsholmen', slug: 'kungsholmen' },
      { name: 'Vällingby', slug: 'vallingby' },
      { name: 'Sundbyberg', slug: 'sundbyberg' },
      { name: 'Bromsten', slug: 'bromsten' },
      { name: 'Solna', slug: 'solna' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en villa i Bromma?',
        answer:
          'En normalstor villa kostar oftast 800–2 000 kr efter RUT-avdrag. Antal fönster, spröjs och om du vill ha putsat mellan glasen avgör var i spannet du hamnar.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Putsar ni spröjsade fönster i äldre villor?',
        answer:
          'Ja. Vi putsar runt varje ruta och tar med spröjsen i offerten, så du vet priset innan vi kommer.',
      },
      {
        question: 'Kan ni putsa kopplade fönster med innerbågar?',
        answer:
          'Ja, vi öppnar innerbågen och putsar alla fyra glassidorna. Välj ”Utsida + insida + mellan” i formuläret så ingår det.',
      },
      {
        question: 'Putsar ni lägenheter i Abrahamsberg och Traneberg?',
        answer:
          'Ja, en lägenhet på 1–2 rok kostar oftast 499–799 kr och en på 3–4 rok 699–1 199 kr efter RUT-avdrag.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
    ],
  },
  {
    slug: 'bromsten',
    name: 'Bromsten',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Bromsten från 499 kr efter RUT-avdrag. Villor och radhus i Bromsten, Sundby och Solhem i Spånga. Begär en gratis offert idag.',
    content:
      'Bromsten är en lugn villastad i Spånga med egnahem, radhus och stora trädgårdar. Vi putsar fönster i villor och radhus i hela Bromsten, Solhem, Flysta och Sundby – med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Bromsten växte fram som egnahemsområde i början av 1900-talet, och här finns fortfarande många äldre trävillor med spröjsade fönster, glasverandor och små fönster på vinden. Mellan dem har det byggts nyare villor och radhus med större glaspartier och altandörrar.',
      'Den blandningen gör att två hus på samma gata kan ta helt olika lång tid att putsa. Därför räknar vi alltid på just dina fönster i stället för att ge ett schablonpris.',
    ],
    districts: [
      { name: 'Bromsten', text: 'Egnahem och villor från början av 1900-talet, ofta med spröjs och glasveranda.' },
      { name: 'Solhem', text: 'Villakvarter nära Spånga station med blandning av äldre och nyare hus.' },
      { name: 'Flysta', text: 'Villor och radhus med trädgårdar och många fönster mot tomten.' },
      { name: 'Sundby', text: 'Mindre villaområde med egnahem och nyare hus.' },
    ],
    tips: [
      'Äldre trävillor har ofta fönster med gammalt glas och kittade rutor som är känsliga. Vi putsar dem varsamt, lägger inget tryck på lösa rutor och säger till om vi ser skador innan vi börjar.',
      'Med många träd i trädgårdarna kommer pollen och löv tidigt, så en vårputs i maj och en höstputs efter lövfällningen ger bäst resultat.',
      'Många villor i Bromsten har byggts till med nya fönster i tillbyggnaden men har kvar de gamla fönstren i den ursprungliga delen. Då blandas moderna, lättputsade fönster med äldre bågar som måste öppnas och putsas mellan glasen. Beskriv gärna båda delarna i förfrågan, så blir offerten rätt från början.',
    ],
    priceRows: ['house', 'apartmentLarge'],
    priceNote:
      'Bromsten består nästan bara av villor och radhus, och där hamnar priset oftast på 800–2 000 kr efter RUT-avdrag. En äldre villa med många spröjsade rutor ligger i den övre delen av spannet.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'varputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Spånga', slug: 'spanga' },
      { name: 'Vällingby', slug: 'vallingby' },
      { name: 'Hässelby', slug: 'hasselby' },
      { name: 'Bromma', slug: 'bromma' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en villa i Bromsten?',
        answer:
          'En villa eller ett radhus kostar oftast 800–2 000 kr efter RUT-avdrag. Spröjs, glasveranda och fönster på vinden påverkar var i spannet du hamnar.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Kan ni putsa glasverandor?',
        answer:
          'Ja, glasverandor och uterum putsar vi på både in- och utsida. Ta med verandan i förfrågan, gärna med ungefärlig storlek.',
      },
      {
        question: 'Är ni försiktiga med gamla fönster?',
        answer:
          'Ja. Vi rengör varsamt och lägger inte tryck på lösa rutor eller gammalt kitt. Ser vi skador säger vi till innan vi börjar.',
      },
      {
        question: 'När ska jag boka höstputs i Bromsten?',
        answer:
          'Bäst är efter lövfällningen, i oktober. Då slipper du löv och pollen som fastnar på nyputsade fönster, och rutorna är rena när det mörka halvåret börjar.',
        linkLabel: 'Höstputs av fönster',
        linkTo: '/tjanst/hostputs',
      },
    ],
  },
  {
    slug: 'kista',
    name: 'Kista',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Kista från 499 kr efter RUT-avdrag. För hem och kontor i Kista, Husby och Akalla. Begär en kostnadsfri offert idag.',
    content:
      'Kista är både bostadsområde och Stockholms stora kontorsstad. Vi putsar fönster i lägenheter i Kista, Husby och Akalla och kontors- och skyltfönster åt företag i Kista Science City – med RUT-avdrag för privatpersoner.',
    housing: [
      'De flesta bostäder i Kista, Husby och Akalla är lägenheter i flerbostadshus från 1970-talet, ofta med balkonger mot gårdar och grönområden. På senare år har nya kvarter byggts, bland annat i Kista Äng, med större fönster och balkonger i glas.',
      'Runt Kista galleria finns kontorshus med stora glasfasader. Där passar ett återkommande upplägg för fönster i markplan, entréer och skyltfönster, medan vi putsar lägenheterna i bostadskvarteren med RUT-avdrag.',
    ],
    districts: [
      { name: 'Kista', text: 'Lägenheter och nya bostadskvarter nära Kista galleria och tunnelbanan.' },
      { name: 'Husby', text: 'Flerbostadshus från 1970-talet med balkonger mot gröna gårdar.' },
      { name: 'Akalla', text: 'Lägenheter längst ut på blå linjen, nära Järvafältet.' },
      { name: 'Kista Science City', text: 'Kontor och företag med stora glasfasader – vi putsar entréer och fönster i markplan.' },
    ],
    tips: [
      'I områden med mycket trafik och byggen, som kring E18 och de nya kvarteren, får fönstren snabbare en grå hinna. Fönster högt upp som inte går att vända inåt putsar vi från balkongen eller med teleskopskaft där det går säkert.',
      'För företag lönar det sig ofta att putsa entréer och skyltfönster oftare än resten av fasaden, eftersom det är där kunder och besökare ser glaset på nära håll.',
      'Många lägenheter i Kista och Husby har fönster åt två håll och balkong med glasräcke. Ta med glasräcket i förfrågan så putsar vi det på båda sidor. Hyresgäster kan använda RUT-avdrag precis som bostadsrättsägare, så priset blir detsamma oavsett upplåtelseform.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'En lägenhet på 1–2 rok i Kista kostar oftast 499–799 kr efter RUT-avdrag och en trea eller fyra 699–1 199 kr. Företag får en offert utan RUT-avdrag utifrån lokalens fönster.',
    services: ['lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    company: true,
    guides: ['hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026', 'hur-ofta-ska-man-putsa-fonster'],
    nearbyAreas: [
      { name: 'Sollentuna', slug: 'sollentuna' },
      { name: 'Spånga', slug: 'spanga' },
      { name: 'Sundbyberg', slug: 'sundbyberg' },
      { name: 'Veddesta', slug: 'veddesta' },
      { name: 'Järfälla', slug: 'jarfalla' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en lägenhet i Kista?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. Inglasad balkong läggs till i offerten.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni kontorsfönster i Kista Science City?',
        answer:
          'Ja, vi putsar skyltfönster, entréer och kontorsfönster som går att nå säkert. Företag kan välja enstaka putsningar eller fasta intervall.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
      {
        question: 'Kan ni putsa fönster som inte går att öppna på höga våningar?',
        answer:
          'Fönster som går att vända eller öppna putsar vi på båda sidor inifrån. Fasta fönster högt upp putsar vi från balkongen eller med teleskopskaft där det går att göra säkert.',
      },
      {
        question: 'Kan flera grannar i samma hus boka samma dag?',
        answer:
          'Ja, och då får ni alla rabatt. Skriv i förfrågan vilka grannar som vill boka, så planerar vi ett gemensamt besök.',
      },
    ],
  },
  {
    slug: 'solna',
    name: 'Solna',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Solna från 499 kr efter RUT-avdrag. Lägenheter och villor i Råsunda, Huvudsta, Hagalund och Bergshamra. Begär en gratis offert.',
    content:
      'Solna har stenstadskvarter i Råsunda, höghus i Huvudsta och Hagalund och helt nya områden som Arenastaden och Frösunda. Vi putsar fönster i lägenheter, radhus och villor i hela Solna, med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Det mesta i Solna är lägenheter. I Råsunda finns stenhus från början av 1900-talet med höga fönster och ofta kopplade bågar, medan Huvudsta och Hagalund präglas av större flerbostadshus från 1960- och 70-talen. I Arenastaden, Frösunda och Järvastaden är husen nya, med stora glaspartier och balkonger i glas.',
      'Längre norrut, mot Ulriksdal och Bergshamra, finns också radhus och villor. Oavsett boendeform räknar vi på antal fönster och vad som ska putsas, så att du får ett fast pris innan vi kommer.',
    ],
    districts: [
      { name: 'Råsunda', text: 'Stenstadskvarter från början av 1900-talet med höga fönster och kopplade bågar.' },
      { name: 'Huvudsta', text: 'Flerbostadshus mot Ulvsundasjön, många med balkong och utsikt.' },
      { name: 'Hagalund', text: 'Höghus och lägenheter nära Solna centrum.' },
      { name: 'Arenastaden', text: 'Nya bostäder och kontor med stora glaspartier.' },
    ],
    tips: [
      'I Solna bor många högt upp, och fönster som inte går att vända inåt är vanliga i både äldre och nya hus. Ange vilken våning du bor på och om fönstren går att öppna, så vet vi vilken utrustning vi ska ta med.',
      'I områden där det fortfarande byggs, som kring Arenastaden och Frösunda, kan det löna sig att putsa lite oftare det första året efter inflyttning.',
      'I Solna finns många bostadsrättsföreningar där flera grannar vill ha putsat ungefär samtidigt, till exempel inför sommaren. Bokar ni samma dag får alla rabatt. Föreningen kan inte använda RUT-avdrag för trapphus, men varje medlem kan använda RUT för sin egen lägenhet.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'En tvåa i Råsunda eller Huvudsta kostar oftast 499–799 kr efter RUT-avdrag och en trea eller fyra 699–1 199 kr. Radhus och villor mot Ulriksdal kostar oftast 800–2 000 kr.',
    services: ['lagenhet-fonsterputs', 'abonnemang-fonsterputs', 'villa-fonsterputs'],
    company: true,
    guides: ['hur-tvattar-man-inglasade-balkonger', 'hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Bergshamra', slug: 'bergshamra' },
      { name: 'Sundbyberg', slug: 'sundbyberg' },
      { name: 'Kungsholmen', slug: 'kungsholmen' },
      { name: 'Norrmalm', slug: 'norrmalm' },
      { name: 'Bromma', slug: 'bromma' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Solna?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag, en på 3–4 rok 699–1 199 kr och ett radhus eller en villa 800–2 000 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni kopplade fönster i äldre hus i Råsunda?',
        answer:
          'Ja, vi öppnar innerbågen och putsar även mellan glasen om du vill. Välj ”Utsida + insida + mellan” i formuläret.',
      },
      {
        question: 'Kan ni putsa fönster högt upp i Huvudsta och Hagalund?',
        answer:
          'Ja, så länge fönstren går att vända inåt eller nås från balkongen. Berätta i förfrågan vilken våning du bor på och hur fönstren öppnas.',
      },
      {
        question: 'Putsar ni nybyggda lägenheter i Arenastaden och Frösunda?',
        answer:
          'Ja. Nya hus har ofta mycket byggdamm på fönstren efter inflyttningen. Vi putsar insida, utsida och glasbalkonger.',
        linkLabel: 'Så tvättar man inglasade balkonger',
        linkTo: '/guide/hur-tvattar-man-inglasade-balkonger',
      },
    ],
  },
  {
    slug: 'bergshamra',
    name: 'Bergshamra',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Bergshamra från 499 kr efter RUT-avdrag. Villor, radhus och bostadsrätter nära Brunnsviken och Haga. Begär en gratis offert.',
    content:
      'Bergshamra ligger i norra Solna mellan Brunnsviken och Ulriksdal, med lägenheter nära tunnelbanan och radhus och villor i utkanterna. Vi putsar fönster i hela Bergshamra med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Kring Bergshamra centrum och tunnelbanan består bebyggelsen mest av flerbostadshus från 1960- och 70-talen, många med utsikt mot Brunnsviken och Hagaparken. Lägenheterna har ofta stora fönster och balkonger, och inglasade balkonger är vanliga.',
      'I de norra delarna, mot Ulriksdal och gränsen mot Stocksund, finns även radhus och villor. Där vetter fönstren ofta mot trädgård och natur, och de får mer pollen och löv än lägenheterna i centrum.',
    ],
    districts: [
      { name: 'Bergshamra centrum', text: 'Lägenheter nära tunnelbanan, ofta med balkong och utsikt.' },
      { name: 'Norra Bergshamra', text: 'Radhus, villor och lägenheter i lugnare kvarter.' },
      { name: 'Ulriksdal', text: 'Bostäder nära Ulriksdals slottspark, med både nyare lägenheter och radhus.' },
    ],
    tips: [
      'Närheten till vatten och parkmark gör att fönstren mot Brunnsviken och Hagaparken får mer pollen och fukt. Bor du med utsikt mot vattnet är det de fönstren som gör mest skillnad att hålla rena.',
      'Har du inglasad balkong, kom ihåg att ange det i förfrågan – det tar extra tid och vi vill att priset i offerten ska stämma.',
      'I lägenheter med fönster mot Brunnsviken är det vanligt med stora fönsterpartier som bara går att öppna delvis. Vi putsar så mycket som går att nå säkert inifrån och från balkongen, och säger till i förväg om någon del inte går att komma åt. Då vet du vad som ingår innan vi börjar.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'En lägenhet i Bergshamra kostar oftast 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok efter RUT-avdrag. Radhus och villor i de norra delarna brukar landa på 800–2 000 kr.',
    services: ['lagenhet-fonsterputs', 'villa-fonsterputs', 'abonnemang-fonsterputs'],
    guides: ['hur-tvattar-man-inglasade-balkonger', 'hur-ofta-ska-man-putsa-fonster'],
    nearbyAreas: [
      { name: 'Solna', slug: 'solna' },
      { name: 'Danderyd', slug: 'danderyd' },
      { name: 'Djursholm', slug: 'djursholm' },
      { name: 'Norrmalm', slug: 'norrmalm' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Bergshamra?',
        answer:
          'En lägenhet kostar oftast 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok efter RUT-avdrag. Radhus och villor kostar oftast 800–2 000 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni inglasade balkonger i Bergshamra?',
        answer:
          'Ja, vi putsar balkongglasen på båda sidor så långt partierna går att öppna, och fönstren och balkongdörren innanför.',
        linkLabel: 'Så tvättar man inglasade balkonger',
        linkTo: '/guide/hur-tvattar-man-inglasade-balkonger',
      },
      {
        question: 'Kan ni putsa stora fönster mot Brunnsviken?',
        answer:
          'Ja, stora fönster och fönsterpartier putsar vi på både in- och utsida, så länge de går att öppna eller nå säkert från balkongen.',
      },
      {
        question: 'Behöver jag vara hemma när ni putsar?',
        answer:
          'Ska vi putsa insidan behöver vi komma in, men du behöver inte vara hemma om du lämnar nyckel och portkod. Utsidan på radhus och villor kan vi putsa utan att du är hemma.',
      },
    ],
  },
  {
    slug: 'sundbyberg',
    name: 'Sundbyberg',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Sundbyberg från 499 kr efter RUT-avdrag. Lägenheter och radhus i Duvbo, Lilla Alby, Ursvik och Rissne. Begär en gratis offert.',
    content:
      'Sundbyberg är Sveriges minsta kommun till ytan men tätbebyggd, med stenstad i centrum, villor i Duvbo och Lilla Alby och nya kvarter i Ursvik. Vi putsar fönster i hela Sundbyberg med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'I centrala Sundbyberg finns flerbostadshus från olika epoker, från äldre stenhus till nybyggda kvarter, och de flesta bor i lägenhet. Hallonbergen och Rissne har större flerbostadshus med balkonger, medan Ursvik är ett nytt område med moderna hus och stora fönster.',
      'Duvbo och Lilla Alby är villaområden med äldre hus, ofta med spröjs och verandor, och här finns också radhus. Där putsar vi villafönster med stege för övervåningen.',
    ],
    districts: [
      { name: 'Duvbo', text: 'Villaområde med äldre hus, spröjsade fönster och trädgårdar.' },
      { name: 'Lilla Alby', text: 'Villor och mindre flerbostadshus i lugna kvarter.' },
      { name: 'Ursvik', text: 'Nya bostadskvarter med stora fönster och glasbalkonger.' },
      { name: 'Rissne', text: 'Större flerbostadshus med balkonger, nära tunnelbanan.' },
    ],
    tips: [
      'Tät bebyggelse och mycket trafik i centrala Sundbyberg gör att fönster mot gatan blir smutsiga snabbare än de mot gården. Vill du hålla nere kostnaden kan du välja att vi bara putsar utsidan ibland.',
      'I nybyggda Ursvik kan byggdamm från kvarteren runt omkring göra att det behövs en extra putsning det första året.',
      'I äldre hus i centrala Sundbyberg finns ofta kopplade fönster där innerbågen sitter fast efter flera lager färg. Vi öppnar dem försiktigt och säger till om en båge sitter så hårt att den riskerar att skadas. Hyresgäster kan använda RUT-avdrag på samma sätt som bostadsrättsägare.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'De flesta i Sundbyberg bor i lägenhet. En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och 3–4 rok 699–1 199 kr. En villa i Duvbo eller Lilla Alby kostar oftast 800–2 000 kr.',
    services: ['lagenhet-fonsterputs', 'villa-fonsterputs', 'abonnemang-fonsterputs'],
    guides: ['hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Solna', slug: 'solna' },
      { name: 'Bromma', slug: 'bromma' },
      { name: 'Kista', slug: 'kista' },
      { name: 'Spånga', slug: 'spanga' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Sundbyberg?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. En villa kostar oftast 800–2 000 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Kan jag bara beställa putsning av utsidan?',
        answer:
          'Ja, i formuläret väljer du om vi ska putsa utsida, utsida och insida eller även mellan glasen. Bara utsida blir billigast.',
      },
      {
        question: 'Putsar ni villor i Duvbo och Lilla Alby?',
        answer:
          'Ja, vi putsar villor och radhus med alla typer av fönster, även spröjsade och de på övervåningen.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Putsar ni fönster i nybyggda Ursvik?',
        answer:
          'Ja. Nya hus har ofta stora fönster och glasbalkonger som samlar byggdamm de första åren. Vi putsar insida, utsida och balkongglas.',
      },
    ],
  },
  {
    slug: 'spanga',
    name: 'Spånga',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Spånga från 499 kr efter RUT-avdrag. Villor och radhus i Spånga, Solhem och Tensta. Begär en kostnadsfri offert idag.',
    content:
      'Spånga har villakvarter som Solhem och Flysta och lägenheter i Tensta och Hjulsta. Vi putsar fönster i villor, radhus och lägenheter i hela Spånga-Tensta, med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Runt Spånga station, i Solhem, Flysta och Sundby ligger villakvarter med både äldre egnahem och nyare hus. Här är det vanligt med spröjsade fönster, glasverandor och altandörrar mot trädgården.',
      'Tensta och Hjulsta byggdes under miljonprogrammet, med flerbostadshus i flera våningar där de flesta bor i lägenhet med balkong. Vi putsar lägenhetsfönster och inglasade balkonger lika gärna som villor.',
    ],
    districts: [
      { name: 'Solhem', text: 'Villakvarter nära Spånga station, med äldre och nyare villor.' },
      { name: 'Flysta', text: 'Villor och radhus med trädgårdar mot Bromsten och Vällingby.' },
      { name: 'Tensta', text: 'Flerbostadshus med lägenheter och balkonger.' },
      { name: 'Hjulsta', text: 'Lägenheter längst ut på blå linjen, nära Järvafältet.' },
    ],
    tips: [
      'Villorna i Spånga har ofta stora tomter med träd, så pollen och löv sätter sig på fönstren under våren och hösten. I lägenheterna i Tensta och Hjulsta är det istället balkongfönster och inglasningar som blir smutsiga fortast.',
      'Inför besöket: flytta undan saker på fönsterbänkarna och se till att vi kommer fram till fönstren både inne och ute. Stege och material har vi med oss.',
      'På villagatorna i Spånga har grannar ofta liknande hus och fönster. Bokar flera hushåll samma dag kan vi planera besöken efter varandra, och då får alla rabatt. Det är ett enkelt sätt att sänka priset utan att välja bort något, och det fungerar lika bra i radhuslängor.',
    ],
    priceRows: ['house', 'apartmentSmall', 'apartmentLarge'],
    priceNote:
      'En villa i Solhem eller Flysta kostar oftast 800–2 000 kr efter RUT-avdrag. En lägenhet i Tensta eller Hjulsta kostar 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok.',
    services: ['villa-fonsterputs', 'lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Bromsten', slug: 'bromsten' },
      { name: 'Kista', slug: 'kista' },
      { name: 'Vällingby', slug: 'vallingby' },
      { name: 'Järfälla', slug: 'jarfalla' },
      { name: 'Sundbyberg', slug: 'sundbyberg' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Spånga?',
        answer:
          'En villa kostar oftast 800–2 000 kr efter RUT-avdrag och en lägenhet 499–1 199 kr beroende på storlek. Du får ett fast pris i offerten.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni lägenheter i Tensta och Hjulsta?',
        answer:
          'Ja, vi putsar lägenhetsfönster, balkongdörrar och inglasade balkonger. En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag.',
      },
      {
        question: 'Vad behöver jag göra innan ni kommer?',
        answer:
          'Töm fönsterbänkarna, knyt upp gardiner och se till att vi kommer fram till fönstren både inne och ute. Allt material och stege tar vi med.',
      },
      {
        question: 'Kan jag få putsning vår och höst automatiskt?',
        answer:
          'Ja, med ett abonnemang bokar vi in nästa tillfälle åt dig och priset per gång blir lägre än vid enstaka bokningar.',
        linkLabel: 'Läs om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
    ],
  },
  {
    slug: 'vallingby',
    name: 'Vällingby',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Vällingby från 499 kr efter RUT-avdrag. Lägenheter, radhus och villor i Råcksta, Grimsta och Vällingby. Begär en gratis offert.',
    content:
      'Vällingby byggdes på 1950-talet som en av Sveriges första ABC-städer, med lägenheter runt centrum och radhus och villor i kvarteren runt omkring. Vi putsar fönster i hela Vällingby, Råcksta, Grimsta och Nälsta med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Kring Vällingby centrum och Råcksta står lamellhus och punkthus från 1950-talet, ofta med mindre fönster i flera våningar och balkonger mot gården. Många av husen har kvar kopplade fönster där innerbågen kan öppnas.',
      'Längre ut, i Nälsta, Kälvesta och Vinsta, finns villor och radhus med trädgårdar. Där är fönstren större och fler, och det är vanligt med altanpartier och uterum.',
    ],
    districts: [
      { name: 'Vällingby centrum', text: 'Lägenheter i 50-talshus runt centrum, ofta med kopplade fönster.' },
      { name: 'Råcksta', text: 'Flerbostadshus och radhus nära tunnelbanan.' },
      { name: 'Grimsta', text: 'Bostäder nära Grimstaskogen och Mälaren.' },
      { name: 'Nälsta', text: 'Villor och radhus med trädgårdar i norra delen.' },
    ],
    tips: [
      'I 50-talshusen är kopplade fönster vanliga, och mellan glasen samlas damm som syns tydligt när solen står lågt. Vill du ha riktigt rent, välj att vi putsar även mellan glasen.',
      'Bor du nära Grimstaskogen eller Mälaren kan fönstren få mer pollen och fukt än inne vid centrum, och då kan det löna sig att putsa utsidan lite oftare.',
      'Många av 50-talshusen har mindre fönster än nyare hus men fler av dem, med sovrumsfönster, köksfönster och balkongdörr mot olika håll. Därför räknar vi på antal fönster och inte på lägenhetens storlek. Ange antal fönster i formuläret, så blir priset så exakt som möjligt redan i offerten.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'En lägenhet i Vällingby kostar oftast 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok efter RUT-avdrag. Ett radhus eller en villa i Nälsta eller Kälvesta kostar oftast 800–2 000 kr.',
    services: ['lagenhet-fonsterputs', 'villa-fonsterputs', 'abonnemang-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Hässelby', slug: 'hasselby' },
      { name: 'Bromma', slug: 'bromma' },
      { name: 'Spånga', slug: 'spanga' },
      { name: 'Bromsten', slug: 'bromsten' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Vällingby?',
        answer:
          'En lägenhet kostar oftast 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok efter RUT-avdrag. Radhus och villor kostar oftast 800–2 000 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni mellan glasen i kopplade 50-talsfönster?',
        answer:
          'Ja, vi öppnar innerbågen och putsar alla glassidor. Välj ”Utsida + insida + mellan” i formuläret så ingår det i priset.',
      },
      {
        question: 'Vilka delar av Vällingby täcker ni?',
        answer:
          'Hela Vällingby: centrum, Råcksta, Grimsta, Nälsta, Kälvesta och Vinsta, och även grannområdet Hässelby.',
        linkLabel: 'Fönsterputs i Hässelby',
        linkTo: '/omrade/hasselby',
      },
      {
        question: 'Behöver jag flytta undan gardiner och växter?',
        answer:
          'Det underlättar om fönsterbänkarna är tomma och gardinerna uppknutna. Resten tar vi hand om.',
      },
    ],
  },
  {
    slug: 'hasselby',
    name: 'Hässelby',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Hässelby från 499 kr efter RUT-avdrag. Villor i Hässelby villastad och lägenheter i Hässelby gård och strand. Begär en offert.',
    content:
      'Hässelby rymmer både en av Stockholms största villastäder och lägenheter i Hässelby gård och Hässelby strand nära Mälaren. Vi putsar fönster i villor, radhus och lägenheter i hela Hässelby, med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Hässelby villastad är ett stort område med egnahem, villor och radhus, där många hus byggdes under första halvan av 1900-talet. Här finns allt från små trävillor med spröjs till större hus med glasverandor och nyare tillbyggnader.',
      'I Hässelby gård och Hässelby strand dominerar flerbostadshus från 1950- och 60-talen, med balkonger och ofta utsikt mot grönområden eller Mälaren. Lägenheterna har ofta kopplade fönster som går att öppna och putsa mellan.',
    ],
    districts: [
      { name: 'Hässelby villastad', text: 'Villor och egnahem, ofta med spröjs och verandor.' },
      { name: 'Hässelby gård', text: 'Lägenheter kring centrum och tunnelbanan.' },
      { name: 'Hässelby strand', text: 'Flerbostadshus nära Mälaren, ofta med utsikt över vattnet.' },
    ],
    tips: [
      'Fönster som vetter mot Mälaren får mer fukt och vattenfläckar, särskilt under hösten. I villastaden med många stora träd kommer pollen tidigt och löven senare, så vår och höst är de vanligaste tiderna att boka.',
      'Har du fönster på övervåningen tar vi med stege – du behöver inte ha någon egen.',
      'Villorna i Hässelby villastad har ofta byggts om i omgångar, och det är inte ovanligt med både gamla spröjsade fönster och nya treglasfönster i samma hus. Treglasfönster är förseglade och kan inte putsas mellan glasen, så där putsar vi in- och utsidan. Äldre kopplade fönster putsar vi mellan glasen om du vill.',
    ],
    priceRows: ['house', 'apartmentSmall', 'apartmentLarge'],
    priceNote:
      'En villa i Hässelby villastad kostar oftast 800–2 000 kr efter RUT-avdrag. En lägenhet i Hässelby gård eller Hässelby strand kostar 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok.',
    services: ['villa-fonsterputs', 'lagenhet-fonsterputs', 'hostputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Vällingby', slug: 'vallingby' },
      { name: 'Viksjö', slug: 'viksjo' },
      { name: 'Järfälla', slug: 'jarfalla' },
      { name: 'Bromsten', slug: 'bromsten' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Hässelby?',
        answer:
          'En villa kostar oftast 800–2 000 kr efter RUT-avdrag. En lägenhet kostar 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni äldre villor med spröjs i Hässelby villastad?',
        answer:
          'Ja, vi putsar runt varje ruta och tar med spröjsen i offerten, så du vet priset innan vi kommer.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Kan ni putsa fönstren i en lägenhet med utsikt mot Mälaren?',
        answer:
          'Ja, så länge fönstren går att vända inåt eller nås från balkongen. Ange våning och fönstertyp i förfrågan.',
      },
      {
        question: 'Gör ni höstputs i Hässelby?',
        answer:
          'Ja, höstputs bokas oftast från mitten av september till slutet av oktober, gärna efter att löven har fallit.',
        linkLabel: 'Höstputs av fönster',
        linkTo: '/tjanst/hostputs',
      },
    ],
  },
  {
    slug: 'sollentuna',
    name: 'Sollentuna',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Sollentuna från 499 kr efter RUT-avdrag. Villor och radhus i Tureberg, Edsberg, Häggvik och Helenelund. Begär en gratis offert.',
    content:
      'Sollentuna är en villakommun med många hus kring Edsviken och Norrviken, och lägenheter nära pendeltåget i Tureberg, Häggvik och Rotebro. Vi putsar fönster i hela Sollentuna med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Stora delar av Sollentuna består av villor och radhus, från äldre villor i Edsberg och Helenelund till nyare områden i Rotebro och Norrviken. Hus nära Edsviken och Norrviken har ofta stora fönsterpartier mot vattnet, och många villor har spröjs, burspråk och fönster på flera plan.',
      'Runt Sollentuna centrum i Tureberg, i Häggvik och i Silverdal finns flerbostadshus med lägenheter och balkonger. Där putsar vi lägenhetsfönster och inglasade balkonger.',
    ],
    districts: [
      { name: 'Tureberg', text: 'Lägenheter kring Sollentuna centrum och pendeltåget.' },
      { name: 'Edsberg', text: 'Villor och radhus nära Edsviken.' },
      { name: 'Häggvik', text: 'Både villor och lägenheter nära stationen.' },
      { name: 'Helenelund', text: 'Villor och flerbostadshus mot Kista och Edsviken.' },
    ],
    tips: [
      'Hus vid Edsviken och Norrviken har ofta fönster med fri utsikt som är värda att hålla rena, men som också får mer väder och fukt från vattnet. I villaområdena med mycket träd är det pollen på våren och löv på hösten som syns mest.',
      'Många villaägare väljer därför ett abonnemang med putsning vår och höst, så att de slipper boka om varje gång.',
      'I Sollentuna finns många radhusområden där husen har samma fönster och planlösning. Om flera grannar bokar samma dag kan vi ta husen i följd, och då får ni alla rabatt. För villor med stora tomter är det också vanligt att vilja ha uterum och glasade altaner putsade samtidigt som fönstren.',
    ],
    priceRows: ['house', 'apartmentLarge', 'apartmentSmall'],
    priceNote:
      'En villa i Sollentuna kostar oftast 800–2 000 kr efter RUT-avdrag, och större hus vid vattnet med många fönster hamnar i den övre delen. En lägenhet i Tureberg eller Häggvik kostar från 499 kr.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'lagenhet-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Upplands Väsby', slug: 'upplands-vasby' },
      { name: 'Täby', slug: 'taby' },
      { name: 'Kista', slug: 'kista' },
      { name: 'Järfälla', slug: 'jarfalla' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en villa i Sollentuna?',
        answer:
          'En normalstor villa kostar oftast 800–2 000 kr efter RUT-avdrag. Antal fönster, spröjs och om vi ska putsa mellan glasen avgör var i spannet du hamnar.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Putsar ni stora fönster mot Edsviken?',
        answer:
          'Ja, panoramafönster och glaspartier mot sjön putsar vi på både in- och utsida. Ange gärna ungefärlig storlek i förfrågan.',
      },
      {
        question: 'Kan jag få fönsterputs vår och höst utan att boka om?',
        answer:
          'Ja, med ett abonnemang bokar vi in nästa tillfälle åt dig. Du väljer själv om du vill ha putsat två, tre eller fyra gånger om året.',
        linkLabel: 'Läs om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
      {
        question: 'Putsar ni lägenheter i Tureberg och Silverdal?',
        answer:
          'Ja, en lägenhet på 1–2 rok kostar oftast 499–799 kr och en på 3–4 rok 699–1 199 kr efter RUT-avdrag.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
    ],
  },
  {
    slug: 'upplands-vasby',
    name: 'Upplands Väsby',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Upplands Väsby från 499 kr efter RUT-avdrag. Villor och radhus i Bollstanäs, Runby och Smedby. Begär en kostnadsfri offert.',
    content:
      'Upplands Väsby har villor och radhus i Bollstanäs, Runby och Smedby och lägenheter kring Väsby centrum och i nya Messingen. Vi putsar fönster i hela kommunen med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Väsby växte snabbt under 1960- och 70-talen, och många villor och radhus från den tiden finns i Bollstanäs, Runby och Smedby. Husen har ofta stora vardagsrumsfönster, altandörrar och fönster på övervåningen.',
      'Kring Väsby centrum och i Messingen bor de flesta i lägenhet, och det byggs fortfarande nytt nära pendeltågsstationen. Inglasade balkonger är vanliga, och vi putsar både fönster och balkongglas.',
    ],
    districts: [
      { name: 'Bollstanäs', text: 'Villor och radhus med trädgårdar.' },
      { name: 'Runby', text: 'Villaområde med blandning av äldre och nyare hus.' },
      { name: 'Smedby', text: 'Villor och radhus i ett lugnt område.' },
      { name: 'Messingen', text: 'Nya lägenheter nära stationen och centrum.' },
    ],
    tips: [
      'Många hus i Väsby har bytt till nya fönster, men det finns också gott om äldre fönster med innerbågar. Säg till vilken typ du har, så blir offerten rätt.',
      'Ligger huset nära E4 eller järnvägen kan fönstren få mer vägdamm och sot, och då kan det löna sig att putsa utsidan oftare än insidan.',
      'Kedjehus och radhus från 1970-talet har ofta fönster med innerbågar som går att öppna och putsa mellan. Där samlas damm och döda insekter med åren, och det syns först när fönstren har putsats ordentligt. Välj ”Utsida + insida + mellan” i formuläret om du vill att vi tar även mellanrutorna.',
    ],
    priceRows: ['house', 'apartmentSmall', 'apartmentLarge'],
    priceNote:
      'Ett radhus eller en villa i Upplands Väsby kostar oftast 800–2 000 kr efter RUT-avdrag. En lägenhet nära centrum kostar 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'lagenhet-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'hur-tvattar-man-inglasade-balkonger'],
    nearbyAreas: [
      { name: 'Sollentuna', slug: 'sollentuna' },
      { name: 'Täby', slug: 'taby' },
      { name: 'Järfälla', slug: 'jarfalla' },
      { name: 'Kallhäll', slug: 'kallhall' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Upplands Väsby?',
        answer:
          'Ett radhus eller en villa kostar oftast 800–2 000 kr efter RUT-avdrag och en lägenhet 499–1 199 kr beroende på storlek.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni radhus i Bollstanäs och Runby?',
        answer:
          'Ja, vi putsar radhus och villor med alla typer av fönster, även fönster på övervåningen och altandörrar.',
      },
      {
        question: 'Mina fönster blir snabbt smutsiga nära E4 – hur ofta bör jag putsa?',
        answer:
          'Fönster som vetter mot större vägar kan behöva putsas på utsidan oftare än två gånger om året. Ett bra upplägg är att putsa utsidan oftare och insidan mer sällan.',
        linkLabel: 'Hur ofta ska man putsa fönster?',
        linkTo: '/guide/hur-ofta-ska-man-putsa-fonster',
      },
      {
        question: 'Kan ni putsa inglasade balkonger i Messingen?',
        answer:
          'Ja, vi putsar balkongglasen på båda sidor så långt de går att öppna, och fönstren och balkongdörren innanför.',
        linkLabel: 'Så tvättar man inglasade balkonger',
        linkTo: '/guide/hur-tvattar-man-inglasade-balkonger',
      },
    ],
  },
  {
    slug: 'taby',
    name: 'Täby',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Täby från 499 kr efter RUT-avdrag. Villor och radhus i Näsbypark, Gribbylund och Viggbyholm. Begär en kostnadsfri offert idag.',
    content:
      'Täby är villor i Viggbyholm och Gribbylund, radhus och höghus i Näsbypark och lägenheter kring Täby centrum. Vi putsar fönster i hela Täby med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Det mesta av Täby är villor och radhus. I Viggbyholm och Hägernäs ligger äldre villor nära Stora Värtan, ofta med spröjsade fönster och verandor, medan Gribbylund, Skarpäng och Ensta har villor och radhus från senare decennier med stora fönster mot trädgården.',
      'I Täby centrum, Tibble och Näsbypark finns flerbostadshus, bland annat de höga punkthusen i Näsbypark från 1960-talet. Fönster högt upp som inte går att vända putsar vi inifrån eller från balkongen där det går säkert.',
    ],
    districts: [
      { name: 'Näsbypark', text: 'Höghus, radhus och villor nära Roslagsbanan.' },
      { name: 'Viggbyholm', text: 'Äldre villor nära Stora Värtan, ofta med spröjs.' },
      { name: 'Gribbylund', text: 'Villaområde med stora tomter och många fönster mot trädgården.' },
      { name: 'Täby centrum', text: 'Lägenheter i och runt centrum.' },
    ],
    tips: [
      'Villor nära Stora Värtan får mer fukt och vattenfläckar på fönstren mot sjön, och i de gröna villaområdena lägger sig pollen tidigt på våren. Har huset spröjs eller innerbågar, ange det i förfrågan.',
      'Vill du ha putsat både vår och höst kan ett abonnemang vara det smidigaste – då bokar vi in nästa gång åt dig.',
      'RUT-avdraget är personligt. Om ni är två vuxna i hushållet som båda betalar för tjänsten kan avdraget delas mellan er. För de flesta räcker ändå en persons avdrag gott till fönsterputs, eftersom taket är 75 000 kr per person och år.',
    ],
    priceRows: ['house', 'apartmentLarge', 'apartmentSmall'],
    priceNote:
      'En villa i Täby kostar oftast 800–2 000 kr efter RUT-avdrag, och äldre villor med många spröjsade fönster ligger i den övre delen. En lägenhet i Täby centrum eller Näsbypark kostar från 499 kr.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'lagenhet-fonsterputs'],
    company: true,
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Danderyd', slug: 'danderyd' },
      { name: 'Enebyberg', slug: 'enebyberg' },
      { name: 'Djursholm', slug: 'djursholm' },
      { name: 'Sollentuna', slug: 'sollentuna' },
      { name: 'Upplands Väsby', slug: 'upplands-vasby' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en villa i Täby?',
        answer:
          'En normalstor villa kostar oftast 800–2 000 kr efter RUT-avdrag. Ett radhus med färre fönster hamnar lägre, en stor villa med mycket spröjs högre.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Kan ni putsa fönster högt upp i höghusen i Näsbypark?',
        answer:
          'Ja, så länge fönstren går att vända inåt eller nås från balkongen. Berätta vilken våning du bor på i förfrågan.',
      },
      {
        question: 'Putsar ni äldre villor med spröjs i Viggbyholm?',
        answer:
          'Ja, vi putsar runt varje ruta och kan även putsa mellan glasen i kopplade fönster. Spröjsen tas med i offerten.',
      },
      {
        question: 'Erbjuder ni fönsterputs för företag i Täby?',
        answer:
          'Ja, vi putsar skyltfönster, kontor och entréer åt företag, till exempel i Arninge och kring Täby centrum.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
    ],
  },
  {
    slug: 'danderyd',
    name: 'Danderyd',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Danderyd från 499 kr efter RUT-avdrag. Villor och större hus i Stocksund, Svalnäs, Kevinge och Mörby. Begär en gratis offert.',
    content:
      'Danderyd är en villakommun med stora hus i Stocksund, Svalnäs och Kevinge och lägenheter kring Mörby centrum. Vi putsar fönster i hela Danderyd – även i Djursholm och Enebyberg – med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Danderyds villor är ofta stora, med många fönster, spröjs, burspråk och glasade verandor. I Stocksund ligger villor nära vattnet med fönster mot Stocksundet och Edsviken, och i Svalnäs och Kevinge finns både äldre villor och nyare hus med stora glaspartier.',
      'Kring Mörby centrum och Danderyds sjukhus finns flerbostadshus med lägenheter. Där putsar vi lägenhetsfönster och balkonger till samma fasta priser som i övriga Stockholm.',
    ],
    districts: [
      { name: 'Stocksund', text: 'Villor nära Stocksundet och Edsviken, ofta med fönster mot vattnet.' },
      { name: 'Mörby', text: 'Lägenheter kring Mörby centrum och tunnelbanan.' },
      { name: 'Svalnäs', text: 'Villor med stora trädgårdar och många fönster.' },
      { name: 'Kevinge', text: 'Villor och radhus i lugna kvarter nära Edsviken.' },
    ],
    tips: [
      'Stora villor har ofta fönster på tre plan, takkupor och glasverandor. Berätta i förfrågan om det finns fönster som är svåra att nå, så tar vi med rätt utrustning.',
      'Hus nära vatten får mer fukt och smuts på fönstren mot sjön, och de fönstren kan behöva putsas oftare än resten av huset.',
      'I större villor är det värt att tänka igenom vilka fönster som behöver putsas varje gång. Fönster mot vattnet och entrén syns mest, medan fönster mot en skyddad trädgård kan klara sig med en putsning om året. Berätta hur du vill ha det, så lägger vi upp ett schema som passar både huset och budgeten.',
    ],
    priceRows: ['house', 'apartmentLarge', 'apartmentSmall'],
    priceNote:
      'En normalstor villa i Danderyd kostar oftast 800–2 000 kr efter RUT-avdrag. Större villor med många spröjsade fönster kan kosta mer – du får alltid ett fast pris i offerten. En lägenhet i Mörby kostar från 499 kr.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'varputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Djursholm', slug: 'djursholm' },
      { name: 'Enebyberg', slug: 'enebyberg' },
      { name: 'Täby', slug: 'taby' },
      { name: 'Bergshamra', slug: 'bergshamra' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en stor villa i Danderyd?',
        answer:
          'En normalstor villa kostar oftast 800–2 000 kr efter RUT-avdrag. Har huset många spröjsade fönster, flera plan eller glasverandor kan priset bli högre. Du får alltid ett fast pris innan vi kommer.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni fönster på tre våningar och i takkupor?',
        answer:
          'Ja, fönster som går att öppna inifrån eller nås säkert med stege putsar vi på båda sidor. Berätta i förfrågan vilka fönster som är svåra att komma åt.',
      },
      {
        question: 'Kan ni putsa medan vi är på jobbet?',
        answer:
          'Ja, utsidan kan vi putsa utan att någon är hemma. Ska vi putsa insidan behöver vi komma in, till exempel genom att du lämnar en nyckel.',
      },
      {
        question: 'Täcker ni Djursholm och Enebyberg också?',
        answer:
          'Ja, vi putsar fönster i hela Danderyds kommun, även i Djursholm och Enebyberg.',
        links: [
          { label: 'Fönsterputs i Djursholm', to: '/omrade/djursholm' },
          { label: 'Fönsterputs i Enebyberg', to: '/omrade/enebyberg' },
        ],
      },
    ],
  },
  {
    slug: 'djursholm',
    name: 'Djursholm',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Djursholm från 499 kr efter RUT-avdrag. Vi putsar stora villor med spröjs, burspråk och glaspartier. Fast pris – begär en gratis offert.',
    content:
      'Djursholm grundades som Sveriges första villastad i slutet av 1800-talet, och här finns några av Stockholms största villor. Vi putsar fönster i hela Djursholm, från sekelskiftesvillor med spröjs och burspråk till moderna hus med stora glaspartier – med fast pris och RUT-avdrag.',
    housing: [
      'Många hus i Djursholm byggdes kring sekelskiftet 1900 och har fönster i alla storlekar: spröjsade bågar, burspråk, glasverandor och små fönster i tornrum och takkupor. Den typen av fönster kräver tid och varsamhet, och det räknar vi med i offerten.',
      'Det finns också många nyare och ombyggda villor med stora glaspartier, fönster från golv till tak och glasräcken. Oavsett hustyp putsar vi alla fönster som går att nå säkert, på ut- och insida och mellan glasen.',
    ],
    districts: [
      { name: 'Djursholms Ösby', text: 'Villor kring Djursholms Ösby station och centrum.' },
      { name: 'Framnäs', text: 'Villor nära Stora Värtan, ofta med fönster mot vattnet.' },
      { name: 'Långängen', text: 'Villaområde med blandning av äldre och nyare hus.' },
    ],
    tips: [
      'Gamla fönster med originalglas är känsliga, och kittet kan vara skört. Vi putsar varsamt och säger till om vi ser skador innan vi börjar. Har huset många fönster på övervåningen eller i takkupor, ange det i förfrågan, så vet vi vilken utrustning som behövs.',
      'Vill du ha putsat mer än två gånger om året blir ett abonnemang både enklare och billigare per gång.',
      'Många villor i Djursholm har stora tomter med äldre träd, och det betyder mer pollen, kåda och löv på fönstren än i tätare villaområden. Fönster under trädkronor kan få en klibbig hinna som kräver lite mer arbete att få bort. Ange gärna i förfrågan om det finns sådana fönster.',
    ],
    priceRows: ['house'],
    priceNote:
      'En normalstor villa kostar oftast 800–2 000 kr efter RUT-avdrag. Många villor i Djursholm är större än så, med fler fönster och mycket spröjs, och då hamnar priset högre. Du får alltid ett fast pris innan vi kommer.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'varputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Danderyd', slug: 'danderyd' },
      { name: 'Enebyberg', slug: 'enebyberg' },
      { name: 'Täby', slug: 'taby' },
      { name: 'Bergshamra', slug: 'bergshamra' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en villa i Djursholm?',
        answer:
          'En normalstor villa kostar oftast 800–2 000 kr efter RUT-avdrag. Större villor med många spröjsade fönster och flera plan kostar mer. Du får ett fast pris i offerten utifrån just ditt hus.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Putsar ni gamla fönster med spröjs och originalglas?',
        answer:
          'Ja. Vi är försiktiga med gammalt glas och kitt, putsar runt varje ruta och säger till om vi ser skador innan vi börjar.',
      },
      {
        question: 'Kan ni putsa fönster i tornrum och takkupor?',
        answer:
          'Ja, så länge fönstren går att öppna inifrån eller nås säkert med stege. Ange vilka fönster det gäller i förfrågan.',
      },
      {
        question: 'Hur ofta bör en stor villa putsas?',
        answer:
          'Två gånger om året räcker för de flesta. Med abonnemang kan du välja två, tre eller fyra gånger om året, och priset per gång blir lägre.',
        linkLabel: 'Läs om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
    ],
  },
  {
    slug: 'enebyberg',
    name: 'Enebyberg',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Enebyberg från 499 kr efter RUT-avdrag. Vi putsar villor, radhus och äldre hus med spröjs och glasverandor. Begär en gratis offert idag.',
    content:
      'Enebyberg är ett villasamhälle i Danderyds kommun, med egnahem, villor och radhus kring Roslagsbanan. Vi putsar fönster i hela Enebyberg med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Enebyberg växte fram kring Roslagsbanan i början av 1900-talet, och många av de äldre husen har kvar spröjsade fönster, glasverandor och fönster i flera plan. Mellan dem finns villor och radhus från senare decennier med större fönster och altandörrar.',
      'Nära Enebybergs centrum och stationen finns också några flerbostadshus. Men de flesta här bor i hus, och det är villafönster med spröjs och fönster på övervåningen som tar mest tid att putsa.',
      'Vi putsar alla typer av fönster i Enebyberg: utsida, insida och mellan glasen i kopplade fönster, liksom glasverandor, uterum och altandörrar.',
    ],
    districts: [{ name: 'Enebyberg', text: 'Villor, radhus och egnahem kring Roslagsbanan och centrum.' }],
    tips: [
      'Villorna i Enebyberg ligger ofta nära skog och grönområden, så pollen, kåda och löv sätter sig på fönstren. Gamla fönster med spröjs och innerbågar tar längre tid, men det är där skillnaden syns mest efter en putsning.',
      'Bor du nära Roslagsbanan kan fönstren mot spåret behöva putsas lite oftare. Bokar du samma dag som en granne får ni båda rabatt.',
      'Många hus i Enebyberg har källarfönster, fönster i garaget eller en friggebod med glas. Vill du ha dem putsade, ta med dem i förfrågan – de räknas som vanliga fönster och läggs till i offerten. Är du osäker på hur många fönster huset har, räkna fönsterbågarna, så blir priset rätt.',
      'Bor ni nära varandra i samma kvarter kan ni boka samma dag och få rabatt båda två. Skriv grannens adress i meddelandet, så planerar vi besöken efter varandra.',
    ],
    priceRows: ['house', 'apartmentSmall'],
    priceNote:
      'De flesta hem i Enebyberg är villor och radhus, där fönsterputs oftast kostar 800–2 000 kr efter RUT-avdrag. Ett mindre radhus hamnar i den lägre delen och en stor villa med spröjs i den övre.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'hostputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Danderyd', slug: 'danderyd' },
      { name: 'Djursholm', slug: 'djursholm' },
      { name: 'Täby', slug: 'taby' },
      { name: 'Sollentuna', slug: 'sollentuna' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Enebyberg?',
        answer:
          'En villa eller ett radhus kostar oftast 800–2 000 kr efter RUT-avdrag. En lägenhet kostar från 499 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni äldre villor med glasveranda?',
        answer:
          'Ja, vi putsar både villans fönster och glasverandan, på in- och utsida. Ta med verandan i förfrågan så blir priset rätt.',
      },
      {
        question: 'Får vi rabatt om flera på samma gata bokar?',
        answer:
          'Ja, när du och en granne bokar samma dag får ni båda rabatt. Skriv det i förfrågan så planerar vi ett gemensamt besök.',
      },
      {
        question: 'När passar det att boka fönsterputs i Enebyberg?',
        answer:
          'De flesta bokar på våren efter pollensäsongen och på hösten efter lövfällningen. Det går också bra att boka vid andra tider.',
        linkLabel: 'Höstputs av fönster',
        linkTo: '/tjanst/hostputs',
      },
    ],
  },
  {
    slug: 'lidingo',
    name: 'Lidingö',
    prep: 'på',
    updatedAt: UPDATED,
    description:
      'Fönsterputs på Lidingö från 499 kr efter RUT-avdrag. Villor och lägenheter i Brevik, Rudboda, Herserud och centrum. Begär en gratis offert.',
    content:
      'Lidingö är en ö med villor, radhus och lägenheter – och väldigt många fönster mot vattnet. Vi putsar fönster på hela Lidingö, från villor i Brevik och Herserud till lägenheter i centrum och Larsberg, med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Större delen av Lidingö består av villor och radhus, i områden som Brevik, Herserud, Rudboda, Gåshaga och Hersby. Många hus ligger nära strandkanten eller på höjder med utsikt, med stora fönsterpartier, glasräcken och uterum mot vattnet.',
      'Kring Lidingö centrum, i Larsberg och i nya Dalénum finns flerbostadshus med lägenheter och balkonger. Där putsar vi lägenhetsfönster och inglasade balkonger.',
    ],
    districts: [
      { name: 'Brevik', text: 'Villor nära vattnet, ofta med stora fönster mot sjön.' },
      { name: 'Herserud', text: 'Villor och radhus längs Lidingöbanan.' },
      { name: 'Rudboda', text: 'Radhus och villor med trädgårdar.' },
      { name: 'Larsberg', text: 'Lägenheter i flerbostadshus nära Lidingöbanan.' },
    ],
    tips: [
      'Fönster mot havet får saltavlagringar och vattenfläckar från blåst och regn, särskilt under hösten och vintern. Avlagringarna blir svårare att få bort ju längre de sitter, så det hjälper att putsa fönstren mot vattnet lite oftare än resten.',
      'Har du glasräcken eller uterum, ange det i förfrågan så tar vi med det i offerten.',
      'Hus som ligger högt med utsikt har ofta fönster som är svåra att nå från marken, särskilt på sjösidan där tomten sluttar. Berätta i förfrågan om det finns fönster i sluttning eller över en brant, så tar vi med rätt stege och bedömer på plats vad som går att putsa säkert.',
    ],
    priceRows: ['house', 'apartmentLarge', 'apartmentSmall'],
    priceNote:
      'En villa på Lidingö kostar oftast 800–2 000 kr efter RUT-avdrag. Hus med stora glaspartier mot vattnet eller många spröjsade fönster hamnar i den övre delen. En lägenhet i Larsberg eller centrum kostar från 499 kr.',
    services: ['villa-fonsterputs', 'abonnemang-fonsterputs', 'lagenhet-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Östermalm', slug: 'ostermalm' },
      { name: 'Djurgården', slug: 'djurgarden' },
      { name: 'Danderyd', slug: 'danderyd' },
      { name: 'Nacka', slug: 'nacka' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs på Lidingö?',
        answer:
          'En villa kostar oftast 800–2 000 kr efter RUT-avdrag och en lägenhet 499–1 199 kr beroende på storlek.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Kan ni ta bort saltavlagringar från fönster mot havet?',
        answer:
          'Ja, vanliga saltavlagringar och vattenfläckar går bort vid en vanlig putsning. Har avlagringarna suttit länge kan det ta extra tid, och det tar vi med i offerten.',
      },
      {
        question: 'Putsar ni stora glaspartier och glasräcken?',
        answer:
          'Ja, vi putsar glaspartier och glasräcken som går att nå säkert från marken, balkongen eller med stege.',
      },
      {
        question: 'Putsar ni lägenheter i Larsberg och Dalénum?',
        answer:
          'Ja, en lägenhet på 1–2 rok kostar oftast 499–799 kr och en på 3–4 rok 699–1 199 kr efter RUT-avdrag.',
      },
    ],
  },
  {
    slug: 'ostermalm',
    name: 'Östermalm',
    prep: 'på',
    updatedAt: UPDATED,
    description:
      'Fönsterputs på Östermalm från 499 kr efter RUT-avdrag. Vi putsar sekelskiftesvåningar i Lärkstan, Villastaden och på Gärdet. Begär en offert.',
    content:
      'Östermalm är sekelskiftesvåningar med höga fönster, spröjs och kopplade bågar, men också funkishus på Gärdet och stora våningar i Villastaden. Vi putsar fönster på hela Östermalm med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'De flesta bostäder på Östermalm är lägenheter i stenhus från slutet av 1800-talet och början av 1900-talet, med hög takhöjd och stora fönster. Många har kvar kopplade fönster med innerbågar och spröjs i överdelen. Putsar man mellan glasen blir skillnaden stor, eftersom damm samlas där med åren.',
      'På Gärdet ligger funkishus från 1930-talet med lägenheter i flera våningar, och i Lärkstan och Villastaden finns några av Stockholms mest påkostade sekelskifteshus. Kontor, butiker och restauranger runt Stureplan och Östermalmstorg putsar vi också, med ett återkommande upplägg för skyltfönster.',
    ],
    districts: [
      { name: 'Gärdet', text: 'Funkishus från 1930-talet med lägenheter och balkonger.' },
      { name: 'Lärkstan', text: 'Sekelskiftesvåningar med höga fönster och spröjs.' },
      { name: 'Villastaden', text: 'Stora våningar och villor med många fönster.' },
      { name: 'Karlaplan', text: 'Lägenheter i stenhus kring Karlaplan och Karlavägen.' },
    ],
    tips: [
      'I innerstaden sätter sig sot och avgaser på fönstren mot gatan, och de blir smutsiga betydligt snabbare än fönstren mot gården. Höga sekelskiftesfönster kräver ofta att innerbågen öppnas, så se till att fönsterbänkarna är tomma när vi kommer.',
      'Bor du högt upp och fönstren inte går att öppna inåt, berätta det i förfrågan så vet vi hur vi ska lösa det.',
      'Sekelskiftesvåningar har ofta både salongsfönster, burspråk och små fönster mot ljusgården, och antalet fönster kan vara större än man tror. Räkna varje fönsterbåge när du fyller i formuläret, så blir offerten rätt. Har du innanfönster som tas bort på sommaren, säg till om de ska vara på plats när vi kommer.',
    ],
    priceRows: ['apartmentLarge', 'apartmentSmall'],
    priceNote:
      'En lägenhet på 1–2 rok på Östermalm kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. Stora sekelskiftesvåningar med många kopplade fönster kan kosta mer – du får alltid ett fast pris i offerten.',
    services: ['lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    company: true,
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Djurgården', slug: 'djurgarden' },
      { name: 'Norrmalm', slug: 'norrmalm' },
      { name: 'Lidingö', slug: 'lidingo' },
      { name: 'Kungsholmen', slug: 'kungsholmen' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs för en sekelskiftesvåning på Östermalm?',
        answer:
          'En lägenhet på 3–4 rok kostar oftast 699–1 199 kr efter RUT-avdrag. Större våningar med många kopplade fönster och putsning mellan glasen kan kosta mer. Du får ett fast pris i offerten.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni mellan glasen i höga sekelskiftesfönster?',
        answer:
          'Ja, vi öppnar innerbågen och putsar alla glassidor. Välj ”Utsida + insida + mellan” i formuläret så ingår det.',
      },
      {
        question: 'Hur gör ni med portkod och nyckel?',
        answer:
          'Skriv portkoden i förfrågan. Om du inte är hemma när vi kommer kan vi komma överens om hur vi får tillgång till lägenheten.',
      },
      {
        question: 'Putsar ni skyltfönster åt butiker och restauranger?',
        answer:
          'Ja, vi putsar skyltfönster, entréer och kontorsfönster åt företag på Östermalm, som enstaka uppdrag eller med fasta intervall.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
    ],
  },
  {
    slug: 'djurgarden',
    name: 'Djurgården',
    prep: 'på',
    updatedAt: UPDATED,
    description:
      'Fönsterputs på Djurgården och i Norra Djurgårdsstaden från 499 kr efter RUT-avdrag. Lägenheter i Hjorthagen och Värtahamnen. Begär en offert.',
    content:
      'På Djurgården och i Norra Djurgårdsstaden putsar vi fönster i allt från gamla trähus i Djurgårdsstaden till nya lägenheter med glasväggar i Hjorthagen och Värtahamnen – med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Djurgården har få bostäder men många fönster: små trähus i Djurgårdsstaden från 1700- och 1800-talen, villor och större hus längs vattnet, och restauranger, museer och verksamheter som vill ha rena fönster mot besökarna.',
      'I Norra Djurgårdsstaden – Hjorthagen, Värtahamnen och området kring Ropsten – är husen nya, med stora fönster från golv till tak, glasbalkonger och ofta utsikt mot vattnet. Den typen av fönster syns mycket när de är smutsiga, och de blir det snabbt i ett område där det fortfarande byggs.',
    ],
    districts: [
      { name: 'Djurgårdsstaden', text: 'Gamla trähus med små fönster och spröjs nära Gröna Lund.' },
      { name: 'Norra Djurgårdsstaden', text: 'Nya flerbostadshus med stora glaspartier och glasbalkonger.' },
      { name: 'Hjorthagen', text: 'Både äldre lägenheter och nya kvarter nära Ropsten.' },
      { name: 'Värtahamnen', text: 'Nya bostäder och kontor vid vattnet.' },
    ],
    tips: [
      'Nära vattnet får fönstren mer saltavlagringar och vattenfläckar från blåst och regn. I Norra Djurgårdsstaden kommer byggdamm ovanpå det, så de första åren efter inflyttning kan det behövas en extra putsning.',
      'Fönster från golv till tak och glasbalkonger tar längre tid än vanliga fönster – ange dem i förfrågan så blir offerten rätt.',
      'För restauranger och museer på Djurgården är det fönstren mot gatan och entrén som syns mest under säsongen. För privatpersoner i Norra Djurgårdsstaden är det i stället de stora fönstren mot vattnet och glasbalkongerna som gör mest skillnad. Oavsett vilket räknar vi på antal fönster och glaspartier.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
    priceNote:
      'En lägenhet i Norra Djurgårdsstaden kostar oftast 499–799 kr för 1–2 rok och 699–1 199 kr för 3–4 rok efter RUT-avdrag. Stora glaspartier och glasbalkonger kan påverka priset. Hus på Djurgården får en offert utifrån antal fönster.',
    services: ['lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    company: true,
    guides: ['hur-tvattar-man-inglasade-balkonger', 'hur-ofta-ska-man-putsa-fonster'],
    nearbyAreas: [
      { name: 'Östermalm', slug: 'ostermalm' },
      { name: 'Lidingö', slug: 'lidingo' },
      { name: 'Norrmalm', slug: 'norrmalm' },
      { name: 'Nacka', slug: 'nacka' },
    ],
    faq: [
      {
        question: 'Putsar ni fönster i Norra Djurgårdsstaden?',
        answer:
          'Ja, i hela Norra Djurgårdsstaden – Hjorthagen, Värtahamnen och området kring Ropsten. En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Kan ni putsa fönster från golv till tak och glasbalkonger?',
        answer:
          'Ja, vi putsar stora glaspartier och balkongglas på båda sidor så långt de går att öppna eller nå säkert.',
        linkLabel: 'Så tvättar man inglasade balkonger',
        linkTo: '/guide/hur-tvattar-man-inglasade-balkonger',
      },
      {
        question: 'Putsar ni gamla trähus i Djurgårdsstaden?',
        answer:
          'Ja, varsamt. Äldre fönster med spröjs och gammalt glas putsar vi för hand, och vi säger till om vi ser skador innan vi börjar.',
      },
      {
        question: 'Putsar ni åt restauranger och verksamheter på Djurgården?',
        answer:
          'Ja, vi putsar skyltfönster, entréer och glaspartier åt företag, som enstaka uppdrag eller med fasta intervall under säsongen.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
    ],
  },
  {
    slug: 'kungsholmen',
    name: 'Kungsholmen',
    prep: 'på',
    updatedAt: UPDATED,
    description:
      'Fönsterputs på Kungsholmen från 499 kr efter RUT-avdrag. Lägenheter vid Fridhemsplan, i Stadshagen och Marieberg. Begär en gratis offert.',
    content:
      'Kungsholmen är lägenheter – i stenhus kring Fridhemsplan och Kungsholmstorg, i funkishus i Kristineberg och i nya kvarter vid Hornsbergs strand och i Stadshagen. Vi putsar fönster på hela Kungsholmen med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Nästan alla på Kungsholmen bor i lägenhet. Kring Fridhemsplan, Kungsholmstorg och Norr Mälarstrand finns stenhus från slutet av 1800-talet och början av 1900-talet med höga fönster och kopplade bågar, medan Kristineberg och Marieberg har mer funkis och efterkrigshus med balkonger.',
      'Hornsbergs strand och Stadshagen har byggts ut med nya flerbostadshus, ofta med stora fönster, franska balkonger och inglasade balkonger mot Ulvsundasjön eller Karlbergssjön. Där är det glaspartierna som tar mest tid.',
    ],
    districts: [
      { name: 'Fridhemsplan', text: 'Stenhus med höga fönster och kopplade bågar.' },
      { name: 'Stadshagen', text: 'Både äldre och nya lägenheter nära Karlbergssjön.' },
      { name: 'Hornsbergs strand', text: 'Nya hus med stora glaspartier mot Ulvsundasjön.' },
      { name: 'Kristineberg', text: 'Funkishus och lägenheter med balkonger.' },
    ],
    tips: [
      'Fönster mot de stora gatorna, som Fleminggatan och Drottningholmsvägen, får mer sot och avgaser än fönster mot gården. Fönster mot vattnet ger fin utsikt men får också fler vattenfläckar.',
      'Bor du högt upp i ett äldre hus där fönstren inte går att vända, berätta det i förfrågan så tar vi med rätt utrustning.',
      'Många lägenheter på Kungsholmen har franska balkonger eller fönsterdörrar som går ända ner till golvet. De räknas som fönster i offerten och putsas på både in- och utsida. Bor du i bostadsrätt kan du använda RUT-avdrag för din egen lägenhet, även om föreningen inte kan använda RUT för trapphus och gemensamma ytor.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge'],
    priceNote:
      'En lägenhet på 1–2 rok på Kungsholmen kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. Inglasad balkong och putsning mellan glasen läggs till i offerten.',
    services: ['lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    company: true,
    guides: ['hur-tvattar-man-inglasade-balkonger', 'hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Norrmalm', slug: 'norrmalm' },
      { name: 'Östermalm', slug: 'ostermalm' },
      { name: 'Bromma', slug: 'bromma' },
      { name: 'Solna', slug: 'solna' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs på Kungsholmen?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni inglasade balkonger vid Hornsbergs strand?',
        answer:
          'Ja, vi putsar balkongglasen på båda sidor så långt partierna går att öppna, och fönstren och balkongdörren innanför.',
        linkLabel: 'Så tvättar man inglasade balkonger',
        linkTo: '/guide/hur-tvattar-man-inglasade-balkonger',
      },
      {
        question: 'Hur snabbt får jag en offert?',
        answer:
          'Skicka in förfrågan så återkommer vi med en offert och förslag på tider, oftast inom ett par dagar.',
      },
      {
        question: 'Putsar ni fönster åt kontor på Kungsholmen?',
        answer:
          'Ja, vi putsar kontorsfönster, entréer och skyltfönster åt företag, som enstaka uppdrag eller med fasta intervall.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
    ],
  },
  {
    slug: 'norrmalm',
    name: 'Norrmalm',
    prep: 'på',
    updatedAt: UPDATED,
    description:
      'Fönsterputs på Norrmalm från 499 kr efter RUT-avdrag. Lägenheter och kontor i Vasastan, City och Klara. Begär en kostnadsfri offert idag.',
    content:
      'På Norrmalm putsar vi fönster i sekelskiftesvåningar i Vasastan, nya lägenheter i Hagastaden och kontor och butiker i City och Klara. Fast pris och RUT-avdrag direkt på fakturan för privatpersoner.',
    housing: [
      'Vasastan är stenhus från 1880-talet och framåt, med höga fönster, kopplade bågar och ofta spröjs i överdelen. Kring Odenplan, Sankt Eriksplan och i Birkastan bor de flesta i lägenhet flera trappor upp, och fönstren mot gatan blir snabbt grå av trafiken.',
      'Hagastaden är ett nytt område med moderna hus och stora glaspartier. I City och Klara är det mest kontor, butiker och restauranger, där rena skyltfönster och entréer är en del av intrycket. För företag lägger vi upp ett återkommande schema.',
    ],
    districts: [
      { name: 'Vasastan', text: 'Sekelskiftesvåningar kring Odenplan och Sankt Eriksplan.' },
      { name: 'Birkastan', text: 'Lägenheter i stenhus med höga fönster och gårdar.' },
      { name: 'Hagastaden', text: 'Nya lägenheter med stora glaspartier.' },
      { name: 'City och Klara', text: 'Kontor, butiker och restauranger med skyltfönster.' },
    ],
    tips: [
      'Fönster mot de stora gatorna, som Sveavägen och Odengatan, får mest sot och avgaser. Vill du hålla nere kostnaden kan du låta oss putsa fönstren mot gatan oftare och fönstren mot gården mer sällan.',
      'I äldre hus med kopplade fönster ger putsning mellan glasen mest skillnad – det är där dammet samlas.',
      'I Vasastan är det vanligt med gårdshus och fönster mot trånga ljusgårdar, där fönstren sällan får regn och smutsen sitter kvar längre. Det är ofta där skillnaden syns mest efter en putsning. Har du fönster både mot gatan och mot gården kan du välja att putsa alla eller bara de som syns mest.',
    ],
    priceRows: ['apartmentSmall', 'apartmentLarge'],
    priceNote:
      'En lägenhet på 1–2 rok i Vasastan kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. Företag i City och Klara får en offert utan RUT-avdrag utifrån lokalens fönster.',
    services: ['lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    company: true,
    guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Östermalm', slug: 'ostermalm' },
      { name: 'Kungsholmen', slug: 'kungsholmen' },
      { name: 'Solna', slug: 'solna' },
      { name: 'Djurgården', slug: 'djurgarden' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Vasastan?',
        answer:
          'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. Putsning mellan glasen i kopplade fönster tas med i offerten.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni skyltfönster i City?',
        answer:
          'Ja, vi putsar skyltfönster, entréer och kontorsfönster åt butiker, restauranger och kontor i City och Klara.',
        linkLabel: 'Fönsterputs för företag',
        linkTo: '/foretag',
      },
      {
        question: 'Kan ni putsa fönster som bara går att öppna utåt eller inte alls?',
        answer:
          'Fönster som går att öppna putsar vi på båda sidor. Fasta fönster högt upp putsar vi från balkongen eller med teleskopskaft där det går säkert. Beskriv fönstren i förfrågan.',
      },
      {
        question: 'Vad behöver jag tänka på i en äldre lägenhet?',
        answer:
          'Töm fönsterbänkarna och se till att innerbågarna går att öppna. Sitter de fast av gammal färg säger vi till innan vi försöker öppna dem.',
      },
    ],
  },
  {
    slug: 'nacka',
    name: 'Nacka',
    updatedAt: UPDATED,
    description:
      'Fönsterputs i Nacka från 499 kr efter RUT-avdrag. Villor och lägenheter i Saltsjöbaden, Saltsjö-Boo, Sickla och Nacka Strand. Begär en offert.',
    content:
      'Nacka har sekelskiftesvillor i Saltsjöbaden, villor och radhus i Saltsjö-Boo och nya lägenheter i Sickla och Nacka Strand. Vi putsar fönster i hela Nacka med fast pris och RUT-avdrag direkt på fakturan.',
    housing: [
      'Saltsjöbaden byggdes som villasamhälle kring sekelskiftet 1900, och här finns stora villor med verandor, spröjs och fönster mot Baggensfjärden. I Saltsjö-Boo, Lännersta och Älta är det villor och radhus från olika decennier, ofta med stora fönster mot trädgård och skog.',
      'Sickla, Nacka Strand och området kring Järla sjö har byggts ut med flerbostadshus med stora glaspartier och balkonger, och i Orminge och Fisksätra finns lägenheter i större flerbostadshus.',
    ],
    districts: [
      { name: 'Saltsjöbaden', text: 'Sekelskiftesvillor och hus nära vattnet.' },
      { name: 'Saltsjö-Boo', text: 'Villor och radhus med trädgårdar.' },
      { name: 'Sickla', text: 'Nya lägenheter och kontor.' },
      { name: 'Nacka Strand', text: 'Lägenheter och kontor vid vattnet med stora glaspartier.' },
    ],
    tips: [
      'Hus nära Saltsjön och Baggensfjärden får saltavlagringar och vattenfläckar på fönstren mot vattnet. I villaområden med mycket skog, som Boo och Älta, är det pollen och barr som syns mest.',
      'Nybyggda hus i Sickla kan behöva en extra putsning efter inflyttningen, när byggdammet har lagt sig.',
      'I Nacka ligger många villor i kuperad terräng, med fönster på olika höjd beroende på hur huset står i slänten. Fönster som sitter högt på utsidan men går att öppna inåt putsar vi inifrån där det går. Berätta om det finns fönster som är svåra att nå, så tar vi med rätt utrustning.',
    ],
    priceRows: ['house', 'apartmentSmall', 'apartmentLarge'],
    priceNote:
      'En villa i Saltsjöbaden eller Saltsjö-Boo kostar oftast 800–2 000 kr efter RUT-avdrag, och stora villor med många spröjsade fönster kostar mer. En lägenhet i Sickla eller Nacka Strand kostar från 499 kr.',
    services: ['villa-fonsterputs', 'lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
    guides: ['hur-ofta-ska-man-putsa-fonster', 'hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026'],
    nearbyAreas: [
      { name: 'Lidingö', slug: 'lidingo' },
      { name: 'Djurgården', slug: 'djurgarden' },
      { name: 'Östermalm', slug: 'ostermalm' },
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Nacka?',
        answer:
          'En villa kostar oftast 800–2 000 kr efter RUT-avdrag och en lägenhet 499–1 199 kr beroende på storlek.',
        linkLabel: 'Se prislistan',
        linkTo: '/pris',
      },
      {
        question: 'Putsar ni stora sekelskiftesvillor i Saltsjöbaden?',
        answer:
          'Ja, vi putsar villor med spröjs, verandor och fönster på flera plan. Större villor får en offert utifrån antal fönster.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Hur ofta behöver fönster nära vattnet putsas?',
        answer:
          'Fönster mot vattnet kan behöva putsas oftare än två gånger om året eftersom salt och vattenfläckar sätter sig. Med abonnemang kan du välja tre eller fyra gånger om året.',
        linkLabel: 'Läs om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
      {
        question: 'Putsar ni nybyggda lägenheter i Sickla?',
        answer:
          'Ja, vi putsar fönster och balkongglas i nya lägenheter. En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag.',
      },
    ],
  },
];

export default areas;
