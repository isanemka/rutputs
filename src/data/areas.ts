export interface Area {
  slug: string;
  name: string;
  title: string;
  description: string;
  content: string;
  districts: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const areas: Area[] = [
  {
    slug: 'jarfalla',
    name: 'Järfälla',
    title: 'Fönsterputs Järfälla – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Professionell fönsterputs i Järfälla med RUT-avdrag. Från 350 kr. Vi täcker Jakobsberg, Viksjö, Barkarby och Kallhäll. Boka enkelt online!',
    content: 'Som lokal fönsterputsare i Järfälla kan jag erbjuda snabb och smidig service utan långa restider. Jag arbetar löpande i Barkarby, Jakobsberg, Viksjö, Kallhäll och övriga delar av kommunen, vilket gör bokningen enkel och flexibel för dig som vill ha rena fönster utan krångel.',
    districts: ['Jakobsberg', 'Viksjö', 'Barkarby', 'Kallhäll'],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Järfälla?',
        answer: 'Priset börjar från 350 kr efter RUT-avdrag. Det exakta priset beror på hur många fönster du har och vilken typ av bostad du bor i.'
      },
      {
        question: 'Täcker ni hela Järfälla?',
        answer: 'Ja, jag hjälper kunder i bland annat Jakobsberg, Viksjö, Barkarby och Kallhäll samt övriga delar av Järfälla.'
      },
      {
        question: 'Hur bokar jag fönsterputs i Järfälla?',
        answer: 'Du fyller i prisformuläret online för att se ditt pris direkt. Därefter återkommer jag för att bekräfta bokning och tid.'
      }
    ]
  },
  {
    slug: 'bromma',
    name: 'Bromma',
    title: 'Fönsterputs Bromma – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Fönsterputsning i Bromma med RUT-avdrag från 350 kr. Vi täcker Abrahamsberg, Ulvsunda, Nockeby och hela Bromma. Boka enkelt online!',
    content: 'Bromma med sina många villor, radhus och lägenheter är ett av mina mest efterfrågade serviceområden. Jag putsar fönster i hela Bromma och hjälper både återkommande kunder och dig som vill boka enstaka tillfällen inför säsong, försäljning eller storstädning.',
    districts: ['Abrahamsberg', 'Ulvsunda', 'Nockeby', 'Ålsten'],
    faq: [
      {
        question: 'Arbetar ni i villaområden i Bromma?',
        answer: 'Ja, Bromma är ett av mina vanligaste områden för villor och radhus, men jag hjälper också kunder i lägenhet och mindre fastigheter.'
      },
      {
        question: 'Vilka delar av Bromma täcker ni?',
        answer: 'Jag arbetar bland annat i Abrahamsberg, Ulvsunda, Nockeby och Ålsten samt i övriga delar av Bromma.'
      },
      {
        question: 'Ingår RUT-avdrag i priset?',
        answer: 'Ja, priset som kommuniceras börjar från 350 kr efter RUT-avdrag för privatpersoner som uppfyller Skatteverkets villkor.'
      }
    ]
  },
  {
    slug: 'kista',
    name: 'Kista',
    title: 'Fönsterputs Kista – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Fönsterputs i Kista med RUT-avdrag från 350 kr. Professionell service för bostäder och kontor i Kista, Husby och Akalla. Boka idag!',
    content: 'I Kista erbjuder jag fönsterputsning för både privatpersoner och företag. Det passar bra för dig som bor i lägenhet, radhus eller villa och vill ha ett smidigt upplägg, men också för kontor och verksamheter som behöver rena fönster som en del av ett professionellt helhetsintryck.',
    districts: ['Kista', 'Husby', 'Akalla', 'Ärvinge'],
    faq: [
      {
        question: 'Erbjuder ni fönsterputs för företag i Kista?',
        answer: 'Ja, jag hjälper både privatkunder och företag i Kista med professionell fönsterputsning och flexibla upplägg.'
      },
      {
        question: 'Vilka delar av Kista täcker ni?',
        answer: 'Jag arbetar i Kista, Husby, Akalla och Ärvinge samt närliggande områden i norra Stockholm.'
      },
      {
        question: 'Hur snabbt kan jag boka i Kista?',
        answer: 'Tillgängligheten varierar med säsong, men eftersom jag redan arbetar i området går det ofta att hitta en smidig tid utan lång väntan.'
      }
    ]
  },
  {
    slug: 'solna',
    name: 'Solna',
    title: 'Fönsterputs Solna – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Fönsterputs i Solna med RUT-avdrag från 350 kr. Vi täcker Bergshamra, Råsunda, Huvudsta och Hagalund. Boka enkelt online!',
    content: 'Jag erbjuder fönsterputsning i hela Solna och hjälper kunder som vill ha rena fönster året runt eller inför särskilda tillfällen. Med återkommande uppdrag i området kan jag arbeta effektivt och planera in tider som passar både lägenheter, villor och mindre fastigheter.',
    districts: ['Bergshamra', 'Råsunda', 'Huvudsta', 'Hagalund'],
    faq: [
      {
        question: 'Vilka områden i Solna täcker ni?',
        answer: 'Jag hjälper kunder i bland annat Bergshamra, Råsunda, Huvudsta och Hagalund samt i övriga delar av Solna.'
      },
      {
        question: 'Passar tjänsten även lägenheter i Solna?',
        answer: 'Ja, jag arbetar med både lägenheter, radhus och villor. Upplägget anpassas efter bostadens storlek och antal fönster.'
      },
      {
        question: 'Kan jag få pris direkt online?',
        answer: 'Ja, via prissidan kan du fylla i dina uppgifter och få en tydlig uppskattning direkt innan bokningen bekräftas.'
      }
    ]
  },
  {
    slug: 'sundbyberg',
    name: 'Sundbyberg',
    title: 'Fönsterputs Sundbyberg – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Boka fönsterputs i Sundbyberg med RUT-avdrag från 350 kr. Vi täcker Lilla Alby, Ursvik, Rissne och hela Sundbyberg. Fyll i formuläret för ditt pris!',
    content: 'Sundbyberg är ett område där många vill boka snabb och smidig fönsterputsning utan att behöva vänta länge. Jag arbetar regelbundet i kommunen och hjälper dig oavsett om du bor centralt, i villaområde eller i ett nyare bostadsområde där rena fönster gör stor skillnad för ljusinsläpp och trivsel.',
    districts: ['Lilla Alby', 'Ursvik', 'Rissne', 'Duvbo'],
    faq: [
      {
        question: 'Täcker ni hela Sundbyberg?',
        answer: 'Ja, jag arbetar i hela Sundbyberg och hjälper kunder i bland annat Lilla Alby, Ursvik, Rissne och Duvbo.'
      },
      {
        question: 'Hur fungerar RUT-avdrag för fönsterputs?',
        answer: 'RUT-avdraget dras direkt på priset för privatkunder som uppfyller villkoren, vilket gör att priset kan börja från 350 kr.'
      },
      {
        question: 'När passar det att boka fönsterputs i Sundbyberg?',
        answer: 'Många bokar inför vår och höst, men tjänsten fungerar lika bra året runt när du vill förbättra ljusinsläpp och helhetsintryck i hemmet.'
      }
    ]
  },
  {
    slug: 'spanga',
    name: 'Spånga',
    title: 'Fönsterputs Spånga – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Fönsterputs i Spånga-Tensta med RUT-avdrag från 350 kr. Snabb och pålitlig service i hela Spånga. Fyll i formuläret för ditt pris!',
    content: 'Spånga med sina många villakvarter och radhusområden passar mycket bra för regelbunden fönsterputsning. Jag hjälper kunder i hela området och ser till att arbetet utförs noggrant, smidigt och med fokus på ett resultat som håller hög kvalitet varje gång.',
    districts: ['Spånga', 'Tensta', 'Bromsten', 'Solhem'],
    faq: [
      {
        question: 'Arbetar ni i hela Spånga-Tensta?',
        answer: 'Ja, jag hjälper kunder i Spånga, Tensta, Bromsten, Solhem och närliggande områden i västra och norra Stockholm.'
      },
      {
        question: 'Passar tjänsten villa och radhus i Spånga?',
        answer: 'Absolut. Spånga är ett vanligt område för villa- och radhuskunder, men jag arbetar även med lägenheter och mindre fastigheter.'
      },
      {
        question: 'Hur bokar jag fönsterputs i Spånga?',
        answer: 'Du börjar på prissidan där du ser ditt pris direkt. När förfrågan är skickad återkommer jag för att bekräfta detaljer och tid.'
      }
    ]
  },
  {
    slug: 'sollentuna',
    name: 'Sollentuna',
    title: 'Fönsterputs Sollentuna – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Fönsterputsning i Sollentuna med RUT-avdrag från 350 kr. Vi täcker Tureberg, Edsberg, Häggvik och hela Sollentuna kommun. Boka online!',
    content: 'I Sollentuna erbjuder jag fönsterputsning för dig som vill ha ett pålitligt och enkelt upplägg med tydlig prissättning. Närheten till Järfälla gör det lätt att planera in tider snabbt, och jag hjälper både privatkunder och mindre fastigheter som vill ha rena fönster med professionellt resultat.',
    districts: ['Tureberg', 'Edsberg', 'Häggvik', 'Helenelund'],
    faq: [
      {
        question: 'Vilka områden i Sollentuna täcker ni?',
        answer: 'Jag arbetar bland annat i Tureberg, Edsberg, Häggvik och Helenelund samt i övriga delar av Sollentuna kommun.'
      },
      {
        question: 'Är ni nära Sollentuna för snabb bokning?',
        answer: 'Ja, eftersom jag utgår från Järfälla är Sollentuna ett naturligt arbetsområde där jag ofta kan erbjuda smidiga tider.'
      },
      {
        question: 'Kan jag boka som återkommande kund i Sollentuna?',
        answer: 'Ja, det går bra att boka både enstaka putsningar och återkommande intervaller beroende på behov och säsong.'
      }
    ]
  },
  {
    slug: 'taby',
    name: 'Täby',
    title: 'Fönsterputs Täby – Från 350 kr med RUT-avdrag | Rutputs',
    description: 'Professionell fönsterputsning i Täby med RUT-avdrag. Villor, radhus och lägenheter. Boka online från 350 kr!',
    content: 'Täby är känt för sina många villaområden, radhus och större bostäder där rena fönster verkligen gör skillnad. Jag hjälper kunder i hela kommunen och erbjuder ett enkelt bokningsflöde för dig som vill få ett tydligt pris direkt och anlita en noggrann lokal aktör.',
    districts: ['Täby Centrum', 'Näsbypark', 'Gribbylund', 'Arninge'],
    faq: [
      {
        question: 'Vilka områden i Täby täcker ni?',
        answer: 'Jag hjälper kunder i bland annat Täby Centrum, Näsbypark, Gribbylund och Arninge samt i övriga delar av Täby.'
      },
      {
        question: 'Passar fönsterputs i Täby större villor och radhus?',
        answer: 'Ja, tjänsten är anpassad för både större villor, radhus, lägenheter och mindre fastigheter beroende på antal fönster och behov.'
      },
      {
        question: 'Hur får jag pris för fönsterputs i Täby?',
        answer: 'Du fyller i formuläret på prissidan för att se pris direkt. Därefter bekräftas bokningen i nästa steg.'
      }
    ]
  }
];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find(a => a.slug === slug);
}
