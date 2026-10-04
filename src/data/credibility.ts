// Curated from the media and Members & Supporters sections on the former
// WordPress homepage. Review this list with UnPoison before claiming that an
// organisation is a current supporter or using its logo.
type MediaItem = { outlet: string; date: string; title: string; context: string; href: string; image?: string };

export const mediaCoverage: MediaItem[] = [
  {
    outlet: 'Mail & Guardian',
    date: '15 May 2026',
    title: 'Agriculture minister bans toxic pesticide tied to Soweto child deaths',
    context: 'Reporting quoting UnPoison’s network coordinator, Anna Shevel.',
    image: '/images/media/terbufos-ban-2026.webp',
    href: 'https://mg.co.za/the-green-guardian/2026-05-15-agriculture-minister-bans-toxic-pesticide-tied-to-soweto-child-deaths/',
  },
  {
    outlet: 'Mail & Guardian',
    date: '23 January 2026',
    title: 'SA moves to ban deadly pesticide',
    context: 'Reporting on the proposed terbufos ban, with comment from UnPoison.',
    image: '/images/media/terbufos-proposal-2026.webp',
    href: 'https://mg.co.za/the-green-guardian/2026-01-22-sa-moves-to-ban-deadly-pesticide/',
  },
  {
    outlet: 'Mail & Guardian',
    date: '4 September 2025',
    title: 'SA’s outdated pesticide laws under review: human rights and health at stake',
    context: 'Coverage of the pesticide policy colloquium and UnPoison’s response.',
    href: 'https://mg.co.za/the-green-guardian/2025-09-04-sas-outdated-pesticide-laws-under-review-human-rights-and-health-at-stake/',
  },
  {
    outlet: 'Eyewitness News',
    date: '2 December 2024',
    title: 'UnPoison SA: Minister Steenhuisen has misled us about terbufos',
    context: 'An opinion piece written by UnPoison, not independent reporting.',
    href: 'https://www.ewn.co.za/2024/12/02/unpoison-sa-minister-steenhuisen-has-misled-us-about-terbufos',
  },
  {
    outlet: 'People’s Post / News24',
    date: '21 March 2024',
    title: 'No-spray pilot project launched in Noordhoek and Scarborough',
    context: 'Reporting on the pilot, including UnPoison’s role and Anna Shevel’s comments.',
    href: 'https://www.news24.com/no-spray-pilot-project-launched-in-noordhoek-and-scarborough-to-replace-pesticide-use-20240321',
  },
];

export const listedSupporters = [
  { name: 'Abalimi Bezekhaya', href: 'https://abalimibezekhaya.org.za/', logo: '/images/supporters/abalimi.png' },
  { name: 'Biowatch South Africa', href: 'https://biowatch.org.za/', logo: '/images/supporters/biowatch.png' },
  { name: 'Earthlore Foundation', href: 'https://earthlorefoundation.org/', logo: '/images/supporters/earthlore.png' },
  { name: 'Envirochild', href: 'https://envirochild.org/', logo: '/images/supporters/envirochild.jpg' },
  { name: 'Goedgedacht Trust', href: 'https://www.goedgedacht.org/', logo: '/images/supporters/goedgedacht.png' },
  { name: 'groundWork', href: 'https://www.groundwork.org.za/', logo: '/images/supporters/groundwork.jpg' },
  { name: 'Heinrich Böll Foundation Southern Africa', href: 'https://za.boell.org/en', logo: '/images/supporters/heinrich-boell.png' },
  { name: 'Noordhoek Environmental Action Group', href: 'https://neag.org.za/', logo: '/images/supporters/neag.jpg' },
  { name: 'Project Biome', href: 'https://www.projectbiome.org/', logo: '/images/supporters/project-biome.png' },
  { name: 'Southern Africa Food Lab', href: 'https://www.southernafricafoodlab.org/', logo: '/images/supporters/southern-africa-food-lab.png' },
  { name: 'Surplus People Project', href: 'https://spp.org.za/', logo: '/images/supporters/surplus-people-project.jpg' },
  { name: 'WaterCAN', href: 'https://watercan.org.za/', logo: '/images/supporters/watercan.png' },
];
