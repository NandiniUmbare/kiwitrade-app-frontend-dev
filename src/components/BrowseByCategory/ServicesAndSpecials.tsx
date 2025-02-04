import React from 'react';

const ServicesAndSpecials: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gray-300">
      <div className="relative z-10 flex flex-col items-center h-full">
        <h1 className="w-[40%] text-left text-4xl text-white font-bold mt-16">
          Services & Specials
        </h1>
        <div className="w-[45%] p-6 rounded-md shaow-md flex">
          <input
            type="text"
            placeholder={`Try 'electrictian'`}
            //   value={searchValue}
            //   onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border bg-white border-gray-200 p-2 rounded-l-md"
          />
          <button className="bg-green-500 text-white font-semibold text-lg rounded-r-md p-2 flex items-center gap-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesAndSpecials;
