import React, { useState } from 'react';
import { PanchangamCard } from './components/PanchangamCard';
import { FestivalList } from './components/FestivalList';
import { getUpcomingFestivals } from './services/festivalService';
import { Calendar, Clock } from 'lucide-react';

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate] = useState(new Date());

  const mockPanchangamData = {
    tithi: "శుక్ల పక్ష తదియ",
    nakshatra: "పుష్యమి",
    yoga: "సిద్ధ",
    karana: "బవ",
    rahuKalam: "09:00 - 10:30",
    yamagandam: "12:00 - 13:30",
    durmuhurtham: "08:30 - 09:15",
    date: currentDate.toISOString(),
    festivals: []
  };

  if (!showCalendar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Clock className="w-12 h-12 text-orange-600" />
            <h1 className="text-5xl font-bold text-orange-800">TeluguTimely</h1>
          </div>
          <p className="text-xl text-orange-700 mb-8">
            Your comprehensive guide to Telugu festivals, muhurtams, and panchangam
          </p>
          <button
            onClick={() => setShowCalendar(true)}
            className="bg-orange-600 text-white px-8 py-4 rounded-lg text-xl font-semibold 
                     shadow-lg hover:bg-orange-700 transition-colors duration-300
                     flex items-center gap-2 mx-auto"
          >
            <Calendar className="w-6 h-6" />
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Calendar size={32} />
            <h1 className="text-3xl font-bold">తెలుగు పంచాంగం</h1>
          </div>
          <p className="mt-2 text-orange-100">Daily Telugu Calendar & Festival Guide</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PanchangamCard data={mockPanchangamData} />
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">ముహూర్తాలు</h2>
              <p className="text-gray-600">
                Today's auspicious timings will be displayed here...
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <FestivalList initialFestivals={getUpcomingFestivals()} />
          </div>
        </div>
      </main>

      <footer className="bg-orange-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Telugu Panchangam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;