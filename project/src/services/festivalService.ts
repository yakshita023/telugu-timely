import { Festival } from '../types/calendar';

// Telugu months
const teluguMonths = [
  'చైత్రం', 'వైశాఖం', 'జ్యేష్ఠం', 'ఆషాఢం', 
  'శ్రావణం', 'భాద్రపదం', 'ఆశ్వయుజం', 'కార్తీకం', 
  'మార్గశిరం', 'పుష్యం', 'మాఘం', 'ఫాల్గుణం'
];

// Major festivals with their rules
const festivalRules = [
  {
    name: 'ఉగాది',
    description: 'Telugu New Year',
    rule: (year: number) => {
      const date = calculateTeluguNewYear(year);
      return {
        date,
        isImportant: true,
        teluguMonth: 'చైత్రం'
      };
    }
  },
  {
    name: 'శ్రీ రామనవమి',
    description: 'Sri Rama Navami',
    rule: (year: number) => {
      const date = addDays(calculateTeluguNewYear(year), 8);
      return {
        date,
        isImportant: true,
        teluguMonth: 'చైత్రం'
      };
    }
  }
];

// Static festivals for February 2025
const february2025Festivals = [
  {
    name: 'శ్రీ మార్కండేయ మహర్షి జయంతి',
    date: '2025-02-01',
    description: 'Sri Markandeya Maharshi Jayanti',
    isImportant: true
  },
  {
    name: 'గణేష్ జయంతి, చతుర్థి వ్రతం',
    date: '2025-02-04',
    description: 'Ganesh Jayanti and Chaturthi Vratam',
    isImportant: true
  },
  {
    name: 'సరస్వతి పూజ',
    date: '2025-02-05',
    description: 'Saraswati Puja',
    isImportant: true
  },
  {
    name: 'స్కంద షష్టి, సోమవారం వృతం',
    date: '2025-02-06',
    description: 'Skanda Shasti and Somavaram Vratam',
    isImportant: true
  },
  {
    name: 'రధసప్తమి',
    date: '2025-02-07',
    description: 'Ratha Saptami',
    isImportant: true
  },
  {
    name: 'దుర్గాష్టమి వ్రతం, బుద్ధ అష్టమి, భీష్మాష్టమి',
    date: '2025-02-08',
    description: 'Durgashtami Vratam, Buddha Ashtami, and Bhishmashtami',
    isImportant: true
  },
  {
    name: 'ధనిష్ఠ కార్తె, మధ్వ నవమి',
    date: '2025-02-09',
    description: 'Dhanishta Karte and Madhwa Navami',
    isImportant: false
  },
  {
    name: 'జయ ఏకాదశి',
    date: '2025-02-11',
    description: 'Jaya Ekadashi',
    isImportant: true
  },
  {
    name: 'ప్రదోష వ్రతం',
    date: '2025-02-13',
    description: 'Pradosha Vratam',
    isImportant: true
  },
  {
    name: 'కుంభ సంక్రమణం, మాఘపూర్ణిమ, సింధుస్నానం',
    date: '2025-02-15',
    description: 'Kumbha Sankramanam, Magha Purnima, and Sindhu Snanam',
    isImportant: true
  },
  {
    name: 'శ్రీ సత్యనారాయణ పూజ, పౌర్ణమి వ్రతం, పౌర్ణమి',
    date: '2025-02-15',
    description: 'Sri Satyanarayana Puja, Pournami Vratam, and Pournami',
    isImportant: true
  },
  {
    name: 'సంకటహర చతుర్థి',
    date: '2025-02-18',
    description: 'Sankatahara Chaturthi',
    isImportant: true
  },
  {
    name: 'షబ్-ఎ-బరాత్, వాలెంటైన్స్ డే',
    date: '2025-02-14',
    description: 'Shab-e-Barat and Valentine\'s Day',
    isImportant: false
  },
  {
    name: 'శతభిష కార్తె',
    date: '2025-02-23',
    description: 'Shatabhisha Karte',
    isImportant: false
  },
  {
    name: 'స్వామి దయానంద సరస్వతి జయంతి',
    date: '2025-02-24',
    description: 'Swami Dayananda Saraswati Jayanti',
    isImportant: true
  },
  {
    name: 'మెహర్ బాబా జయంతి, ప్రదోష వ్రతం',
    date: '2025-02-27',
    description: 'Meher Baba Jayanti and Pradosha Vratam',
    isImportant: true
  },
  {
    name: 'మాస శివరాత్రి, మహాశివరాత్రి',
    date: '2025-02-28',
    description: 'Masa Shivaratri and Maha Shivaratri',
    isImportant: true
  },
  {
    name: 'అమావాస్య',
    date: '2025-02-28',
    description: 'Amavasya',
    isImportant: true
  },
  {
    name: 'నేషనల్ సైన్స్ డే',
    date: '2025-02-28',
    description: 'National Science Day',
    isImportant: false
  }
];

// Helper functions for date calculations
function calculateTeluguNewYear(year: number): Date {
  const date = new Date(year, 2, 22); // Around March 22
  return date;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getFestivalsForYear(year: number): Festival[] {
  const festivals: Festival[] = [];

  // Calculate dates for all festivals based on their rules
  festivalRules.forEach(rule => {
    const { date, isImportant, teluguMonth } = rule.rule(year);
    festivals.push({
      name: rule.name,
      date: formatDate(date),
      description: `${rule.description} (${teluguMonth})`,
      isImportant
    });
  });

  // Add February 2025 festivals if the year matches
  if (year === 2025) {
    festivals.push(...february2025Festivals);
  }

  // Sort festivals by date
  return festivals.sort((a, b) => a.date.localeCompare(b.date));
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
  
  // Get festivals for current and next year
  const allFestivals = [
    ...getFestivalsForYear(currentYear),
    ...getFestivalsForYear(nextYear)
  ];

  // Filter upcoming festivals
  const upcoming = allFestivals.filter(festival => 
    new Date(festival.date) >= today
  );

  // Return the specified number of upcoming festivals
  return upcoming.slice(0, count);
}