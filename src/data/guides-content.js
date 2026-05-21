/**
 * Guide content for the /guide section.
 *
 * Stored as plain JS so it can be consumed by both the Vue app (via guides.ts
 * type wrapper) and the Node prerender script (scripts/prerender-routes.mjs).
 *
 * Schema mirrors the Guide interface defined in guides.ts.
 */

const guides = [
  {
    slug: 'hur-ofta-ska-man-putsa-fonster',
    title: 'Hur ofta ska man putsa fönster? Komplett guide 2026',
    description:
      'Hur ofta bör du putsa fönster i Stockholm? Vi går igenom rekommenderat intervall baserat på säsong, boendetyp och läge — med konkreta tips.',
    h1: 'Hur ofta ska man putsa fönster?',
    intro:
      'Det korta svaret: två gånger per år för de flesta hem. Det långa svaret beror på var du bor, vilken typ av bostad du har och hur mycket pollen, trafik och regn dina fönster utsätts för.',
    publishedAt: '2026-05-21',
    readingTimeMin: 6,
    author: 'Rutputs',
    tags: ['skötsel', 'råd'],
    category: 'guide',
    sections: [
      {
        heading: 'Tumregeln: två gånger per år',
        html: `<p>För de allra flesta svenska hem fungerar två puts per år bra: en gång på <strong>våren</strong> efter att vinterns smuts och saltspray försvunnit, och en gång på <strong>hösten</strong> innan det blir för kallt och dagarna blir mörka. Då hinner du njuta av rena fönster under sommarens långa kvällar och under julens stearinljus.</p>
<p>Det här är samma intervall som de flesta professionella fönsterputsare i Stockholm rekommenderar, och det är också det som ligger till grund för vårt <a href="/tjanst/abonnemang-fonsterputs">abonnemang för återkommande fönsterputs</a>.</p>`,
      },
      {
        heading: 'När du bör putsa oftare',
        html: `<ul>
<li><strong>Du bor nära en hårt trafikerad gata</strong> — t.ex. längs E4:an, Drottningholmsvägen eller i innerstan. Avgaser och däckslitage lägger sig snabbt på rutorna och fyra puts om året är inte ovanligt.</li>
<li><strong>Bostadsrätt eller villa nära björkar och björkpollen</strong> — i områden som Bromma, Spånga och Järfälla blir pollensäsongen i maj/juni ofta extra hård mot fönstren.</li>
<li><strong>Sjöutsikt eller havsnära läge</strong> — saltdimma och fågelspillning kräver oftare puts. Lidingö, Nacka och Östermalm med utsikt mot vattnet är typiska exempel.</li>
<li><strong>Du har små barn eller hund</strong> — fingeravtryck och nostryck på insidan blir snabbt synliga, särskilt i motljus.</li>
<li><strong>Du driver butik, kontor eller mottagning</strong> — skyltfönster och entréer bör putsas månadsvis eller varannan månad. Läs mer om <a href="/foretag">fönsterputs för företag</a>.</li>
</ul>`,
      },
      {
        heading: 'När du kan putsa mer sällan',
        html: `<p>Bor du i en lägenhet på övre våningarna med inglasad balkong eller med fönster som vetter mot innergård är belastningen ofta låg. Då kan en gång om året räcka, gärna på våren när vinterns rester ska bort.</p>`,
      },
      {
        heading: 'Säsongsguide för Stockholm',
        html: `<ul>
<li><strong>Vår (april–maj):</strong> Den viktigaste puts-perioden. Få bort vinterns saltspray, sand och stadens grus innan pollenet kommer.</li>
<li><strong>Sommar (juni–augusti):</strong> Punktinsatser om något specifikt händer, men generellt en lugn period.</li>
<li><strong>Höst (september–oktober):</strong> Puts inför mörkrets ankomst — rena fönster släpper in maximalt med dagsljus när vi behöver det som mest.</li>
<li><strong>Vinter (november–mars):</strong> Undvik puts vid temperaturer under +5 °C. Vattnet fryser och putsmedel fungerar dåligt. Vi tar gärna inomhusputs under vintern.</li>
</ul>`,
      },
      {
        heading: 'Varför det lönar sig att putsa regelbundet',
        html: `<p>Smuts som får ligga kvar binder sig hårdare för varje månad. Saltavlagringar och kalk från regnvatten kan med tiden etsa sig in i glaset och ge bestående märken. Regelbunden puts är därför inte bara en estetisk fråga — det förlänger livslängden på fönstren.</p>
<p>Dessutom blir varje enskild puts billigare när du har ett <a href="/tjanst/abonnemang-fonsterputs">abonnemang</a> jämfört med en engångsputs, eftersom det går snabbare när fönstren inte är extremt smutsiga.</p>`,
      },
      {
        heading: 'Tips för att klara längre mellan puts',
        html: `<ul>
<li>Torka av karmarna med en lätt fuktad trasa då och då — det är där mycket smuts börjar.</li>
<li>Använd en mjuk gummiskrapa direkt efter hård regnvatten för att förhindra kalkfläckar.</li>
<li>Stäng fönstren under pollensäsongen om du kan, eller använd pollenfilter.</li>
<li>Ha en mikrofiberduk till hands för fingeravtryck — undvik papper som river glaset.</li>
</ul>`,
      },
    ],
    faq: [
      {
        question: 'Hur ofta ska man putsa fönster på en villa i Stockholm?',
        answer:
          'För en villa i Stockholmsområdet rekommenderas två gånger per år — en gång på våren och en gång på hösten. Bor du nära mycket trafik eller har björkpollen i området kan tre gånger vara motiverat.',
        linkLabel: 'Se priser för villa',
        linkTo: '/tjanst/villa-fonsterputs',
      },
      {
        question: 'Hur ofta ska man putsa fönster i en lägenhet?',
        answer:
          'I en lägenhet räcker det oftast med 1–2 gånger per år, beroende på våning och läge. Lägenheter mot innergård kan klara sig med en gång årligen, medan lägenheter mot trafikerad gata mår bra av två puts om året.',
        linkLabel: 'Se priser för lägenhet',
        linkTo: '/tjanst/lagenhet-fonsterputs',
      },
      {
        question: 'När på året är det bäst att putsa fönster?',
        answer:
          'Bäst är slutet av april/början av maj och slutet av september. Då är det tillräckligt varmt för att vatten och putsmedel ska fungera bra, samtidigt som du får nytta av rena fönster under den ljusa delen av året.',
      },
      {
        question: 'Kan man putsa fönster på vintern?',
        answer:
          'Utomhusputs fungerar dåligt under +5 °C eftersom vattnet fryser och putsmedel inte verkar som det ska. Inomhusputs går utmärkt hela året och vi tar gärna sådana uppdrag under vintern.',
      },
      {
        question: 'Hur lång tid håller en fönsterputs?',
        answer:
          'I normala fall syns smuts igen efter 3–6 månader, beroende på väder och läge. Hård regnsäsong eller mycket pollen kan korta intervallet.',
      },
    ],
    relatedAreaSlugs: ['jarfalla', 'bromma', 'spanga'],
    relatedServiceSlugs: ['villa-fonsterputs', 'lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
  },
  {
    slug: 'rut-avdrag-fonsterputs-2026',
    title: 'RUT-avdrag för fönsterputs 2026 — så fungerar det',
    description:
      'Allt du behöver veta om RUT-avdrag för fönsterputs 2026: belopp, regler, hur det dras automatiskt och vad som gäller för villa, lägenhet och brf.',
    h1: 'RUT-avdrag för fönsterputs 2026',
    intro:
      'Fönsterputsning är en av tjänsterna som omfattas av RUT-avdraget. Det betyder att du som privatperson får 50 % rabatt direkt på fakturan — vi sköter all administration mot Skatteverket.',
    publishedAt: '2026-05-21',
    readingTimeMin: 5,
    author: 'Rutputs',
    tags: ['ekonomi', 'RUT'],
    category: 'guide',
    sections: [
      {
        heading: 'Vad är RUT-avdrag?',
        html: `<p>RUT står för <strong>Rengöring, Underhåll och Tvätt</strong> och är en skattereduktion för hushållsnära tjänster i hemmet. Fönsterputsning är en av de tjänster som omfattas. Du får tillbaka 50 % av arbetskostnaden direkt på fakturan — du behöver alltså inte ansöka själv eller vänta på återbetalning.</p>`,
      },
      {
        heading: 'Hur mycket kan du dra av 2026?',
        html: `<ul>
<li><strong>Tak per person och år:</strong> 75 000 kr i sammanlagd skattereduktion för RUT- och ROT-avdrag.</li>
<li><strong>Av detta får RUT vara:</strong> max 75 000 kr (taket höjdes 2024 och gäller fortsatt 2026).</li>
<li><strong>Rabatt på fönsterputsning:</strong> 50 % av arbetskostnaden, direkt på fakturan.</li>
<li><strong>Materialkostnader och resor:</strong> omfattas <em>inte</em> av RUT — bara den faktiska arbetsinsatsen.</li>
</ul>
<p>För de flesta hushåll är taket inte ett problem — en årlig fönsterputs kostar långt under det. Men har du många RUT-tjänster (städning, trädgård, flytt) kan det vara värt att hålla koll.</p>`,
      },
      {
        heading: 'Vem får använda RUT-avdraget?',
        html: `<ul>
<li>Du måste vara <strong>minst 18 år</strong> och ha fyllt 18 vid årets ingång.</li>
<li>Du måste vara <strong>obegränsat skattskyldig i Sverige</strong> (i praktiken: bosatt i Sverige).</li>
<li>Du måste ha <strong>tillräckligt med skatt att kvitta avdraget mot</strong>. Har du för lite skatt under året får du återbetala mellanskillnaden.</li>
<li>Tjänsten måste utföras i ditt eget eller en förälders <strong>hushåll</strong> — det inkluderar din permanentbostad, fritidshus och andelsfastighet.</li>
</ul>`,
      },
      {
        heading: 'Så går det till hos oss',
        html: `<ol>
<li><strong>Du begär offert</strong> via <a href="/pris">formuläret på prissidan</a> och anger ditt personnummer (krävs för RUT-administrationen).</li>
<li><strong>Vi utför jobbet</strong> och fakturerar dig direkt med RUT-avdraget redan avdraget — du betalar alltså bara 50 %.</li>
<li><strong>Vi ansöker hos Skatteverket</strong> om resterande del. Det är ingenting du behöver göra själv.</li>
<li><strong>Du redovisar inget extra i deklarationen</strong> — det syns automatiskt i din förtryckta deklaration året efter.</li>
</ol>`,
      },
      {
        heading: 'Specialfall: villa, lägenhet och BRF',
        html: `<p><strong>Villa och bostadsrätt:</strong> RUT gäller fullt ut på all fönsterputs i hemmet, både insida och utsida.</p>
<p><strong>Hyresrätt:</strong> Du som hyresgäst kan använda RUT på fönsterputsning i din lägenhet på samma villkor som villaägare.</p>
<p><strong>Bostadsrättsförening (BRF):</strong> Föreningen som juridisk person kan <em>inte</em> använda RUT-avdraget för gemensamma ytor som trapphus. RUT är personligt och kräver fysisk person. Däremot kan enskilda medlemmar använda RUT för putsning i den egna lägenheten.</p>
<p><strong>Företag och kontor:</strong> RUT gäller bara för privatpersoner. Företag drar i stället av kostnaden som vanlig rörelsekostnad. Läs mer om <a href="/foretag">fönsterputs för företag</a>.</p>`,
      },
      {
        heading: 'Vanliga missförstånd',
        html: `<ul>
<li><strong>"RUT dras i deklarationen."</strong> Nej — sedan länge dras det direkt på fakturan. Du ser alltid det rabatterade priset.</li>
<li><strong>"Bara städning omfattas."</strong> Fel — fönsterputsning är en uttrycklig RUT-tjänst.</li>
<li><strong>"Jag måste själv ansöka."</strong> Nej — det är vi som utförare som ansöker hos Skatteverket.</li>
<li><strong>"Det gäller bara villor."</strong> Fel — RUT gäller för alla boendeformer, inklusive lägenhet och fritidshus.</li>
</ul>`,
      },
    ],
    faq: [
      {
        question: 'Hur mycket är RUT-avdraget på fönsterputs 2026?',
        answer:
          'RUT-avdraget är 50 % av arbetskostnaden. Maxbeloppet per person och år är 75 000 kr i sammanlagd skattereduktion för RUT.',
      },
      {
        question: 'Måste jag ansöka om RUT-avdraget själv?',
        answer:
          'Nej — vi som utförare drar av RUT direkt på fakturan och ansöker hos Skatteverket. Du behöver bara uppge ditt personnummer när du beställer.',
        linkLabel: 'Begär offert',
        linkTo: '/pris',
      },
      {
        question: 'Gäller RUT-avdraget för min lägenhet?',
        answer:
          'Ja, RUT gäller för all fönsterputsning i din bostad oavsett om det är villa, bostadsrätt eller hyresrätt.',
        linkLabel: 'Fönsterputs för lägenhet',
        linkTo: '/tjanst/lagenhet-fonsterputs',
      },
      {
        question: 'Kan en bostadsrättsförening använda RUT?',
        answer:
          'Nej, RUT-avdraget är personligt och kan bara användas av fysiska personer. En BRF betalar fullt pris för gemensamma ytor, men enskilda medlemmar kan använda RUT för putsning i den egna lägenheten.',
      },
      {
        question: 'Vad händer om jag har för lite skatt att kvitta mot?',
        answer:
          'Då måste du betala mellanskillnaden till Skatteverket i samband med slutskattebeskedet. Det är därför bra att uppskatta sin inkomst innan man använder upp hela RUT-taket.',
      },
      {
        question: 'Räknas resor och material in i RUT-avdraget?',
        answer:
          'Nej, bara arbetskostnaden omfattas av RUT. Eventuella materialkostnader och reseersättning ligger utanför.',
      },
    ],
    relatedServiceSlugs: ['villa-fonsterputs', 'lagenhet-fonsterputs', 'abonnemang-fonsterputs'],
  },
];

export default guides;
