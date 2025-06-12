// import React from 'react'; // Removed as it's not explicitly used
import { motion } from 'framer-motion';

const BuyTicketPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center p-4 text-white text-center"
    >
      {/* 0+ Badge */}
      <div className="bg-white text-black font-bold px-3 py-1 rounded-full text-sm mb-4">
        0+
      </div>

      <p className="text-lg uppercase mb-2 italic">музыкальный фестиваль</p>

      <h2 className="text-5xl font-extrabold mb-8 text-white font-bebas-new italic flex items-center justify-center"
          style={{
            textShadow: `
              -2px -2px 0 #000000,
              2px -2px 0 #000000,
              -2px 2px 0 #000000,
              2px 2px 0 #000000
            `
          }}>
        <img src="/images/you.png" alt="Ю" className="h-20 mr-2" /> МузФест
      </h2>

      <p className="text-xl font-semibold mb-2">28 июня 2025,</p>
      <p className="text-xl font-semibold mb-2">10:00–23:00</p>
      <p className="text-md mb-8">по Москве</p>

      <p className="text-lg font-bold text-yellow-300 mb-12">
        Корткерос, ул.Советская, д. 126Б
      </p>

      {/* Buy Ticket Button */}
      <a 
        href="https://afisha.nethouse.ru/event/iu-muzfest"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xs bg-[#7B46F2] text-white py-4 rounded-lg font-bold text-lg text-center hover:bg-[#8D5CEB] transition-colors shadow-lg"
      >
        КУПИТЬ БИЛЕТ
      </a>

      <div className="mt-8 text-center w-full max-w-xs mx-auto">
        <p className="text-xl text-white font-bold mb-4">
          Ищите актуальные промокоды
        </p>
        <a
          href="https://vk.com/you_muzfest?from=groups"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#7B46F2] text-white py-3 px-6 rounded-lg font-bold text-lg text-center hover:bg-[#8D5CEB] transition-colors shadow-lg"
        >
          Промокоды
        </a>
      </div>

    </motion.div>
  );
};

export default BuyTicketPage; 