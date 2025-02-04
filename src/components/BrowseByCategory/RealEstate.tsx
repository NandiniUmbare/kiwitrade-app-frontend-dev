import React, { useState } from 'react';
import realEstate from '@images/realestate.jpg';
import Header from '../Header';

const RealEstate = () => {
  const [selectedTab, setSelectedTab] = useState<'buy' | 'rent' | 'share'>('buy');
  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img src={realEstate} alt="Real Estate" className="w-full h-[75%] object-cover" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center h-full text-white">
        <Header />
        <h1 className="text-4xl font-bold mt-16">Real Estate</h1>
        <div className="mt-6 bg-white rounded-lg shadow-md flex flex-col text-black">
          <div className="p-4 flex space-x-4">
            {['buy', 'rent', 'share'].map((tab: string) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as 'buy' | 'rent' | 'share')}
                className={`px-8 py-2 font-semibold runded-md ${selectedTab === tab ? 'border-b border-b-blue-300 text-blue-400' : ''}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="px-4 py-4 rounded-md shadow-md">
            <select className="w-full outline-none bg-gray-200 text-black px-4 py-2 rounded-md shadow-md ">
              <option value="">Type</option>
              <option value="appartment">Apparthment</option>
              <option></option>
              <option></option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;
