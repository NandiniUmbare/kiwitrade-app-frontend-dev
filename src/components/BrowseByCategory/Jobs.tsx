import React, { useEffect, useState } from 'react';
import jobs from '@assets/images/jobs.png';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGroup } from '@/redux/slice/category';
import { RootState } from '@/redux/store';
import { getGroup } from '@/api/data';
import { Group } from '@/pages/PostAd/PostAd';
import { useNavigate } from 'react-router-dom';

const Jobs: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedCategory} = useSelector((state: RootState) => state.category);
  const [groups, setGroups] = useState<Group>([]);
  const [selectedOption, setSelectedOption] = useState<number>();
  const groupNames = ['Find Talent', 'Find Job'];
  const getGroupData = async() => {
    const response = await getGroup(selectedCategory ?? 0);
    setGroups(response.data);
  }
  const handleClick = (id:number) => {
    setSelectedOption(id)
    dispatch(setSelectedGroup(id));
    navigate(`/jobs/0`);
  }
  useEffect(()=>{
    getGroupData();
    dispatch(setSelectedGroup(selectedOption));
  },[])
  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img src={jobs} alt="Real Estate" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center h-full text-white">
        <Header />
        <h1 className="text-4xl text-center p-6 text-white font-bold mt-16">
          Connecting great candidates with great jobs
        </h1>
        <div className="flex gap-4">
          {groups.map((group: Group, index:number)=>(
            <div
            key={group.groupId}
            onClick={() => handleClick(group.groupId)}
            className="bg-gray-100 bg-opacity-30 px-16 py-8 cursor-pointer"
          >
            <h3 className="text-white text-xl font-semibold">{groupNames[index]}</h3>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
