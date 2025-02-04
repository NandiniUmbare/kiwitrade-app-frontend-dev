import { Group } from '@/pages/PostAd/PostAd';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const BuyAndSell: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<string>('All');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const groups: Group = [
    { groupId: 0, groupName: 'All', categoryId: 3 },
    { groupId: 1, groupName: 'For Sale', categoryId: 3 },
    { groupId: 2, groupName: 'Free', categoryId: 3 },
    { groupId: 3, groupName: 'Garage / Moving Sale', categoryId: 3 },
    { groupId: 4, groupName: 'Wanted', categoryId: 3 },
  ];
  return (
    <div className="relative w-full h-screen bg-gray-200">
      <div className="relative z-10 flex flex-col items-center h-full">
        <h1 className="text-4xl text-black font-bold mt-16">Buy & Sell</h1>
        <div className="mt-6 bg-white rounded-lg shadow-md flex flex-col text-black">
          <div className="p-6 flex space-x-4">
            {groups.map((tab: Group) => (
              <button
                key={tab.groupId}
                onClick={() => setSelectedTab(tab.groupName)}
                className={`px-8 py-2 font-semibold runded-md ${selectedTab === tab.groupName ? 'border-b border-b-blue-300 text-blue-400' : ''}`}
              >
                {tab.groupName}
              </button>
            ))}
          </div>
          <div className="p-6 rounded-md shaow-md flex">
            <input
              type="text"
              placeholder="iphone 13 256 GB memory"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full border border-gray-200 p-2 rounded-l-md"
            />
            <button className="bg-green-500 text-white font-semibold text-lg rounded-r-md p-2 flex items-center gap-2">
              <FaSearch />
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyAndSell;
