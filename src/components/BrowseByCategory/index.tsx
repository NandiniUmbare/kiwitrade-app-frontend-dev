import React, { useEffect } from 'react';
import './BrowseByCategory.css';
import { getCategories, setSelectedCategory } from '@/redux/slice/category';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const BrowseByCategory: React.FC = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector((state: RootState) => state.category);
  const navigate = useNavigate();
  
  const redirection = (id: number): string => {
    if (id === 1) {
      return '/real-estate';
    }
    if (id === 2) {
      return '/autos-boats';
    }
    if (id === 3) {
      return '/buy-sell';
    }
    if (id === 4) {
      return '/jobs';
    }
    if (id === 5) {
      return '/services-specials';
    }
    if (id === 6) {
      return '/community-events';
    }
    return '/';
  };

  const handleClick = (id: number) => {
    dispatch(setSelectedCategory(id));
    navigate(redirection(id));
    // You can add navigation or other logic here
  };
  useEffect(() => {
    appDispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="gap-4 sm:gap-8 py-4 px-4 sm:px-14">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        Browse By <span className="italic text-gray-600 font-playfair font-normal">Category</span>
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-8">
        Feel free to adapt this based on the specific managed services, features
      </p>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.categoryName}
            onClick={() => handleClick(category.categoryId)}
            className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={category.imageUrl}
              alt={category.categoryName}
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            <div className="flex items-center justify-center h-full text-teal-500 text-5xl lg:hidden">
              {category.icon}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end pb-7 justify-center">
              <div className="bg-white w-80 rounded-md p-2 flex flex-col items-center justify-center">
                <h3 className="text-black text-lg font-bold">{category.categoryName}</h3>
                {/* <p className="text-gray-600 text-sm font-semibold">
                  {category.adsCount} ads
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
