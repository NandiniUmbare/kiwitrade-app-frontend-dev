import { getGroup } from '@/api/data';
import { Group } from '@/pages/PostAd/PostAd';
import { setSelectedGroup } from '@/redux/slice/category';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AutosAndBoats: React.FC = () => {
  const {selectedCategory} = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  const [selectedGroupTab, setSelectedGroupTab] = useState<number>();
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();
  const getGroupData = async () => {
    if(selectedCategory){
      const response = await getGroup(selectedCategory);
      setGroups(response.datas);
    }
  }
  
  const imageMapping: { [key: number]: { imageUrl: string; size: string } } = [
    {
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: 'col-span-2 row-span-1',
    },
    {
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: 'col-span-2',
    },
  {
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: 'col-span-1',
    },
    {
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: '',
    },
    {
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: '',
    },
  ];

  const handleClick = (id:number) => {
    setSelectedGroupTab(id);
    dispatch(setSelectedGroup(id));
    navigate(`/autos-and-boats/0`);
  }
  useEffect(() => {
    getGroupData();
    dispatch(setSelectedGroup(selectedGroupTab));
  }, []);
  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800">Autos & Boats</h2>

        <div className="grid grid-cols-4 md:grid-cols-3 mt-6">
          {groups.map((group,index) => (
            <div key={group.groupId} onClick={()=>handleClick(group.groupId)} className={`relative ${imageMapping[index].size} cursor-pointer`}>
              <img
                src={imageMapping[index].imageUrl}
                alt={group.groupName}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-lg font-semibold text-white">{group.groupName}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AutosAndBoats;
