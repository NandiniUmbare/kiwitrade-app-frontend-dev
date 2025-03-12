import React, { useEffect, useState } from 'react';
import events from '@/assets/images/events.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getGroups, setSelectedGroup } from '@/redux/slice/category';
import { useNavigate } from 'react-router-dom';

const CommunityAndEvents: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();
  const {selectedCategory, groups} = useSelector((state: RootState) => state.category);
  const [selectedTab, setSelectedTab] = useState<number>();
  const getGroupData = async() => {
    appDispatch(getGroups(selectedCategory ?? 0));
  }
  const handleClick = (id:number) => {
    setSelectedTab(id);
    dispatch(setSelectedGroup(id));
    navigate(`/community-and-events/0`);
    console.log(id);
  }
  useEffect(()=>{
    getGroupData();
  },[])
  return <div className="relative w-full h-screen bg-gray-100">
    <div className="absolute inset-0">
      <img src={events} alt="Community & Events" className="w-full h-[75%] object-cover" />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
    <div className="relative z-10 flex flex-col items-center h-full text-white">
      <h1 className="text-4xl font-bold mt-16">Community & Events</h1>
      <div className="mt-6 bg-white rounded-lg shadow-md flex flex-col text-black">
        <div className="p-4 flex space-x-4">
          {[{groupId: 0, groupName: 'All', categoryId: 6},...groups].map((tab) => (
            <button
              key={tab.groupId}
              onClick={() => handleClick(tab.groupId)}
              className={`px-8 py-2 font-semibold runded-md hover:border-b hover:border-b-blue-300 hover:text-blue-400 ${selectedTab === tab.groupId ? 'border-b border-b-blue-300 text-blue-400' : ''}`}
            >
              {tab.groupName}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>;
};

export default CommunityAndEvents;
