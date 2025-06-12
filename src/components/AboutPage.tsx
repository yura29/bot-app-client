import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center p-4 text-white text-center bg-[#3A2E2F] rounded-lg shadow-xl max-w-md mx-auto"
    >
      <h2 className="text-5xl font-bold mb-4 text-white font-bebasNeue italic flex items-center justify-center"
          style={{
            textShadow: `
              -2px -2px 0 #000000,
              2px -2px 0 #000000,
              -2px 2px 0 #000000,
              2px 2px 0 #000000
            `
          }}>
        Привет! 🖐
      </h2>

      <p className="text-xl font-onest font-bold mb-4 text-white text-justify">
        ЮМУЗФЕСТ — ваш путеводитель в мир музыки и незабываемых впечатлений!
        Наш фестиваль создан с любовью к музыке и желанием объединить людей разных поколений и вкусов.
      </p>

      <p className="text-xl font-onest font-bold mb-4 text-white text-justify">
      Мы стремимся создать уникальную атмосферу, где каждый найдёт что-то новое для себя: от зажигательных выступлений артистов до уютных площадок с 
      молодыми талантами.
      </p>

      <p className="text-xl font-onest font-bold mb-8 text-white text-justify">
        Присоединяйтесь к нам, чтобы стать частью этого волшебства!
      </p>

      <p className="text-xl font-bebas italic font-bold  text-white text-right w-full pr-1">
      - Команда ЮмузФеста
      </p>

    </motion.div>
  );
};

export default AboutPage; 