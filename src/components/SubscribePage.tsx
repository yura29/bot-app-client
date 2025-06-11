import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface Event {
  date: string;
  time: string;
  description: string;
}

interface Toast {
  show: boolean;
  type: 'success' | 'error' | '';
  message: string;
}

const SubscribePage = () => {
  const [festivalProgram, setFestivalProgram] = useState<Event[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [toast, setToast] = useState<Toast>({ show: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [buttonStatus, setButtonStatus] = useState<'idle' | 'success' | 'info' | 'error'>('idle');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 3000); // Скрываем через 3 секунды
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/schedule');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event[] = await response.json();
        
        // Фильтрация событий, которые еще не произошли
        const now = new Date();
        const filteredData = data.filter(event => {
          const [year, month, day] = event.date.split('-').map(Number);
          const [hours, minutes] = event.time.split(':').map(Number);
          const eventDateTime = new Date(year, month - 1, day, hours, minutes);
          return eventDateTime > now;
        });

        setFestivalProgram(filteredData);
        if (filteredData.length > 0) {
          setSelectedGroup(filteredData[0].description); // Выбираем первую доступную группу по умолчанию
        }
      } catch (error) {
        console.error("Ошибка при загрузке расписания:", error);
        showToast("Не удалось загрузить расписание.", 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();

    // Логирование объекта Telegram.WebApp для отладки
    // console.log("Telegram WebApp object:", (window as any).Telegram?.WebApp);
    // console.log("Telegram WebApp initData:", (window as any).Telegram?.WebApp?.initData);
    // console.log("Telegram WebApp initDataUnsafe.user:", (window as any).Telegram?.WebApp?.initDataUnsafe?.user);

  }, []);

  const handleSubscribe = async () => {
    if (!selectedGroup) {
      showToast("Пожалуйста, выберите группу для подписки.", 'error');
      setButtonStatus('error');
      setTimeout(() => setButtonStatus('idle'), 2000);
      return;
    }

    const telegramWebApp = (window as any).Telegram?.WebApp;
    const user = telegramWebApp?.initDataUnsafe?.user;

    let userId: number | undefined;
    if (user) {
      userId = user.id;
    } else {
      // Временная заглушка для тестирования вне Telegram Mini App
      console.warn("Telegram WebApp user data not found. Using a dummy user ID for testing.");
      userId = 12345; // Замените на любой тестовый ID
    }

    if (!userId) {
      showToast("Ошибка: Не удалось получить данные пользователя Telegram. Пожалуйста, откройте в Telegram Mini App.", 'error');
      setButtonStatus('error');
      setTimeout(() => setButtonStatus('idle'), 2000);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-Auth': telegramWebApp?.initData || '',
        },
        body: JSON.stringify({ group_name: selectedGroup, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      showToast(data.message, 'success');
      if (data.status === 'success') {
        setButtonStatus('success');
      } else if (data.status === 'info') {
        setButtonStatus('info');
      }
      setTimeout(() => setButtonStatus('idle'), 2000);
    } catch (error) {
      console.error("Ошибка при подписке:", error);
      showToast("Не удалось оформить подписку.", 'error');
      setButtonStatus('error');
      setTimeout(() => setButtonStatus('idle'), 2000);
    }
  };

  const getButtonContent = () => {
    switch (buttonStatus) {
      case 'success':
        return <><FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Подписано!</>;
      case 'info':
        return <><FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Уже подписаны</>;
      case 'error':
        return <><FontAwesomeIcon icon={faTimesCircle} className="mr-2" /> Ошибка</>;
      default:
        return "Подписаться";
    }
  };

  const getButtonClass = () => {
    switch (buttonStatus) {
      case 'success':
        return "bg-green-600 hover:bg-green-700";
      case 'info':
        return "bg-blue-600 hover:bg-blue-700";
      case 'error':
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-[#2B6CB0] hover:bg-[#205080]";
    }
  };

  return (
    <div className="w-full max-w-xl bg-black bg-opacity-70 rounded-lg shadow-xl p-6 relative">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700] font-bebas-new">Выберите группу которую хотите отслеживать</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700]"></div>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <label htmlFor="group-select" className="text-lg text-yellow-300">Выберите группу:</label>
          <select
            id="group-select"
            className="p-3 rounded-md bg-[#1A5276] border border-[#FFD700] text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            {festivalProgram.length > 0 ? (
              festivalProgram.map((event, index) => (
                <option key={index} value={event.description}>
                  {event.description} ({event.time} {event.date})
                </option>
              ))
            ) : (
              <option value="" disabled>Нет доступных групп</option>
            )}
          </select>
          <button
            onClick={handleSubscribe}
            className={`${getButtonClass()} text-yellow-300 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center`}
          >
            {getButtonContent()}
          </button>
          {toast.show && (
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 p-3 rounded-lg shadow-lg text-white font-bold transition-opacity duration-300 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} opacity-100`}>
              {toast.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscribePage;