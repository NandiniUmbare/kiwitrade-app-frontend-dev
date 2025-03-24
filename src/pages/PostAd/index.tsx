import React, { useEffect, useState } from 'react';
import { CgAdd } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getGroups, getTypes } from '@/redux/slice/category';
import { FaBuilding, FaCar, FaIndustry, FaUtensils, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { AppDispatch, RootState } from '@/redux/store';
import AdDetails from './AdDetails';
// import { useNavigate, useParams } from 'react-router-dom';
import { setUser } from '@/redux/slice/user';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const PostAd: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.user);
  // const navigate = useNavigate();
  const { categories, groups, types } = useSelector((state: RootState) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [selectedType, setSelectedType] = useState<number>();
  const [selectedGroup, setSelectedGroup] = useState<number>();
  const [postType, setPostType] = useState<string>();
  const [next, setNext] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const iconsMap: Record<number, JSX.Element> = {
    1: <FaBuilding />,
    2: <FaCar />,
    3: <FaIndustry />,
    4: <FaUtensils />,
    5: <FaShoppingCart />,
    6: <FaUsers />,
  };

  const setDisableContinueBtn = () => {
    if (categories && !selectedCategory) {
      return true;
    } else if (groups && !selectedGroup) {
      return true;
    } else if (types && !selectedType) {
      return true;
    } else {
      return false;
    }
  };
  console.log(postType)
  useEffect(() => {
    if (postId) {
      setPostType("edit");
      setNext(true);
    } else {
      setPostType("add")
    }
  },[])
  useEffect(() => {
    const token = Cookies.get('token');
      if (token) {
        const userInfo = jwtDecode(token);
        const userDetails = Cookies.get('user');
        if (userDetails) {
          dispatch(setUser({...userInfo,userDetails}));
        } else {
          dispatch(setUser(null));
        }
      }else {
      dispatch(setUser(null));
    }
  }, [authToken]);
  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    selectedCategory && dispatch(getGroups(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    selectedCategory && selectedGroup && dispatch(getTypes({ categoryId: selectedCategory, groupId: selectedGroup }));
  }, [selectedCategory, selectedGroup]);

  useEffect(() => {
    setDisable(setDisableContinueBtn());
  }, [selectedCategory, selectedGroup, selectedType]);

  return (
    <div className="bg-gray-300 gap-4 sm:gap-8 py-4 px-4 sm:px-14 ">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-sky-700 flex items-center">
          <CgAdd />
          Post Ad
        </h1>
      </div>
      {!next ? (
        <div className="p-6 bg-white border border-gray-400 rounded-md">
          <h3 className="text-left text-2xl items-center">Select a Category</h3>
          <div className="mt-2 mb-6 flex flex-wrap w-full">
            {categories.map((category) => (
              <div
                key={category.categoryId}
                onClick={() => setSelectedCategory(category.categoryId)}
                className={`border rounded-lg cursor-pointer text-sm w-[30%] m-2 p-4 flex items-center text-xl ${selectedCategory === category.categoryId ? 'bg-blue-600 text-white border-blue-600' : 'text-sky-700'}`}
              >
                <h4 className="pr-4">{iconsMap[category.categoryId]}</h4>
                <h3 className="text-xl">{category.categoryName}</h3>
              </div>
            ))}
          </div>
          <hr />
          <div>
            <h3 className="text-left text-2xl items-center">Select a Group</h3>
            <div className="mt-2 mb-6 flex flex-wrap w-full text-center">
              {groups.map((group) => (
                <div
                  key={group.groupId}
                  onClick={() => setSelectedGroup(group.groupId)}
                  className={`border rounded-lg cursor-pointer text-sm w-[30%] m-2 p-4 flex ${selectedGroup === group.groupId ? 'bg-blue-600 text-white border-blue-600' : 'text-sky-700'}`}
                >
                  <h3 className="text-xl">{group.groupName}</h3>
                </div>
              ))}
            </div>
            <hr />
          </div>
          <div>
            <h3 className="text-left text-2xl items-center">Select a Type</h3>
            <div className="mt-2 mb-6 flex flex-wrap w-full text-center">
              {selectedCategory && selectedGroup && types?.map((data) => (
                <div
                  key={data.typeId}
                  onClick={() => setSelectedType(data.typeId)}
                  className={`border rounded-lg cursor-pointer text-sm w-[30%] m-2 p-4 flex ${selectedType === data.typeId ? 'bg-blue-600 text-white border-blue-600' : 'text-sky-700'}`}
                >
                  <h3 className="text-xl">{data.typeName}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              disabled={disable}
              onClick={() => setNext(true)}
              className={`text-2xl text-white p-3 rounded-lg ${disable ? 'bg-green-200' : 'bg-green-500'}`}
            >
              Continue{'>>'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <AdDetails
            categories={categories}
            selectedCategory={selectedCategory ?? 0}
            groups={groups}
            selectedGroup={selectedGroup ?? 0}
            typeData={types}
            selectedType={selectedType ?? 0}
            setNext={setNext}
          />
        </div>
      )}
    </div>
  );
};

export default PostAd;