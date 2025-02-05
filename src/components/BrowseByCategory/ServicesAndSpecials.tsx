import { setSelectedGroup } from '@/redux/slice/category';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ServicesAndSpecials: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const handleClick = () => {
    console.log(searchValue);
    navigate(`/services-specials/0`);
  };
  useEffect(() => {
    dispatch(setSelectedGroup(0));
  },[])
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border bg-white border-gray-200 p-2 rounded-l-md"
          />
          <button onClick={handleClick} className="bg-green-500 text-white font-semibold text-lg rounded-r-md p-2 flex items-center gap-2">
            Search
          </button>
        </div>
        <div className="w-[45%] p-6 pt-1 rounded-md shaow-md flex">
          <Link className='decoration-underline text-white text-xl' to={'/services-specials/0'}>Exploare all services</Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesAndSpecials;
