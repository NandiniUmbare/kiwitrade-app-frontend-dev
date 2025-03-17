import { getSuburbs } from '@/redux/slice/location';
import { getPosts } from '@/redux/slice/posts';
import { AppDispatch, RootState } from '@/redux/store';
import { Button, Select } from 'antd';
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserPosts: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => { 
    dispatch(getPosts());
    dispatch(getSuburbs({ cityId: 0, districtId: 0 }));
  },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6'>{
      posts.map((post) => {
        const images = post.photo.split(',');
        return (
          <div key={post?.productId} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={images[0]}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-xl font-bold text-blue-600">{post.price}</p>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-sm text-gray-500">📍 { }</p>
                  <Select size='large' className='w-full mt-4' defaultValue={'onSale'}>
                    <Select.Option selected value="onSale">On Sale</Select.Option>
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="sold">Sold</Select.Option>
              </Select>
              <div className='flex justify-between gap-4 mt-4'>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-l'>Updated</h2>
                  <label>{ post.createdDate?.toDateString()}</label>
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-l'>Expires</h2>
                </div>
                </div>
                  <div className='flex justify-between gap-4'>
                <Button
                  onClick={() => { navigate(`/post-add?podtId=${post.productId}`) }}
                  className='w-full mt-4 bg-green-500 hover:!bg-green-500 hover:!text-black hover:border-none'>
                  <FaEdit/>Edit</Button>
                <Button
                  onClick={() => { }}
                  className='w-full mt-4 bg-red-500 hover:!bg-red-500'
                  type='primary'><MdDelete/>Delete</Button>
                  </div>
            </div>
          </div>
        )
      })
    }
      </div>
  )
}

export default UserPosts