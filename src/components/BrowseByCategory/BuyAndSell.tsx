import { getGroup } from '@/api/data';
import { Group } from '@/pages/PostAd/PostAd';
import { setSelectedGroup } from '@/redux/slice/category';
import { RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BuyAndSell: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {selectedCategory} = useSelector((state: RootState) => state.category);
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [groups, setGroups] = React.useState<Group[]>([{groupId: 0, groupName: 'All', categoryId: selectedCategory ?? 0}]);
  const getGroupData = async () => {
    const response = await getGroup(selectedCategory ?? 0);
    setGroups([...groups, ...response.datas]);
  }
  const handleSelectTabClick = (id: number) => {
    setSelectedTab(id);
    dispatch(setSelectedGroup(id));
  }
  const handleClick = () => {
    console.log(searchValue);
    navigate(`/buy-and-sell/0`);
  }
  useEffect(()=>{
    dispatch(setSelectedGroup(selectedTab));
    getGroupData();
  },[])

  return (
    <div className="relative w-full h-screen bg-gray-200">
      <div className="relative z-10 flex flex-col items-center h-full">
        <h1 className="text-4xl text-black font-bold mt-16">Buy & Sell</h1>
        <div className="mt-6 bg-white rounded-lg shadow-md flex flex-col text-black">
          <div className="p-6 flex space-x-4">
            {groups.map((tab: Group) => (
              <button
                key={tab.groupId}
                onClick={() => handleSelectTabClick(tab.groupId)}
                className={`px-8 py-2 font-semibold runded-md ${selectedTab === tab.groupId ? 'border-b border-b-blue-300 text-blue-400' : ''}`}
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
            <button onClick={handleClick} className="bg-green-500 text-white font-semibold text-lg rounded-r-md p-2 flex items-center gap-2">
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
