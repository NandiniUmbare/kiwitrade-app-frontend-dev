import { getPostBrowseByCategory } from '@/api/data';
import { RootState } from '@/redux/store';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown, FaArrowDown, FaHeart, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Button, Input} from 'antd';
import Search from 'antd/es/input/Search';
export interface PostType {
    postId: number;
}

const PostListing:React.FC = () => {
  const [sectionFilter, setSectionFilter] = useState<boolean>(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  // const {selectedCategory, selectedGroup} = useSelector((state: RootState) => state.category);
  // const [posts, setPosts] = useState<PostType[]>([]);
  // const params = useParams();
  // const getPosts = async () => {
  //   // Fetch posts based on selectedCategory and selectedGroup
  //   if (selectedCategory !== null && selectedGroup !== null) {
  //     const response = await getPostBrowseByCategory(selectedCategory, selectedGroup, Number(params.type));
  //     console.log(response);
  //     setPosts(response.data);
  //   } 
  // }
  
  const listings = [
    {
      type: "Condos",
      price: "Price Upon Request",
      description: "My home general maintenance big or small",
      location: "Seven Mile Beach Corridor",
      image: "https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg",
    },
    {
      type: "Houses",
      price: "CI$ 799,900",
      description: "Invest Smart! Secure Steady Rental Income! Cayman Brac!",
      location: "Cayman Brac",
      image: "https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg",
    },
    {
      type: "Condos",
      price: "CI$ 410,000",
      description: "Secure Your Slice of Urban Elegance",
      location: "George Town",
      image: "https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg",
    },
    {
      type: "Houses",
      price: "CI$ 2,800,000",
      description: "CENTURY 21 | ROYAL PALM ESTATES",
      location: "Savannah / Newlands",
      image: "https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg",
    },
  ];
  // useEffect(() => {
  //   console.log(selectedCategory, selectedGroup,params.type);
  //   getPosts();
  // }, []);
  return (
    <div >
       <div className="flex items-center gap-2 mb-6 px-14 py-4">
       <Button 
       variant='outlined' 
       size='large'
       className='w-[10%]'
       onClick={()=>setSectionFilter(!sectionFilter)}
       ref={filterButtonRef}
       >For Sale <FaAngleDown/></Button>
       {
        sectionFilter && filterButtonRef.current && (
          <div
          style={{
            top: filterButtonRef.current.offsetTop + filterButtonRef.current.offsetHeight,
              left: filterButtonRef.current.offsetLeft,
          }} 
          className="absolute top-full left-0 mt-2 p-4 border rounded-lg bg-white shadow-md z-10">
            <p>Additional Filter Options</p>
          </div>
        )
       }
       <Search 
       size='large'
       placeholder="input search text" 
       className='w-[20%]'
       onSearch={()=>{}} 
       enterButton={<Button style={{ backgroundColor: '#6c757d', color: 'white' }}><FaSearch/></Button>} />
       </div>
       <hr/>
       {/* Filter & Sort */}
       <div className='bg-gray-300 p-14'>
      <div className="flex justify-end gap-4 mb-4">
        <button className='bg-green-400 text-white px-4 py-2 rounded-md'>Filter</button>
        <button className='bg-gray-600 text-white px-4 py-2 rounded-md'>Sort by ▼</button>
      </div>

      <div className="w-[100%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <div className='lg:h-[14%] md:h-[8%] w-[16%] lg:text-[26px] text-[20px] flex flex-col items-center justify-center m-2 rounded-full absolute top-0 right-0 bg-gray-200 opacity-30'>
              <FaHeart />
            </div>
            <img src={listing.image} alt={listing.type} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{listing.type}</h3>
              <p className="text-xl font-bold text-blue-600">{listing.price}</p>
              <p className="text-gray-600">{listing.description}</p>
              <p className="text-sm text-gray-500">📍 {listing.location}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default PostListing