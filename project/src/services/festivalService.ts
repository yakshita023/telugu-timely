import { Festival } from '../types/calendar';

// Telugu months
const teluguMonths = [
  'చైత్రం', 'వైశాఖం', 'జ్యేష్ఠం', 'ఆషాఢం', 
  'శ్రావణం', 'భాద్రపదం', 'ఆశ్వయుజం', 'కార్తీకం', 
  'మార్గశిరం', 'పుష్యం', 'మాఘం', 'ఫాల్గుణం'
];

// Major Telugu festivals with their date calculations
const festivalRules = [
  {
    name: 'ఉగాది',
    description: 'Telugu New Year',
    rule: (year: number) => ({
      date: calculateTeluguNewYear(year),
      isImportant: true,
      teluguMonth: 'చైత్రం'
    })
  },
  {
    name: 'శ్రీ రామనవమి',
    description: 'Sri Rama Navami',
    rule: (year: number) => ({
      date: addDays(calculateTeluguNewYear(year), 8),
      isImportant: true,
      teluguMonth: 'చైత్రం'
    })
  },
  {
    name: 'హనుమాన్ జయంతి',
    description: 'Hanuman Jayanti',
    rule: (year: number) => ({
      date: new Date(year, 3, 23), // April 23rd (approx)
      isImportant: true,
      teluguMonth: 'చైత్రం'
    })
  },
  {
    name: 'నాగ పంచమి',
    description: 'Naga Panchami',
    rule: (year: number) => ({
      date: new Date(year, 6, 21), // Around July/August
      isImportant: false,
      teluguMonth: 'శ్రావణం'
    })
  },
  {
    name: 'వినాయక చవితి',
    description: 'Vinayaka Chavithi (Ganesh Chaturthi)',
    rule: (year: number) => ({
      date: new Date(year, 8, 7), // Around September 7th
      isImportant: true,
      teluguMonth: 'భాద్రపదం'
    })
  },
  {
    name: 'దసరా (విజయదశమి)',
    description: 'Dasara (Vijayadashami)',
    rule: (year: number) => ({
      date: new Date(year, 9, 14), // Around October 14th
      isImportant: true,
      teluguMonth: 'ఆశ్వయుజం'
    })
  },
  {
    name: 'దీపావళి',
    description: 'Diwali',
    rule: (year: number) => ({
      date: new Date(year, 10, 12), // Around November 12th
      isImportant: true,
      teluguMonth: 'కార్తీకం'
    })
  },
  {
    name: 'మకర సంక్రాంతి',
    description: 'Makar Sankranti',
    rule: (year: number) => ({
      date: new Date(year, 0, 14), // January 14th
      isImportant: true,
      teluguMonth: 'పుష్యం'
    })
  },
  {
    name: 'మహాశివరాత్రి',
    description: 'Maha Shivaratri',
    rule: (year: number) => ({
      date: new Date(year, 1, 28), // February end (approx)
      isImportant: true,
      teluguMonth: 'మాఘం'
    })
  }
];

// Helper functions
function calculateTeluguNewYear(year: number): Date {
  return new Date(year, 2, 22); // Usually around March 22nd
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Function to get festivals for any given year
export function getFestivalsForYear(year: number): Festival[] {
  const festivals: Festival[] = [];

  // Generate festivals dynamically
  festivalRules.forEach(rule => {
    const { date, isImportant, teluguMonth } = rule.rule(year);
    festivals.push({
      name: rule.name,
      date: formatDate(date),
      description: `${rule.description} (${teluguMonth})`,
      isImportant
    });
  });

  return festivals.sort((a, b) => a.date.localeCompare(b.date));
}

// Function to get festivals for a range of years
export function getFestivalsForRange(startYear: number, endYear: number): Festival[] {
  let allFestivals: Festival[] = [];
  
  for (let year = startYear; year <= endYear; year++) {
    allFestivals = [...allFestivals, ...getFestivalsForYear(year)];
  }

  return allFestivals;
}

// Function to get festivals for a specific month
export function getFestivalsForMonth(year: number, month: number): Festival[] {
  const allFestivals = getFestivalsForYear(year);
  const monthStart = `${year}-${String(month + 1).padStart(2, '0')}`;
  return allFestivals.filter(festival => festival.date.startsWith(monthStart));
}

// Function to get upcoming festivals
export function getUpcomingFestivals(count: number = 5): Festival[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;

  const allFestivals = [
    ...getFestivalsForYear(currentYear),
    ...getFestivalsForYear(nextYear)
  ];

  const upcoming = allFestivals.filter(festival => new Date(festival.date) >= today);

  return upcoming.slice(0, count);
}
