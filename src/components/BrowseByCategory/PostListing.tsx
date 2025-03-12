import { getPostBrowseByCategory } from '@/api/data';
import { RootState } from '@/redux/store';
import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaMap, FaSearch, FaTh } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Input, List, Radio } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import MapListing from './MapListing';
export interface PostType {
  postId: number;
}

const PostListing: React.FC = () => {
  const [sectionFilter, setSectionFilter] = useState<boolean>(false);
  const [selectedGroupTab, setSelectedGroupTab] = useState<number>(1);
  const [view, setView] = useState<'map' | 'list'>('list');
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const { category } = useParams<{ category: string }>();
  const [filter, setFilter] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<boolean>(false);
  const [sortByFilter, setSortByFilter] = useState<boolean>(false);
  const sortByFilterRef = useRef<HTMLButtonElement>(null);
  const priceFilterRef = useRef<HTMLButtonElement>(null);
  const categoryFilterRef = useRef<HTMLButtonElement>(null);
  const sectionFilterRef = useRef<HTMLButtonElement>(null);

  const {selectedCategory, selectedGroup, groups} = useSelector((state: RootState) => state.category);
  const [posts, setPosts] = useState<PostType[]>([]);
  const params = useParams();
  const getPosts = async () => {
    // Fetch posts based on selectedCategory and selectedGroup
    if (selectedCategory !== null && selectedGroup !== null) {
      const response = await getPostBrowseByCategory(selectedCategory, selectedGroup, Number(params.type));
      console.log(response);
      setPosts(response.data);
    }
  }
  const listings = [
    {
      type: 'Condos',
      price: 'Price Upon Request',
      description: 'My home general maintenance big or small',
      location: 'Seven Mile Beach Corridor',
      image: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
    },
    {
      type: 'Houses',
      price: 'CI$ 799,900',
      description: 'Invest Smart! Secure Steady Rental Income! Cayman Brac!',
      location: 'Cayman Brac',
      image: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
    },
    {
      type: 'Condos',
      price: 'CI$ 410,000',
      description: 'Secure Your Slice of Urban Elegance',
      location: 'George Town',
      image: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
    },
    {
      type: 'Houses',
      price: 'CI$ 2,800,000',
      description: 'CENTURY 21 | ROYAL PALM ESTATES',
      location: 'Savannah / Newlands',
      image: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
    },
  ];
  useEffect(() => {
    // console.log(selectedCategory, selectedGroup,params.type);
    getPosts();
  }, []);
  console.log(posts);
  return (
    <div>
      <div className="flex items-center gap-2 mb-6 px-14 py-4">
        {category === 'real-estate' && (
          <Button
            variant="outlined"
            size="large"
            className="lg:w-[10%] md:w-[20%] p-4"
            onClick={() => setFilter(!filter)}
            ref={filterButtonRef}
          >
            <div className="flex items-center gap-2">
              <KeyOutlined />
              For Sale ▼
            </div>
          </Button>
        )}
        {filter && filterButtonRef.current && (
          <div
            style={{
              top: filterButtonRef.current.offsetTop + filterButtonRef.current.offsetHeight,
              left: filterButtonRef.current.offsetLeft,
            }}
            className="absolute top-full left-0 mt-2 p-4 border rounded-lg bg-white shadow-md z-10"
          >
            <div className="flex flex-col gap-4">
              <Radio.Group onChange={(e)=>(setSelectedGroupTab(Number(e.target.value)))}  defaultValue="1" buttonStyle="solid">
                <Radio.Button value="1">For Sale</Radio.Button>
                <Radio.Button value="2">For Rent</Radio.Button>
                <Radio.Button value="3">Shared</Radio.Button>
              </Radio.Group>
              <Button onClick={() =>{}} className="mt-2" type="primary">
                Filter
              </Button>
            </div>
          </div>
        )}
        {(category === 'autos-and-boats' ||
          category === 'buy-and-sell' ||
          category === 'jobs' ||
          category === 'services-specials' ||
          category === 'community-events') && (
          <Button
            variant="outlined"
            size="large"
            className="lg:w-[10%] md:w-[20%] p-4"
            onClick={() => setSectionFilter(!sectionFilter)}
            ref={sectionFilterRef}
          >
            <div className="flex items-center gap-2">Section ▼</div>
          </Button>
          )}
          {sectionFilter && sectionFilterRef.current && (
          <div
            style={{
              top: sectionFilterRef.current.offsetTop + sectionFilterRef.current.offsetHeight,
              left: sectionFilterRef.current.offsetLeft,
            }}
            className="absolute top-full left-0 mt-2 p-4 border rounded-lg bg-white shadow-md z-10"
          >
            <div className="flex flex-col gap-4">
              <h5 className="text-left font-bold">Section</h5>
              <Radio.Group
                className="flex flex-col gap-3"
                options={[{ label: 'All', value: 0 }, ...groups.map((group) => ({ label: group.groupName, value: group.groupId }))]}
                onChange={(e) => console.log(e.target.value)}
              />
              <Button className="mt-2" type="primary">
                Switch
              </Button>
            </div>
          </div>
          )}
        {(category === 'autos-and-boats' ||
        category === 'buy-sell' ||
        category === 'jobs' ||
        category === 'services-specials' ||
        category === 'community-events') && (
        <Button
          variant="outlined"
          size="large"
          className="lg:w-[10%] md:w-[20%] p-4"
          onClick={() => setCategoryFilter(!categoryFilter)}
          ref={categoryFilterRef}
        >
          <div className="flex items-center gap-2">Category ▼</div>
        </Button>
        )}
        {categoryFilter && categoryFilterRef.current && (
        <div
          style={{
            top: categoryFilterRef.current.offsetTop + categoryFilterRef.current.offsetHeight,
            left: categoryFilterRef.current.offsetLeft,
          }}
          className="absolute top-full left-0 mt-2 p-4 border rounded-lg bg-white shadow-md z-10"
        >
          <div className="flex flex-col gap-4">
            <h5 className="text-left font-bold">Category</h5>
            <Checkbox.Group className="flex flex-col gap-3">
              <Checkbox value="A">Option A</Checkbox>
              <Checkbox value="B">Option B</Checkbox>
              <Checkbox value="C">Option C</Checkbox>
            </Checkbox.Group>
            <Button className="mt-2" type="primary">
              Filter
            </Button>
          </div>
        </div>
        )}
        {(category === 'autos-and-boats' ||
          category === 'buy-and-sell' ||
          category === 'jobs' ||
          category === 'services-specials' ||
          category === 'community-events') && (
          <Button
              variant="outlined"
              size="large"
              className="lg:w-[10%] md:w-[20%] p-4"
              onClick={() => setPriceFilter(!priceFilter)}
              ref={priceFilterRef}
          >
              Price ▼
          </Button>
          )}
          {priceFilter && priceFilterRef.current && (
          <div
              style={{
                  top: priceFilterRef.current.offsetTop + priceFilterRef.current.offsetHeight,
                  left: priceFilterRef.current.offsetLeft,
              }}
              className="absolute top-full left-0 mt-2 p-4 border rounded-lg bg-white shadow-md z-10"
          >
              <div className="flex flex-col gap-4">
                  <h5 className="text-left font-bold">Price Range</h5>
                  <Button className="mt-2" type="primary">
                      Filter
                  </Button>
              </div>
          </div>
          )}
        <Search
          size="large"
          placeholder="input search text"
          className="w-[20%]"
          onSearch={() => {}}
          enterButton={
            <Button style={{ backgroundColor: '#6c757d', color: 'white' }}>
              <FaSearch />
            </Button>
          }
        />
      </div>
      <hr />
      {/* Filter & Sort */}
      <div className="bg-gray-300 p-14">
        <div className="flex justify-end gap-4 mb-4">
          <div className="flex">
            <Button
              size='large'
              onClick={() => setView('map')}
              className={`hover:!bg-green-500 ${view === 'map' ? 'bg-green-500' : 'bg-transparent'} border border-green-400 rounded-r-none`}
            >
              <FaMap className="text-green-600" />
            </Button>
            <Button
              size='large'
              onClick={() => setView('list')}
              className={`${view === 'list' ? 'bg-green-500' : 'bg-transparent'} hover:!bg-green-500 border border-green-400 rounded-l-none`}
            >
              <FaTh className="text-green-600" />
            </Button>
          </div>

          <button className="bg-green-400 text-white px-4 py-2 rounded-md">Filter</button>
          <Button
            size='large'
            onClick={() => setSortByFilter(!sortByFilter)}
            ref={sortByFilterRef}
            className="text-white bg-gray-800 px-4 py-3 rounded-md"
          >
            Sort by ▼
          </Button>
          {sortByFilter && sortByFilterRef.current && (
            <div
              style={{
                top: sortByFilterRef.current.offsetTop + sortByFilterRef.current.offsetHeight,
                left: sortByFilterRef.current.offsetLeft,
              }}
              className="absolute top-full left-0 mt-2 p-4 border rounded-lg bg-white shadow-md z-10"
            >
              <List
                size="small"
                dataSource={['Newest', 'Oldest', 'Price Low', 'Price High']}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          )}
        </div>
        {view === 'list' ? (
          <div className="w-[100%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing, index) => (
            <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="lg:h-[14%] md:h-[8%] w-[16%] lg:text-[26px] text-[20px] flex flex-col items-center justify-center m-2 rounded-full absolute top-0 right-0 bg-gray-200 opacity-30">
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
        ) : (
            <div className="w-[100%] h-[500px] bg-gray-200">
              <MapListing/>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListing;
