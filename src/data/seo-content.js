import areas from './areas-content.js';

const siteSeoContent = {
  home: {
    updatedAt: '2026-10-31',
    title: 'Fönsterputs Stockholm — Från 499 kr | Boka med RUT-avdrag',
    description:
      '✓ Professionell fönsterputs i Stockholm från 499 kr ✓ RUT-avdrag 50% ✓ Boka enkelt online. Vi putsar fönster i hela Stockholmsområdet.',
    bodyTitle: 'Fönsterputs i Stockholm',
    bodyIntro:
      'Vi erbjuder professionell fönsterputsning i Stockholm för privatpersoner och företag. Med RUT-avdrag börjar priset från 499 kr och du fyller enkelt i en förfrågan så återkommer vi med en personlig offert. När du bokar hos Rutputs får du erfarna fönsterputsare som arbetar i ditt område.',
    faq: [
      {
        question: 'Vad kostar fönsterputsning med RUT-avdrag?',
        answer:
          'Fönsterputsning med RUT-avdrag börjar från 499 kr. Det exakta priset beror på antal fönster och typ av bostad. Fyll i offertformuläret så återkommer vi med en personlig offert.',
        linkLabel: 'Begär offert',
        linkTo: '/pris',
      },
      {
        question: 'Vilka områden täcker ni?',
        answer: `Vi arbetar i stora delar av Stockholm: ${areas.map((area) => area.name).join(', ')}. Fyll i formuläret för att se om vi kan hjälpa dig där du bor.`,
        links: areas.map((area) => ({ label: area.name, to: `/omrade/${area.slug}` })),
      },
      {
        question: 'Hur bokar jag fönsterputsning?',
        answer:
          'Fyll i offertformuläret så återkommer vi med en personlig offert. Vi kontaktar dig sedan för att boka en tid som passar.',
        linkLabel: 'Begär offert',
        linkTo: '/pris',
      },
      {
        question: 'Erbjuder ni abonnemang för återkommande fönsterputs?',
        answer:
          'Ja, du kan få hjälp både med enstaka puts och med återkommande abonnemang. Om du vill att vi kommer löpande tar vi fram ett upplägg som passar bostad, säsong och hur ofta du vill ha putsat.',
        linkLabel: 'Läs mer om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
      {
        question: 'Putsar ni både villor och lägenheter?',
        answer:
          'Ja, vi arbetar med både villor, radhus och lägenheter och anpassar upplägget efter bostaden. Läs mer på respektive tjänstesida för detaljer om vad som ingår.',
        links: [
          { label: 'Fönsterputs för villa', to: '/tjanst/villa-fonsterputs' },
          { label: 'Fönsterputs för lägenhet', to: '/tjanst/lagenhet-fonsterputs' },
          { label: 'Abonnemang', to: '/tjanst/abonnemang-fonsterputs' },
        ],
      },
      {
        question: 'Putsar ni även företagsfönster?',
        answer:
          'Ja, vi erbjuder professionell fönsterputsning för kontor och företagslokaler i stora delar av Stockholm. Kontakta oss för en offert.',
        linkLabel: 'Läs mer om fönsterputs för företag',
        linkTo: '/foretag',
      },
      {
        question: 'Tar ni med egen stege och annat material?',
        answer:
          'Ja, vi har med oss allt som behövs. Se bara till att det är möjligt att komma åt fönstren, så fixar vi resten.',
      },
      {
        question: 'Får man rabatt om man bokar tillsammans med en granne?',
        answer:
          'Ja, när du och en granne bokar samma dag i samma område får ni båda rabatt på er bokning. Skriv bara i din förfrågan att ni vill boka tillsammans, så lägger vi upp ett gemensamt besök och justerar priset åt er båda.',
        linkLabel: 'Begär offert tillsammans',
        linkTo: '/pris',
      },
    ],
  },
  company: {
    updatedAt: '2026-10-31',
    title: 'Fönsterputs företag Stockholm – kontor och butik | Rutputs',
    description:
      'Professionell fönsterputs för företag i Stockholm. Flexibla avtal, regelbunden service och rena fönster för kontor, lokaler och skyltfönster.',
    bodyTitle: 'Fönsterputs för företag',
    bodyIntro:
      'Vi hjälper företag, kontor, butiker och mindre fastigheter i Stockholm med professionell fönsterputsning. Tjänsten kan anpassas som abonnemang eller punktinsats för återkommande intervaller, skyltfönster och tydliga serviceupplägg.',
    benefits: [
      'Regelbunden service och flexibla avtal.',
      'Rena fönster som förbättrar intrycket för kunder och personal.',
      'Smidig kontakt och tydliga offerter.',
    ],
    faq: [
      {
        question: 'Erbjuder ni återkommande fönsterputs för företag?',
        answer:
          'Ja, vi kan hjälpa företag med både enstaka uppdrag och återkommande upplägg beroende på lokal, behov och önskat intervall.',
      },
      {
        question: 'Arbetar ni bara i norra Stockholm?',
        answer:
          'Nej. Vi utgår från norra Stockholm, där vi redan arbetar löpande, men du är välkommen att höra av dig även från andra delar av stan. Fyll i formuläret så ser vi om vi kan hjälpa dig.',
      },
      {
        question: 'Hur får man en offert?',
        answer:
          'Kontakta oss via uppgifterna på sidan så går vi igenom lokal, omfattning och önskat upplägg innan vi lämnar offert.',
      },
      {
        question: 'Går det att få abonnemang för löpande fönsterputs?',
        answer:
          'Ja, vi kan lägga upp abonnemang eller andra återkommande upplägg för företag som vill ha rena fönster på fasta intervaller. Upplägget anpassas efter lokal, tillgänglighet och hur ofta ni vill ha putsat.',
      },
      {
        question: 'Putsar ni även skyltfönster för butiker och verksamheter?',
        answer:
          'Ja, vi hjälper även butiker och verksamheter med putsning av skyltfönster. Det passar bra både som återkommande upplägg och inför perioder när du vill att entré och skyltläge ska ge ett extra välskött intryck.',
      },
      {
        question: 'Tar ni med eget material?',
        answer:
          'Ja, vi har med oss allt som behövs. Du behöver bara se till att fönstren går att komma åt.',
      },
    ],
  },
  price: {
    updatedAt: '2026-10-31',
    title: 'Fönsterputs pris Stockholm 2026 – vad kostar det? | Rutputs',
    description:
      'Vad kostar fönsterputs i Stockholm? Lägenhet från 499 kr och villa från 799 kr efter RUT-avdrag. Fast pris inkl. moms – se pristabellen och begär offert.',
    bodyTitle: 'Vad kostar fönsterputs i Stockholm?',
    bodyIntro:
      'Fönsterputs kostar från 499 kr efter RUT-avdrag. En lägenhet på 1–2 rok kostar oftast 499–799 kr, en trea eller fyra 699–1 199 kr och en normalstor villa 799–2 199 kr.',
    steps: [
      'Välj bostadstyp.',
      'Ange antal fönster, sidor och eventuell spröjs.',
      'Fyll i dina uppgifter och skicka in din förfrågan.',
    ],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Stockholm?',
        answer:
          'Fönsterputs kostar från 499 kr efter RUT-avdrag. En lägenhet på 1–2 rok kostar oftast 499–799 kr, en lägenhet på 3–4 rok 699–1 199 kr och en normalstor villa 799–2 199 kr. Det exakta priset beror på antal fönster, vilka sidor som ska putsas och om fönstren har spröjs.',
      },
      {
        question: 'Vad kostar fönsterputs för en lägenhet?',
        answer:
          'En etta eller tvåa kostar oftast 499–799 kr efter RUT-avdrag och en trea eller fyra 699–1 199 kr. Inglasad balkong och spröjsade fönster läggs till i offerten.',
        linkLabel: 'Fönsterputs för lägenhet',
        linkTo: '/tjanst/lagenhet-fonsterputs',
      },
      {
        question: 'Vad kostar fönsterputs för en villa?',
        answer:
          'En normalstor villa kostar oftast 799–2 199 kr efter RUT-avdrag. Radhus med färre fönster hamnar lägre, stora villor med många spröjsade fönster högre.',
        linkLabel: 'Fönsterputs för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Hur mycket kostar fönsterputs per timme?',
        answer:
          'Vi tar inte betalt per timme. Du får ett fast pris per uppdrag i offerten, räknat på antal fönster och vad som ska putsas, och det ändras inte om jobbet tar längre tid.',
      },
      {
        question: 'Vad kostar fönsterputs med och utan RUT-avdrag?',
        answer:
          'Med RUT-avdrag betalar du halva priset. Priset utan RUT-avdrag är alltså det dubbla: en lägenhet på 1–2 rok kostar 998–1 598 kr utan avdrag och 499–799 kr med avdrag. Avdraget dras direkt på fakturan.',
        linkLabel: 'Så fungerar RUT-avdraget',
        linkTo: '/guide/rut-avdrag-fonsterputs-2026',
      },
      {
        question: 'Ingår moms i priserna?',
        answer:
          'Ja, alla priser är inklusive moms. Allt material ingår också, så priset i offerten är det du betalar.',
      },
      {
        question: 'Finns det ett lägsta pris?',
        answer:
          'Ja, det lägsta priset är 499 kr efter RUT-avdrag per tillfälle. Bokar du tillsammans med en granne samma dag får ni båda rabatt.',
      },
      {
        question: 'Hur snabbt får jag en offert?',
        answer:
          'När du har skickat in din förfrågan tittar vi på dina uppgifter och återkommer med en personlig offert så snart som möjligt, oftast inom ett par dagar.',
      },
      {
        question: 'Kan jag få återkommande fönsterputs via abonnemang?',
        answer:
          'Ja, om du vill ha återkommande fönsterputs kan vi hjälpa dig med ett abonnemang eller ett löpande upplägg. Skicka in din förfrågan så återkommer vi med ett förslag som passar dig.',
        linkLabel: 'Läs mer om abonnemang',
        linkTo: '/tjanst/abonnemang-fonsterputs',
      },
      {
        question: 'Är det bindande att skicka in formuläret?',
        answer:
          'Nej, det är kostnadsfritt och inte bindande att skicka in formuläret. Vi hör av oss efteråt med en offert och för att bestämma en tid som passar.',
      },
    ],
  },
  services: [
    {
      slug: 'villa-fonsterputs',
      updatedAt: '2026-10-31',
      name: 'Villa-fönsterputs',
      title: 'Fönsterputs villa & hus i Stockholm – pris med RUT | Rutputs',
      description:
        'Fönsterputs för villa och hus i Stockholm från 499 kr efter RUT-avdrag. Spröjs, uterum och takfönster tas med i offerten. Begär ett fast pris.',
      bodyTitle:
        'Fönsterputs för villa och hus i Stockholm',
      bodyIntro:
        'Villor och hus har fler fönster än lägenheter, ofta med spröjs, altandörrar, uterum och fönster på övervåningen. Vi putsar fönster i villor, radhus och parhus i stora delar av Stockholm, med fast pris efter RUT-avdrag och allt material inräknat.',
      priceHeading: 'Vad kostar fönsterputs för en villa?',
      priceRows: ['house'],
      priceNote: 'En normalstor villa kostar oftast 799–2 199 kr efter RUT-avdrag. Ett radhus eller parhus med färre fönster hamnar i den lägre delen, en stor villa med många spröjsade fönster och flera plan i den övre. Du får alltid ett fast pris innan vi kommer – vi tar inte betalt per timme.',
      sections: [
        {
          heading: 'Fönster vi putsar i villor och hus',
          paragraphs: [
            'Vi putsar alla vanliga fönstertyper i hus: spröjsade fönster, kopplade fönster med innerbågar där vi putsar alla fyra glassidorna, moderna treglasfönster, takfönster och takkupor, altandörrar och skjutpartier, glasverandor, uterum och källarfönster.',
            'Fönster på övervåningen som inte går att vända inåt putsar vi från stege. Har huset fönster som är svåra att nå, till exempel över en altan eller i en slänt, berätta det i förfrågan så tar vi med rätt utrustning.',
          ],
        },
        {
          heading: 'Så går fönsterputs av ett hus till',
          paragraphs: [
            'Du fyller i bostadstyp, antal fönster och vad som ska putsas i formuläret och får en offert med fast pris. Vi bokar en tid som passar och tar med stege, skrapor och miljövänligt rengöringsmedel.',
            'Utsidan kan vi putsa även om du inte är hemma. Ska vi putsa insidan och mellan glasen behöver vi komma in, och det underlättar om fönsterbänkarna är tomma. RUT-avdraget dras direkt på fakturan.',
          ],
        },
        {
          heading: 'Hur ofta ska man putsa fönster på en villa?',
          paragraphs: [
            'För de flesta hus räcker två gånger om året: på våren när pollen och vinterns smuts syns som mest, och på hösten innan det mörka halvåret. Ligger huset nära vatten, en större väg eller mycket träd kan fönstren på den sidan behöva putsas oftare.',
            'Vill du slippa boka varje gång kan du ha ett abonnemang med två, tre eller fyra putsningar om året och lägre pris per tillfälle.',
          ],
        },
      ],
      guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
      areas: ['bromma', 'danderyd', 'djursholm', 'taby', 'sollentuna', 'lidingo', 'viksjo', 'enebyberg', 'hasselby', 'nacka'],
      benefits: [
        'Fast pris efter antal fönster – en normalstor villa kostar oftast 799–2 199 kr efter RUT-avdrag.',
        'Allt material ingår – vi tar med stege, skrapor och miljövänligt rengöringsmedel.',
        'Spröjsade, kupolfönster och takfönster – inga problem.',
        'Säkert utfört – F-skatt, försäkrad och godkänd för RUT.',
        'Jämn kvalitet vid varje besök om du tecknar abonnemang.',
      ],
      faq: [
        {
          question: 'Vad kostar fönsterputs på en villa?',
          answer: 'En normalstor villa kostar oftast 799–2 199 kr efter RUT-avdrag och 1 598–4 398 kr utan avdrag. Priset beror på antal fönster, spröjs och om du vill ha putsat mellan glasen. Begär offert för exakt pris.',
          linkLabel: 'Begär offert',
          linkTo: '/pris',
        },
        {
          question: 'Putsar ni även spröjsade fönster?',
          answer:
            'Ja, spröjsade fönster ingår. Det tar lite längre tid men vi prissätter det tydligt i offerten så du vet vad du betalar.',
        },
        {
          question: 'Hur ofta bör man putsa fönstren på en villa?',
          answer:
            'För de flesta villor räcker det med två gånger per år – på våren när pollen och saltskador syns mest, och på hösten innan vintern. Abonnemangskunder får en automatisk planering.',
        },
        {
          question: 'Kommer ni till min villa även om jag inte är hemma?',
          answer:
            'Ja, vi kan komma överens om att vi putsar utsidan medan du är på jobbet. Många villakunder väljer det upplägget.',
        },
        {
          question: 'Vad kostar fönsterputs för ett radhus?',
          answer: 'Ett radhus har oftast färre fönster än en villa och hamnar därför i den lägre delen av spannet 799–2 199 kr efter RUT-avdrag. Du får ett fast pris i offerten.',
        },
        {
          question: 'Putsar ni takfönster och uterum?',
          answer: 'Ja, takfönster som går att öppna inifrån och uterum och glasverandor putsar vi på både in- och utsida. Ta med dem i förfrågan så blir priset rätt.',
        },
      ],
    },
    {
      slug: 'lagenhet-fonsterputs',
      updatedAt: '2026-10-31',
      name: 'Lägenhets-fönsterputs',
      title: 'Fönsterputs lägenhet Stockholm – från 499 kr | Rutputs',
      description:
        'Fönsterputs för lägenhet i Stockholm. Från 499 kr med RUT-avdrag. Smidig bokning, snabbt klart, vi tar med allt material.',
      bodyTitle: 'Fönsterputs för lägenhet i Stockholm',
      bodyIntro:
        'För lägenheter går putsningen ofta snabbt och smidigt, men det är ändå viktigt att den görs noggrant – särskilt i innerstaden där sot och avgaser sätter sig på rutorna. Vi putsar lägenhetsfönster i stora delar av Stockholm – från Kungsholmen, Norrmalm och Östermalm till Solna, Bromma och övriga områden vi täcker – med RUT-avdrag och kan ofta erbjuda tid samma vecka.',
      priceHeading: 'Vad kostar fönsterputs för en lägenhet?',
      priceRows: ['apartmentSmall', 'apartmentLarge'],
      priceNote: 'En lägenhet på 1–2 rok kostar oftast 499–799 kr efter RUT-avdrag och en på 3–4 rok 699–1 199 kr. Inglasad balkong, spröjs och putsning mellan glasen tas med i offerten.',
      sections: [
        {
          heading: 'Fönster vi putsar i lägenheter',
          paragraphs: [
            'Vi putsar vanliga fönster, balkongdörrar, franska balkonger och fönster från golv till tak, och inglasade balkonger på både in- och utsida så långt partierna går att öppna.',
            'I äldre hus med kopplade fönster putsar vi gärna mellan glasen. Fönster högt upp som inte går att vända inåt putsar vi från balkongen eller med teleskopskaft där det går säkert.',
          ],
        },
      ],
      guides: ['hur-tvattar-man-inglasade-balkonger', 'rut-avdrag-fonsterputs-2026', 'hur-ofta-ska-man-putsa-fonster'],
      areas: ['kungsholmen', 'ostermalm', 'norrmalm', 'solna', 'sundbyberg', 'kista', 'djurgarden'],
      benefits: [
        'Från 499 kr efter RUT-avdrag.',
        'Inomhus, utomhus och mellan glaspartier – välj själv.',
        'Funkar även på höga våningar – vi har säkerhetsutrustning för fönster som inte går att vända.',
        'Smidig nyckelhantering om du är på jobbet.',
        'Rabatt om du och en granne i samma hus bokar samma dag.',
      ],
      faq: [
        {
          question: 'Vad kostar fönsterputs i en lägenhet?',
          answer: 'En lägenhet på 1–2 rok kostar oftast 499–799 kr och en på 3–4 rok 699–1 199 kr efter RUT-avdrag. Inglasad balkong och putsning mellan glasen läggs till i offerten.',
          linkLabel: 'Begär offert',
          linkTo: '/pris',
        },
        {
          question: 'Putsar ni även insidan av lägenhetsfönster?',
          answer:
            'Ja, du väljer själv om vi ska putsa både inne och ute eller bara utsidan. Båda alternativen kan du ange i offertförfrågan.',
        },
        {
          question: 'Kan jag boka även om jag bor på 5:e våningen?',
          answer:
            'Ja. För fönster som inte går att vända inåt använder vi särskild teleskoputrustning eller arbetar från balkongen där det går säkert.',
        },
        {
          question: 'Får jag rabatt om grannen också bokar?',
          answer:
            'Ja, när du och en granne bokar samma dag i samma fastighet får ni båda rabatt. Skriv det i förfrågan.',
        },
      ],
    },
    {
      slug: 'varputs',
      updatedAt: '2026-10-31',
      name: 'Vårputs',
      title: 'Vårputs av fönster i Stockholm – boka med RUT | Rutputs',
      description:
        'Boka vårputsning av fönstren i Stockholm. RUT-avdrag från 499 kr. Få bort pollen, saltskador och vintersmuts inför sommaren. Smidig bokning online.',
      bodyTitle: 'Vårputs av fönster i Stockholm',
      bodyIntro:
        'Vintern lämnar tydliga spår på fönstren: saltdamm, regnränder och pollen som lagrats sedan första marsdagarna. En vårputs är det snabbaste sättet att få hem och kontor att kännas ljusare när solen börjar visa sig på riktigt. Boka in din vårputsning nu så hinner du få en bra tid innan högsäsongen i maj.',
      priceHeading: 'Vad kostar vårputs av fönster?',
      priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
      priceNote: 'Vårputs kostar lika mycket som vanlig fönsterputs: en lägenhet från 499 kr och en normalstor villa 799–2 199 kr efter RUT-avdrag. Bokar du med en granne samma dag får ni båda rabatt.',
      guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
      areas: ['jarfalla', 'bromma', 'sollentuna', 'taby', 'solna', 'lidingo'],
      benefits: [
        'Få bort pollen, saltskador och vintersmuts på en gång.',
        'Fönstren släpper in upp till 30 % mer ljus efter en grundlig vårputs.',
        'Boka nu och säkra en tid innan högsäsong (mitten av maj).',
        'RUT-avdrag direkt på priset – från 499 kr.',
        'Granne-rabatt om ni bokar samma dag i samma område.',
      ],
      faq: [
        {
          question: 'När är bäst att boka vårputs?',
          answer:
            'Mellan mitten av april och slutet av maj är populärast. Boka helst 2–3 veckor i förväg för att få en tid som passar, särskilt under maj.',
        },
        {
          question: 'Vad skiljer en vårputs från vanlig fönsterputs?',
          answer:
            'Innehållsmässigt är det samma noggranna fönsterputsning, men vi är extra uppmärksamma på vintersmuts, saltavlagringar och pollenlager som sätter sig under den kallare halvan av året.',
        },
        {
          question: 'Hinner jag boka till maj?',
          answer:
            'Det beror på när du läser detta. Skicka in din förfrågan så återkommer vi inom kort med offert och tillgängliga tider.',
          linkLabel: 'Begär offert',
          linkTo: '/pris',
        },
        {
          question: 'Får jag RUT-avdrag även på vårputs?',
          answer:
            'Ja, RUT-avdraget gäller fönsterputsning året om för privatpersoner som uppfyller Skatteverkets villkor.',
        },
      ],
    },
    {
      slug: 'hostputs',
      updatedAt: '2026-10-31',
      name: 'Höstputs',
      title: 'Höstputs av fönster i Stockholm – boka med RUT | Rutputs',
      description:
        'Boka höstputsning av fönstren i Stockholm. RUT-avdrag från 499 kr. Få bort sommarens damm, regnränder och insekter inför vintern. Smidig bokning online.',
      bodyTitle: 'Höstputs av fönster i Stockholm',
      bodyIntro:
        'När mörkret kryper in tidigare på dagen blir varje smutsig fönsterruta extra tydlig. Med en höstputs får du bort sommarens damm, regnränder och insektsspår innan vintern slår till. Det ger ljusare rum, bättre utsikt och en känsla av att hemmet är förberett för den mörkare halvan av året.',
      priceHeading: 'Vad kostar höstputs av fönster?',
      priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
      priceNote: 'Höstputs kostar lika mycket som vanlig fönsterputs: en lägenhet från 499 kr och en normalstor villa 799–2 199 kr efter RUT-avdrag. Bokar du med en granne samma dag får ni båda rabatt.',
      guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
      areas: ['jarfalla', 'bromma', 'sollentuna', 'taby', 'solna', 'lidingo'],
      benefits: [
        'Maximera ljusinsläppet under den mörka årstiden.',
        'Bli av med damm, regnränder och insektsspår från sommaren.',
        'Bra läge att passa på innan första frosten kommer.',
        'RUT-avdrag direkt på priset – från 499 kr.',
        'Kombinera gärna med abonnemang för en automatisk vårputs nästa år.',
      ],
      faq: [
        {
          question: 'När är bäst att boka höstputs?',
          answer:
            'Från mitten av september till slutet av oktober. Många väljer en sista helg innan första frosten, men putsning fungerar bra hela hösten.',
        },
        {
          question: 'Behöver jag putsa fönstren även på hösten?',
          answer:
            'Många gör bara vårputs, men en höstputs gör en stor skillnad under den mörka delen av året, då varje droppe ljus räknas. Sotpartiklar och regnskvätt sätter sig också tydligare under hösten.',
        },
        {
          question: 'Kan jag teckna abonnemang som börjar med höstputs?',
          answer:
            'Ja, många kunder börjar med en höstputs och tecknar sedan abonnemang för automatisk vårputs nästa år.',
          linkLabel: 'Läs mer om abonnemang',
          linkTo: '/tjanst/abonnemang-fonsterputs',
        },
        {
          question: 'Tar det längre tid att göra höstputs?',
          answer:
            'Nej, det är samma jobb som vanlig fönsterputsning. Tidsåtgången beror på antalet fönster och tillgängligheten.',
        },
      ],
    },
    {
      slug: 'abonnemang-fonsterputs',
      updatedAt: '2026-10-31',
      name: 'Abonnemang för fönsterputs',
      contactOnly: true,
      title: 'Fönsterputs abonnemang Stockholm – privatpersoner | Rutputs',
      description:
        'Abonnemang på fönsterputs i Stockholm för privatpersoner. Fasta intervall, lägre pris per besök och RUT-avdrag varje gång. Ingen bindningstid.',
      bodyTitle:
        'Abonnemang på fönsterputs i Stockholm för privatpersoner',
      bodyIntro:
        'Med ett abonnemang på fönsterputsning slipper du hålla reda på när det är dags igen. Du väljer hur många gånger om året du vill ha putsat, vi bokar in varje tillfälle och du får lägre pris per gång än vid enstaka bokningar – med RUT-avdrag varje gång och utan bindningstid.',
      priceHeading: 'Vad kostar ett abonnemang på fönsterputs?',
      priceRows: ['apartmentSmall', 'apartmentLarge', 'house'],
      priceNote: 'Priset per tillfälle utgår från samma prislista som vid enstaka bokningar, med rabatt för abonnemang. Hur stor rabatten blir beror på intervall och bostad, och du får priset i offerten. RUT-avdraget dras vid varje besök.',
      sections: [
        {
          heading: 'Så fungerar abonnemanget',
          paragraphs: [
            'Ring, mejla eller skriv i offertformuläret att du vill ha abonnemang. Vi tar fram ett förslag med intervall och pris per tillfälle utifrån din bostad.',
            'När upplägget är klart bokar vi in varje putsning åt dig, så du slipper komma ihåg när det är dags. Vill du pausa, ändra intervall eller avsluta säger du bara till innan nästa besök – det finns ingen bindningstid.',
          ],
        },
        {
          heading: 'Vilket intervall passar dig?',
          paragraphs: [
            'Två gånger om året – vår och höst – räcker för de flesta lägenheter och villor.',
            'Tre gånger om året passar hus nära vatten eller större vägar, där fönstren blir smutsiga snabbare, och dig som vill ha rena fönster även på sommaren.',
            'Fyra gånger om året ger rena fönster varje säsong och passar till exempel stora villor med mycket glas eller hem där utsikten är viktig.',
          ],
        },
        {
          heading: 'Abonnemang för lägenhet, villa och radhus',
          paragraphs: [
            'Abonnemanget fungerar i alla boendeformer och i alla områden vi täcker. Bor ni flera grannar i samma hus eller radhuslänga kan ni ha putsning samma dag och få rabatt allihop.',
            'För företag finns motsvarande återkommande upplägg för kontor, butiker och skyltfönster.',
          ],
        },
      ],
      company: true,
      guides: ['hur-ofta-ska-man-putsa-fonster', 'rut-avdrag-fonsterputs-2026'],
      areas: ['jarfalla', 'bromma', 'sollentuna', 'taby', 'danderyd', 'lidingo', 'solna', 'ostermalm'],
      benefits: [
        'Spara tid – vi bokar in nästa tillfälle automatiskt.',
        'Lägre pris per tillfälle jämfört med engångsbokning.',
        'Välj intervall: 2, 3 eller 4 gånger per år.',
        'Jämn kvalitet varje gång – vi lär oss hur du vill ha det.',
        'RUT-avdrag dras på varje besök för privatpersoner.',
      ],
      faq: [
        {
          question: 'Kan jag avbryta abonnemanget när jag vill?',
          answer:
            'Ja, det är inte bindande. Du kan pausa eller avsluta abonnemanget när du vill – säg bara till innan nästa planerade besök.',
        },
        {
          question: 'Hur stor är rabatten på abonnemang?',
          answer:
            'Rabatten varierar beroende på intervall och bostad. Det enklaste är att fylla i offertformuläret och skriva i meddelandet att du vill ha abonnemangsförslag, så återkommer vi med pris.',
          linkLabel: 'Få abonnemangsförslag',
          linkTo: '/pris',
        },
        {
          question: 'Funkar abonnemang för företag också?',
          answer:
            'Ja, många av våra företagskunder har återkommande upplägg. Kontakta oss så lägger vi en plan som passar lokalen.',
          linkLabel: 'Fönsterputs för företag',
          linkTo: '/foretag',
        },
        {
          question: 'Vilka områden gäller abonnemanget?',
          answer:
            'Abonnemang erbjuds i alla områden vi täcker – från Järfälla och Sollentuna till Östermalm och Nacka.',
        },
        {
          question: 'Hur många gånger om året kan jag välja?',
          answer: 'Du väljer två, tre eller fyra gånger om året. Vår och höst räcker för de flesta, och fler gånger passar om fönstren blir smutsiga snabbt.',
        },
        {
          question: 'Får jag RUT-avdrag vid varje besök?',
          answer: 'Ja, RUT-avdraget dras på fakturan för varje putsning, så du betalar halva priset varje gång.',
          linkLabel: 'Så fungerar RUT-avdraget',
          linkTo: '/guide/rut-avdrag-fonsterputs-2026',
        },
      ],
    },
  ],
  privacy: {
    updatedAt: '2026-10-31',
    title: 'Integritetspolicy | Rutputs',
    description:
      'Läs om hur Rutputs hanterar dina personuppgifter, cookies och webbanalys i enlighet med GDPR.',
    bodyTitle: 'Integritetspolicy',
    bodyIntro:
      'Här kan du läsa hur vi på Rutputs hanterar personuppgifter, cookies och webbanalys i enlighet med GDPR.',
  },
  areas,
};

export default siteSeoContent;
