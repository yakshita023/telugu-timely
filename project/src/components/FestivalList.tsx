import React, { useState, useEffect } from 'react';
import { Festival, Reminder } from '../types/calendar';
import { Calendar, Star, Bell, BellOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFestivalsForMonth, getUpcomingFestivals } from '../services/festivalService';

interface Props {
  initialFestivals?: Festival[];
}

export const FestivalList: React.FC<Props> = ({ initialFestivals }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [festivals, setFestivals] = useState<Festival[]>(initialFestivals || []);
  const [viewMode, setViewMode] = useState<'month' | 'upcoming'>('upcoming');
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('festivalReminders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (viewMode === 'month') {
      const monthFestivals = getFestivalsForMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      setFestivals(monthFestivals);
    } else {
      const upcomingFestivals = getUpcomingFestivals(5);
      setFestivals(upcomingFestivals);
    }
  }, [currentDate, viewMode]);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const setReminder = (festival: Festival) => {
    const festivalDate = new Date(festival.date);
    const reminderDate = new Date(festivalDate);
    reminderDate.setDate(festivalDate.getDate() - 2); // 2 days before

    const newReminder: Reminder = {
      festivalId: `${festival.name}-${festival.date}`,
      festivalName: festival.name,
      reminderDate: reminderDate.toISOString(),
      festivalDate: festival.date,
      tithi: "శుక్ల పక్ష తదియ", // This would come from actual panchangam data
      isNotified: false
    };

    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem('festivalReminders', JSON.stringify(updatedReminders));

    // Request notification permission
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Show confirmation
    alert(`Reminder set for ${festival.name} on ${reminderDate.toLocaleDateString()}`);
  };

  const removeReminder = (festivalId: string) => {
    const updatedReminders = reminders.filter(r => r.festivalId !== festivalId);
    setReminders(updatedReminders);
    localStorage.setItem('festivalReminders', JSON.stringify(updatedReminders));
  };

  const hasReminder = (festival: Festival) => {
    return reminders.some(r => r.festivalId === `${festival.name}-${festival.date}`);
  };

  // Check for due reminders
  React.useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        const reminderDate = new Date(reminder.reminderDate);
        if (!reminder.isNotified && reminderDate <= now) {
          if (Notification.permission === 'granted') {
            new Notification(`Festival Reminder: ${reminder.festivalName}`, {
              body: `${reminder.festivalName} is in 2 days (${new Date(reminder.festivalDate).toLocaleDateString()})\nTithi: ${reminder.tithi}`,
              icon: '/vite.svg'
            });
          }
          // Mark as notified
          const updatedReminders = reminders.map(r =>
            r.festivalId === reminder.festivalId ? { ...r, isNotified: true } : r
          );
          setReminders(updatedReminders);
          localStorage.setItem('festivalReminders', JSON.stringify(updatedReminders));
        }
      });
    };

    // Check immediately and then every hour
    checkReminders();
    const interval = setInterval(checkReminders, 3600000);
    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600">పండుగలు</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`px-3 py-1 rounded ${
              viewMode === 'upcoming'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 rounded ${
              viewMode === 'month'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {viewMode === 'month' && (
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <div className="space-y-4">
        {festivals.length > 0 ? (
          festivals.map((festival) => {
            const hasReminderSet = hasReminder(festival);
            return (
              <div
                key={`${festival.name}-${festival.date}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50 transition-colors"
              >
                {festival.isImportant ? (
                  <Star className="text-yellow-500" />
                ) : (
                  <Calendar className="text-gray-500" />
                )}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{festival.name}</h3>
                  <p className="text-gray-600">
                    {new Date(festival.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-500">{festival.description}</p>
                </div>
                <button
                  onClick={() => hasReminderSet 
                    ? removeReminder(`${festival.name}-${festival.date}`)
                    : setReminder(festival)
                  }
                  className={`p-2 rounded-full transition-colors ${
                    hasReminderSet 
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={hasReminderSet ? "Remove reminder" : "Set reminder"}
                >
                  {hasReminderSet ? <BellOff size={20} /> : <Bell size={20} />}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-4">
            No festivals found for this period
          </p>
        )}
      </div>
    </div>
  );
};