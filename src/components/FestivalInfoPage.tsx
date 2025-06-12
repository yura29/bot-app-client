import React from 'react';

const FestivalInfoPage: React.FC = () => {
  const infoItems = [
    "Детская зона",
    "Мерч-зона",
    "Фотобельё", 
    "Сцена",
    "Кемпинг",
    "Туалеты",
    "Фудкорт-зона",
    "Интерактивная площадка Платформа N9",
    "Интерактивная площадка «Револь-центр»"
  ];

  return (
    <div className="flex flex-col items-center py-4 text-white w-full h-full justify-start">
      <h2
        className="text-4xl md:text-5xl font-extrabold tracking-widest font-bebas-new italic text-yellow-300 mb-8 text-center"
        style={{
          textShadow: `
            -2px -2px 0 #2B6CB0,
            2px -2px 0 #2B6CB0,
            -2px 2px 0 #2B6CB0,
            2px 2px 0 #2B6CB0,
            5px 5px 0 #000000
          `
        }}
      >
        Что будет на Фестивале
      </h2>
      <ul className="w-full max-w-md space-y-6 px-4">
        {infoItems.map((item, index) => (
          <li 
            key={index} 
            className="bg-gray-700 p-4 rounded-lg shadow-xl transition-all duration-300 hover:scale-103 hover:shadow-2xl transform cursor-pointer flex items-center"
          >
            <svg className="w-7 h-7 mr-4 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="28px" height="28px" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-xl text-white font-semibold">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FestivalInfoPage; 