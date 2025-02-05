import React, { useEffect, useState } from 'react';
import realEstate from '@images/realestate.jpg';
import Header from '../Header';
import { getType } from '@/api/data';
import { Type } from '@/pages/PostAd/PostAd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedGroup } from '@/redux/slice/category';

const RealEstate = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const groups = [{id:1, groupName:'buy'},{id:2, groupName:'rent'},{id:4, groupName:'share'}];
  const [type, setType] = useState<Type[]>([]);
  const navigate = useNavigate();

  const getTypeData = async () => {
    const response = await getType(selectedTab, 1);
    setType(response.datas);
  }

  const handleClick = (id:number) => {
    setSelectedTab(id);
    dispatch(setSelectedGroup(id));
  }
  useEffect(() => {
    getTypeData();
  },[selectedTab]);
  useEffect(()=>{
    dispatch(setSelectedGroup(selectedTab));
  },[])
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
            {groups.map((tab) => (
              <button
                key={tab.id}
                onClick={()=>handleClick(tab.id)}
                className={`px-8 py-2 font-semibold runded-md ${selectedTab === tab.id ? 'border-b border-b-blue-300 text-blue-400' : ''}`}
              >
                {tab.groupName.charAt(0).toUpperCase() + tab.groupName.slice(1)}
              </button>
            ))}
          </div>
          <div className="px-4 py-4 rounded-md shadow-md">
            <select id='type' onChange={(e)=>navigate(`/real-estate/${e.target.value}`)} className="w-full outline-none bg-gray-200 text-black px-4 py-2 rounded-md shadow-md ">
              <option value="">Type</option>
              {type.map((t) => (
                <option key={t.typeId} value={t.typeId}>{t.typeName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;
