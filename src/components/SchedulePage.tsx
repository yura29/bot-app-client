import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faMicrophone, faCalendarAlt, faTheaterMasks, faLightbulb } from '@fortawesome/free-solid-svg-icons';

interface Event {
  date: string;
  time: string;
  description: string;
  endTime?: string;
}

// Функция для определения иконки на основе описания события
const getEventIcon = (description: string) => {
  const lowerDescription = description.toLowerCase();
  if (lowerDescription.includes('музыка') || lowerDescription.includes('концерт') || lowerDescription.includes('группа')) {
    return faMusic;
  } else if (lowerDescription.includes('выступление') || lowerDescription.includes('лекция') || lowerDescription.includes('стендап')) {
    return faMicrophone;
  } else if (lowerDescription.includes('шоу') || lowerDescription.includes('театр')) {
    return faTheaterMasks;
  } else if (lowerDescription.includes('мастер-класс')) {
    return faLightbulb;
  } else {
    return faCalendarAlt; // Иконка по умолчанию
  }
};

const SchedulePage = () => {
  const [festivalProgram, setFestivalProgram] = useState<Event[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<string | null>(null);

  const festivalDate = new Date('2025-06-28T00:00:00'); // Дата фестиваля

  useEffect(() => {
    const now = new Date();

    const diffTime = festivalDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      setCountdown(`До фестиваля осталось: ${diffDays} дней!`);
    } else {
      setCountdown(null);
    }

    const fetchSchedule = async () => {
      try {
        const response = await fetch('/api/schedule');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event[] = await response.json();
        console.log("Полученные данные расписания:", data); // DEBUG
        setFestivalProgram(data);
      } catch (error) {
        console.error("Ошибка при загрузке расписания:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();

    const interval = setInterval(() => {
      setCurrentTime(new Date());

      const updatedNow = new Date();
      const updatedDiffTime = festivalDate.getTime() - updatedNow.getTime();
      const updatedDiffDays = Math.ceil(updatedDiffTime / (1000 * 60 * 60 * 24));
      if (updatedDiffDays > 0) {
        setCountdown(`До фестиваля осталось: ${updatedDiffDays} дней!`);
      } else {
        setCountdown(null);
      }
    }, 60 * 1000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const pastPerformances: Event[] = [];
  let currentPerformance: Event | undefined;
  const upcomingPerformances: Event[] = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const festivalDay = new Date(festivalDate);
  festivalDay.setHours(0, 0, 0, 0);

  console.log("Текущая дата (today):", today); // DEBUG
  console.log("Дата фестиваля (festivalDay):", festivalDay); // DEBUG
  console.log("today < festivalDay:", today < festivalDay); // DEBUG

  if (today < festivalDay) {
    // If it's before the festival date, all events are upcoming
    upcomingPerformances.push(...festivalProgram);
  } else {
    // If it's on or after the festival date, categorize as usual
    festivalProgram.forEach((event, index) => {
      const eventStartTime = new Date(`${event.date}T${event.time}:00`);
      const nextEvent = festivalProgram[index + 1];
      let eventEndTime: Date;

      if (nextEvent) {
        eventEndTime = new Date(`${nextEvent.date}T${nextEvent.time}:00`);
      } else {
        // If it's the last event, assume it lasts for 1 hour
        eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000);
      }

      const formattedEndTime = eventEndTime.toTimeString().slice(0, 5); // Format to HH:MM

      console.log(`Event: ${event.description}, Start: ${eventStartTime.toLocaleString()}, End: ${eventEndTime.toLocaleString()}, Current: ${currentTime.toLocaleString()}`); // DEBUG
      console.log(`currentTime >= eventStartTime: ${currentTime >= eventStartTime}`); // DEBUG
      console.log(`currentTime < eventEndTime: ${currentTime < eventEndTime}`); // DEBUG
      console.log(`currentTime >= eventEndTime: ${currentTime >= eventEndTime}`); // DEBUG

      if (currentTime >= eventStartTime && currentTime < eventEndTime) {
        currentPerformance = { ...event, endTime: formattedEndTime };
      } else if (currentTime >= eventEndTime) {
        pastPerformances.push({ ...event, endTime: formattedEndTime });
      } else {
        upcomingPerformances.push(event);
      }
    });
  }

  return (
    <div className="w-full max-w-xl bg-black bg-opacity-70 rounded-lg shadow-xl p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FFD700] font-bebas-new">Актуальное расписание</h2>
      {countdown && (
        <p className="text-center text-lg text-white mb-4 animate-pulse">{countdown}</p>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700]"></div>
        </div>
      ) : festivalProgram.length > 0 ? (
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[9.5px] top-0 bottom-0 w-1 bg-[#FFD700]"></div>

          {/* Past Performances Section */}
          {pastPerformances.length > 0 && (
            <div className="mb-8">
              <p className="text-xl font-bold text-gray-400 mb-4 text-left ml-[28px]">Прошедшие:</p>
              {pastPerformances.map((event, index) => (
                <div key={index} className="relative flex items-center mb-4 opacity-60">
                  {/* Static Circle for Past Performance */}
                  <div className="absolute left-[-2px] top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-[#242A38] rounded-full"></div>
                  </div>
                  {/* Past Performance Details */}
                  <div className="ml-[28px] flex-1">
                    <p className="text-gray-200 text-base mb-1">{event.description}</p>
                    <p className="text-sm text-gray-400 mt-1">Началось в: {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Performance Section */}
          {currentPerformance && (
            <div className="mb-8">
              <p className="text-xl font-bold text-yellow-300 mb-4 text-left ml-[28px]">Сейчас выступает:</p>
              <div className="relative flex items-center mb-12">
                {/* Static Circle for Current Performance */}
                <div className="absolute left-[-2px] top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-[#242A38] rounded-full"></div>
                </div>
                {/* Current Performance Details */}
                <div className="ml-[28px] flex-1 p-4 bg-black bg-opacity-50 rounded-lg shadow-md border-2 border-[#FFD700] animate-subtle-glow">
                  <p className="font-bold text-2xl text-yellow-300 mb-2 flex items-center">
                    <FontAwesomeIcon icon={getEventIcon(currentPerformance.description)} className="mr-3 text-yellow-300" />
                    {currentPerformance.description}
                  </p>
                  <p className="text-gray-200 text-base">Началось в {currentPerformance.time} - Завершится в {currentPerformance.endTime}</p>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Performances Section */}
          {upcomingPerformances.length > 0 && (
            <div>
              <p className="text-xl font-bold text-white mb-4 text-left ml-[28px]">Предстоящие:</p>
              {upcomingPerformances.map((event, index) => (
                <div key={index} className="relative flex items-center mb-6">
                  {/* Static Circle for Upcoming Performance */}
                  <div className="absolute left-[-2px] top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-[#242A38] rounded-full"></div>
                  </div>
                  {/* Upcoming Performance Details */}
                  <div className="ml-[28px] flex-1">
                    <p className="font-bold text-gray-200 text-base mb-1">{event.description}</p>
                    <p className="text-lg text-yellow-300 flex items-center mt-1">
                      <FontAwesomeIcon icon={getEventIcon(event.description)} className="mr-2 text-yellow-300" />
                      Начало в: {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">Расписание на данный момент недоступно.</p>
      )}
    </div>
  );
};

export default SchedulePage; 