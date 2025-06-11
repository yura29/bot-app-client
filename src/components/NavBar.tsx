import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black bg-opacity-70 border-t border-gray-700 shadow-lg z-20">
      <ul className="flex justify-around items-center h-16">
        <li className="flex-1 text-center">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors duration-200 ${
              location.pathname === '/' ? 'text-yellow-300' : 'text-gray-200 hover:text-yellow-300'
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M7 15h.01M17 12h.01M17 15h.01M17 18h.01M10 18h.01M13 18h.01M16 18h.01M21 15V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z"
              ></path>
            </svg>
            Расписание
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            to="/subscribe"
            className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors duration-200 ${
              location.pathname === '/subscribe' ? 'text-yellow-300' : 'text-gray-200 hover:text-yellow-300'
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17v2m-2 4h4a2 2 0 002-2v-2m1-1V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6m1-1V9a2 2 0 012-2h10a2 2 0 012 2v6m-4 10h2l2 2m-4-2h.01M7 15h.01M12 15h.01M17 15h.01M7 12h.01M12 12h.01M17 12h.01M7 9h.01M12 9h.01M17 9h.01"
              ></path>
            </svg>
            Подписка
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            to="/buy-ticket"
            className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors duration-200 ${
              location.pathname === '/buy-ticket' ? 'text-yellow-300' : 'text-gray-200 hover:text-yellow-300'
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-10zm7 4h4v2h-4v-2z"
              ></path>
            </svg>
            Билет
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            to="/about"
            className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors duration-200 ${
              location.pathname === '/about' ? 'text-yellow-300' : 'text-gray-200 hover:text-yellow-300'
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 10l-.01.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            О нас
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar; 