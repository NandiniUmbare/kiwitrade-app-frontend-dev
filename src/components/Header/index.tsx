import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-transparent shadow w-full">
      {/* Full-width container */}
      <div className="w-full">
        {/* Top Section */}
        <div className="hidden sm:flex justify-between items-center text-sm text-gray-700 border-b border-gray-200 py-2 px-4 sm:px-8">
          <div className="flex space-x-4 sm:space-x-8">
            <span>📧 info@example.com</span>
            <span>📞 Customer support</span>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => navigate('/post-add')}
              className="px-4 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              POST Ad
            </button>
            <button className="px-4 py-2 text-black  rounded-full hover:bg-black hover:text-white transition">
              🌍 Language
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 py-4 px-4 sm:px-14 ">
          {/* Logo Section */}
          <div className="w-full sm:w-auto text-start sm:text-left">
            <h1 onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">
              <span className="text-green-800">PRO</span>
              <span className="font-light">Trader</span>
            </h1>
            <p className="text-sm text-gray-500">Trade Like A Real Pro</p>
          </div>

          {/* Stats Section */}
          <div className="w-full sm:w-auto text-center sm:text-right text-green-800 font-bold text-lg px-4 py-2 ">
            <div className="flex justify-center sm:justify-start items-center space-x-1">
              <span className="bg-green-500 text-white px-2 py-1 rounded">4</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">3</span>,
              <span className="bg-green-500 text-white px-2 py-1 rounded">1</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">2</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">5</span>
              <span className="text-gray-600 text-base ml-2">Ads</span>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex flex-1 border border-gray-300 overflow-hidden rounded w-full sm:w-auto">
            <input
              type="text"
              className="flex-1 px-4 py-2 text-gray-700 outline-none"
              placeholder="Search your product..."
            />
            <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition">
              🔍
            </button>
          </div>

          {/* My Account Section (Desktop only) */}
          <div className="hidden sm:block">
            <button className="px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition">
              👤 My Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;