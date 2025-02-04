import React, { useEffect } from 'react';
import './BrowseByCategory.css';
import { FaBuilding, FaCar, FaIndustry, FaUtensils, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { getCategories } from '@/redux/slice/category';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  adsCount: number;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="category-card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="overlay">
        <div className="bg">
          <h3>{title}</h3>
          {/* <p>{adsCount} </p> */}
        </div>
      </div>
    </div>
  );
};

const BrowseByCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, categories, error } = useSelector((state: RootState) => state.category);
  const navigate = useNavigate();
  const iconsMap: Record<number, { imageUrl: string; icon: JSX.Element }> = {
    1: {
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      icon: <FaBuilding size={40} />,
    },
    2: {
      imageUrl:
        'https://blog.ipleaders.in/wp-content/uploads/2020/09/house-and-key-on-wooden-table-on-sunlight-background-building-concept-concept-of-selling-real-estate-1138190269-563869f4765c46a3a194e83d80ca61eb.jpg',
      icon: <FaCar size={40} />,
    },
    3: {
      imageUrl: 'https://wallpapers.com/images/hd/real-estate-background-vyigs4zta02jftx6.jpg',
      icon: <FaIndustry size={40} />,
    },
    4: {
      imageUrl:
        'https://th.bing.com/th/id/OIP.OH7KbfjqrFLWJsSNRRudxAHaHa?w=626&h=626&rs=1&pid=ImgDetMain',
      icon: <FaUtensils size={40} />,
    },
    5: {
      imageUrl:
        'https://conteudos.quintoandar.com.br/wp-content/uploads/2023/03/GettyImages-1409298953.jpg',
      icon: <FaShoppingCart size={40} />,
    },
    6: {
      imageUrl:
        'https://www.financialexpress.com/wp-content/uploads/2023/02/real-estate-Mumbai-2.jpg',
      icon: <FaUsers size={40} />,
    },
  };
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
    navigate(redirection(id));
    // You can add navigation or other logic here
  };
  useEffect(() => {
    dispatch(getCategories());
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
              src={iconsMap[category.categoryId].imageUrl}
              alt={category.categoryName}
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            <div className="flex items-center justify-center h-full text-teal-500 text-5xl lg:hidden">
              {iconsMap[category.categoryId].icon}
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
