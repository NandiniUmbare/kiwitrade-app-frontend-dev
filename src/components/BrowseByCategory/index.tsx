import React from "react";
import realEstate from "@images/realestate.jpg";
import './BrowseByCategory.css'
import { FaBuilding, FaCar, FaIndustry, FaUtensils, FaShoppingCart, FaUsers } from "react-icons/fa";

interface CategoryCardProps {
  title: string;
  adsCount: number;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
  return (
    <div
      className="category-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="overlay">
        <div className="bg">
          <h3>{title}</h3>
          {/* <p>{adsCount} </p> */}
        </div>
      </div>
    </div>
  );
};

const categories = [
  {
    title: "Real Estate",
    imageUrl:
      "https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg",
    adsCount: "1,968",
    icon: <FaBuilding size={40} />, 
  },
  {
    title: "Cars & Boats",
    imageUrl:
      "https://blog.ipleaders.in/wp-content/uploads/2020/09/house-and-key-on-wooden-table-on-sunlight-background-building-concept-concept-of-selling-real-estate-1138190269-563869f4765c46a3a194e83d80ca61eb.jpg",
    adsCount: "2,568",
    icon: <FaCar size={40} />, 
  },
  {
    title: "Industrial Jobs",
    imageUrl:
      "https://wallpapers.com/images/hd/real-estate-background-vyigs4zta02jftx6.jpg",
    adsCount: "1,569",
    icon: <FaIndustry size={40} />, 
  },
  {
    title: "Restaurants & Events",
    imageUrl:
      "https://th.bing.com/th/id/OIP.OH7KbfjqrFLWJsSNRRudxAHaHa?w=626&h=626&rs=1&pid=ImgDetMain",
    adsCount: "1,968",
    icon: <FaUtensils size={40} />,
  },
  {
    title: "Buy & Sell",
    imageUrl:
      "https://conteudos.quintoandar.com.br/wp-content/uploads/2023/03/GettyImages-1409298953.jpg",
    adsCount: "2,568",
    icon: <FaShoppingCart size={40} />, 
  },
  {
    title: "Community & Events",
    imageUrl:
      "https://www.financialexpress.com/wp-content/uploads/2023/02/real-estate-Mumbai-2.jpg",
    adsCount: "1,569",
    icon: <FaUsers size={40} />, 
  },
];

const BrowseByCategory: React.FC = () => {
  return (
    <div className="px-4 py-8 text-left">
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        Browse By <span className="italic text-gray-600 font-playfair font-normal">Category</span>
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-8">
        Feel free to adapt this based on the specific managed services, features
      </p>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.title}
            className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={category.imageUrl}
              alt={category.title}
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            <div className="flex items-center justify-center h-full text-teal-500 text-5xl lg:hidden">
              {category.icon} 
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end pb-7 justify-center">
              <div className="bg-white w-80 rounded-md p-2 flex flex-col items-center justify-center">
                <h3 className="text-black text-lg font-bold">{category.title}</h3>
                <p className="text-gray-600 text-sm font-semibold">
                  {category.adsCount} ads
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
