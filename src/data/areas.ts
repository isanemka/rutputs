export interface Area {
  slug: string;
  name: string;
  title: string;
  description: string;
  content: string;
}

export const areas: Area[] = [
  {
    slug: 'jarfalla',
    name: 'Järfälla',
    title: 'Fönsterputsning i Järfälla – RUT-avdrag från 350 kr | Rutputs',
    description: 'Boka professionell fönsterputsning i Järfälla. Jag utgår från Järfälla och erbjuder snabb, pålitlig fönsterputs med RUT-avdrag. Från 350 kr!',
    content: 'Som din lokala fönsterputsare i Järfälla kan jag erbjuda snabb och smidig service utan långa restider. Jag utgår härifrån och täcker Barkarby, Jakobsberg, Kallhäll och övriga Järfälla. Oavsett om du bor i villa eller lägenhet får du skinande rena fönster till ett bra pris med RUT-avdrag.'
  },
  {
    slug: 'bromma',
    name: 'Bromma',
    title: 'Fönsterputsning i Bromma – RUT-avdrag från 350 kr | Rutputs',
    description: 'Professionell fönsterputsning i Bromma med RUT-avdrag. Noggrann och pålitlig service för villor och lägenheter. Boka enkelt online!',
    content: 'Bromma med sina många villor och radhus är ett av mina mest populära serviceområden. Jag putsar fönster i hela Bromma – från Ulvsunda och Åkeshov till Riksby och Ålsten. Med RUT-avdrag får du professionell fönsterputs från bara 350 kronor.'
  },
  {
    slug: 'kista',
    name: 'Kista',
    title: 'Fönsterputsning i Kista – RUT-avdrag från 350 kr | Rutputs',
    description: 'Fönsterputsning i Kista för privatpersoner och företag. Professionell service med RUT-avdrag. Boka online – från 350 kr!',
    content: 'I Kista erbjuder jag fönsterputsning för både bostäder och företagslokaler. Oavsett om du bor i Kista Centrum, Ärvinge eller Husby hjälper jag dig med skinande rena fönster. Företag i Kista Science City är också välkomna att kontakta mig för regelbunden fönsterputs.'
  },
  {
    slug: 'solna',
    name: 'Solna',
    title: 'Fönsterputsning i Solna – RUT-avdrag från 350 kr | Rutputs',
    description: 'Boka fönsterputsning i Solna. Professionell och noggrann fönsterputs med RUT-avdrag för villor och lägenheter. Från 350 kr!',
    content: 'Jag erbjuder fönsterputsning i hela Solna – från Bergshamra och Hagalund till Råsunda och Huvudsta. Med många nöjda kunder i området kan du räkna med professionell och pålitlig service. Boka enkelt online och få dina fönster skinande rena med RUT-avdrag.'
  },
  {
    slug: 'sundbyberg',
    name: 'Sundbyberg',
    title: 'Fönsterputsning i Sundbyberg – RUT-avdrag från 350 kr | Rutputs',
    description: 'Professionell fönsterputsning i Sundbyberg med RUT-avdrag. Snabb bokning online, pålitlig service. Från 350 kr!',
    content: 'Sundbyberg är en av Stockholms minsta men mest livliga kommuner, och jag finns nära till hands för fönsterputsning i hela området. Från Lilla Alby till Ursvik och Rissne – jag hjälper dig att få skinande rena fönster med RUT-avdrag från 350 kronor.'
  },
  {
    slug: 'spanga',
    name: 'Spånga',
    title: 'Fönsterputsning i Spånga – RUT-avdrag från 350 kr | Rutputs',
    description: 'Fönsterputsning i Spånga med RUT-avdrag. Professionell service för villor och lägenheter i Spånga-Tensta. Från 350 kr!',
    content: 'Spånga med sina många villakvarter är perfekt för professionell fönsterputsning. Jag täcker hela Spånga-Tensta stadsdelsområde och erbjuder noggrann fönsterputs med RUT-avdrag. Boka enkelt via formuläret och se ditt pris direkt – från 350 kronor.'
  },
  {
    slug: 'sollentuna',
    name: 'Sollentuna',
    title: 'Fönsterputsning i Sollentuna – RUT-avdrag från 350 kr | Rutputs',
    description: 'Boka fönsterputsning i Sollentuna. Pålitlig, professionell fönsterputs med RUT-avdrag för villor och lägenheter. Från 350 kr!',
    content: 'I Sollentuna erbjuder jag fönsterputsning i Tureberg, Helenelund, Edsberg, Rotebro och övriga delar av kommunen. Med kort avstånd från min bas i Järfälla kan jag erbjuda snabb och flexibel service. Få dina fönster skinande rena med RUT-avdrag från 350 kronor.'
  },
  {
    slug: 'taby',
    name: 'Täby',
    title: 'Fönsterputsning i Täby – RUT-avdrag från 350 kr | Rutputs',
    description: 'Professionell fönsterputsning i Täby med RUT-avdrag. Villor, radhus och lägenheter. Boka online – från 350 kr!',
    content: 'Täby är känt för sina fina villaområden och radhus, och jag hjälper dig gärna med professionell fönsterputsning. Jag täcker Täby Centrum, Näsbypark, Gribbylund, Arninge och övriga Täby. Boka via det enkla formuläret och se ditt pris direkt – med RUT-avdrag från 350 kronor.'
  }
];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find(a => a.slug === slug);
}
