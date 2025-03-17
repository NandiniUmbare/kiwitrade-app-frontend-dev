import React from 'react'
import { setToken, setUser } from '@/redux/slice/user';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import UserPosts from '@/components/UserPosts';
import Messages from '@/components/Messages';

const MyAccount: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = React.useState<string>("My Posts");
  const handleClick = (item: string) => () => {
    if (item === "My Posts") {
      setActiveTab('My Posts');
    } else if (item === "Messages") {
      setActiveTab('Messages');
    }
    else if (item === "Logout") {
      setActiveTab('Logout');
      dispatch(setToken(null));
      dispatch(setUser(null));
      Cookies.remove('token');
      Cookies.remove('user');
      navigate('/');
    }
  }
  if (user) {
    return (
    <div className="flex h-screen bg-gray-100">
        <div className="w-1/4 bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
            <ul className="mt-4 space-y-2">
            {["My Posts",
            "Messages",
            "Logout"
          ].map((item, index) => (
            <li key={index} onClick={handleClick(item)} className={`cursor-pointer ${activeTab === item ? 'bg-green-400' : ''} py-2 px-4 hover:bg-green-400 rounded-lg`}>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg">
          Delete Account
        </button>
        <button onClick={()=>navigate('/post-add')} className="w-full bg-gray-300 text-black py-2 mt-2 rounded-lg">
          Post Ad
        </button>
        </div>
        <div className="flex-1 flex flex-col">
          {activeTab === "My Posts" && (
            <UserPosts />
          )}
          {activeTab === "Messages" && (
            <Messages />
          )}
        </div>
    </div>
  )
  } else {
    navigate('/')
  }
  
}

export default MyAccount