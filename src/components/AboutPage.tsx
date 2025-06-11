import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center p-4 text-white text-center bg-black bg-opacity-70 rounded-lg shadow-xl"
    >
      <h2 className="text-4xl font-extrabold mb-4 text-white font-bebas-new italic"
          style={{
            textShadow: `
              -2px -2px 0 #000000,
              2px -2px 0 #000000,
              -2px 2px 0 #000000,
              2px 2px 0 #000000
            `
          }}>
        Привет ! 🖐
      </h2>

      

      <p className="text-xl font-semibold mb-4">
        Добро пожаловать на ЮМУЗФЕСТ — ваш путеводитель в мир музыки и незабываемых впечатлений!
        Наш фестиваль создан с любовью к музыке и желанием объединить людей разных поколений и вкусов.
      </p>

      <p className="text-md mb-4">
        Мы стремимся создать уникальную атмосферу, где каждый найдет что-то для себя: от зажигательных выступлений
        известных артистов до уютных площадок с молодыми талантами.
      </p>

      <p className="text-md mb-8">
        Присоединяйтесь к нам, чтобы стать частью этого волшебства!
      </p>

    </motion.div>
  );
};

export default AboutPage; 