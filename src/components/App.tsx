import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SchedulePage from './SchedulePage';
import FestivalInfoPage from './FestivalInfoPage';
import NavBar from './NavBar';
import BuyTicketPage from './BuyTicketPage';
import AboutPage from './AboutPage';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const location = useLocation();

  // Define a set of appealing gradient color palettes
  const gradientPalettes = [
    { from: '#FFD700', to: '#FFA500' }, // Gold to Orange
    { from: '#8A2BE2', to: '#4169E1' }, // Blue Violet to Royal Blue
    { from: '#00CED1', to: '#20B2AA' }, // Dark Turquoise to Light Sea Green
    { from: '#FF6347', to: '#FF4500' }, // Tomato to Orange Red
    { from: '#ADFF2F', to: '#7CFC00' }, // Green Yellow to Lawn Green
    { from: '#FFC0CB', to: '#FF69B4' }, // Pink to Hot Pink
    { from: '#8B4513', to: '#A0522D' }, // Saddle Brown to Sienn
    { from: '#4682B4', to: '#6A5ACD' }, // Steel Blue to Slate Blue
    { from: '#DDA0DD', to: '#EE82EE' }, // Plum to Violet
  ];

  const [currentGradient, setCurrentGradient] = useState(() => {
    // Initialize with a random gradient
    const randomIndex = Math.floor(Math.random() * gradientPalettes.length);
    return gradientPalettes[randomIndex];
  });

  useEffect(() => {
    const changeGradient = () => {
      const randomIndex = Math.floor(Math.random() * gradientPalettes.length);
      setCurrentGradient(gradientPalettes[randomIndex]);
    };

    // Change gradient every 10-15 seconds (randomized for more natural flow)
    const interval = setInterval(changeGradient, 5000 + Math.random() * 5000); 

    if ((window as any).Telegram?.WebApp) {
      const webApp = (window as any).Telegram.WebApp;
      webApp.ready();
      const initializeWebApp = () => {
        // Вызываем requestFullscreen только для мобильных платформ
        if (webApp.platform === 'ios' || webApp.platform === 'android') {
          if (!webApp.isFullscreen) {
            webApp.requestFullscreen();
          }
        }
        // Set header and background color to a consistent base for Telegram WebApp
        webApp.setHeaderColor('#1a202c'); 
        webApp.setBackgroundColor('#1a202c'); 
      };
      setTimeout(initializeWebApp, 300);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <motion.div
      initial={{ '--gradient-from': currentGradient.from, '--gradient-to': currentGradient.to }}
      animate={{ '--gradient-from': currentGradient.from, '--gradient-to': currentGradient.to }}
      transition={{ duration: 10, ease: "easeInOut" }} // Long, smooth transition
      className="min-h-screen text-white flex flex-col items-center p-4 pt-16"
      style={{ backgroundImage: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to))` }}
    >
      {location.pathname !== '/buy-ticket' && location.pathname !== '/info' && (
        <img src="/images/you_full.png" alt="Ю МузФест" className="h-24 md:h-32 mb-4" />
      )}

      <AnimatePresence mode="wait">
        <div className="flex-grow">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <SchedulePage />
            } />
            <Route path="/info" element={
              <FestivalInfoPage />
            } />
            <Route path="/buy-ticket" element={
              <BuyTicketPage />
            } />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </AnimatePresence>

      <NavBar />
    </motion.div>
  );
};

export default App;
