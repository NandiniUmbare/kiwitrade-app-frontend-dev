import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SignInModal from './SignInModal';
import SignIn from '../../pages/User/SignIn';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '@/redux/slice/user';
import { useAuthToken } from '@/hooks/useAuthToken';
import Cookies from 'js-cookie';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({children}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useAuthToken();
  const {user} = useSelector((state: RootState) => state.user);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (Cookies.get('token')) {
      const token = Cookies.get('token');
      console.log(token)
      if (token) {
        const userInfo = jwtDecode(token);
        dispatch(setUser(userInfo));
        console.log(userInfo)
      }
    } else {
      dispatch(setUser(null));
    }
  }, []);
console.log(user)
  return (
    <>
    <header className="bg-transparent shadow w-full">
      {/* Full-width container */}
      <div className="w-full">

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 py-4 px-4 sm:px-14 ">
          {/* Logo Section */}
          <div className="w-full sm:w-auto text-start sm:text-left">
            <h1 onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">
              <span className="text-green-800">PRO</span>
              <span className="font-light">Trader</span>
            </h1>
            <p className="text-sm text-gray-500">Trade Like A Real Pro</p>
          </div>

          {/* Stats Section */}
          <div className="w-full sm:w-auto text-center sm:text-right text-green-800 font-bold text-lg px-4 py-2 ">
            <div className="flex justify-center sm:justify-start items-center space-x-1">
              <span className="bg-green-500 text-white px-2 py-1 rounded">4</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">3</span>,
              <span className="bg-green-500 text-white px-2 py-1 rounded">1</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">2</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">5</span>
              <span className="text-gray-600 text-base ml-2">Ads</span>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex flex-1 border border-gray-300 overflow-hidden rounded w-full sm:w-auto">
            <input
              type="text"
              className="flex-1 px-4 py-2 text-gray-700 outline-none"
              placeholder="Search your product..."
            />
            <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition">
              🔍
            </button>
          </div>
          <SignInModal 
            isOpen={isModalOpen} 
            onClose={() => setModalOpen(false)}>
              <SignIn onClose={() => setModalOpen(false)}/>
          </SignInModal>
          {/* My Account Section (Desktop only) */}
          <button
              onClick={() => user && navigate('/post-add')}
              className="px-4 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              POST Ad
            </button>
          <div className="hidden sm:block">
            {
              user ? (
                <button onClick={()=> navigate('/user/account')} className="px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition">
                  👤 My Account
                </button>
              ) : (
                <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition">
                  🚀 Sign in
                </button>
              )
            }
          </div>
        </div>
      </div>
    </header>
    <div>
      {children}
    </div>
    </>
  );
};

export default Header;