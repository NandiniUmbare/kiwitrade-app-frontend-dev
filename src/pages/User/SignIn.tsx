import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {GoogleOAuthProvider, GoogleLogin, CredentialResponse} from '@react-oauth/google';
import { loginUser, userGoogleLogin } from '@/api/data';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/slice/user';

interface FormDataProps {
    email: string;
    password: string; 
    rememberMe: boolean;
}
interface SignInProps {
  onClose: () => void | null;
}
const SignIn: React.FC<SignInProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataProps>({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setErrors('');
        setFormData({...formData, [id]: value});
    }
    const handleloginUser = async() => {
      try {
        const response = await loginUser({
          email: formData.email,
          password:formData.password
        });
        if(response.statusCode === 200){
          Cookies.set('token', response.token, { expires: 1 });
          Cookies.set('user', JSON.stringify(response.userDetails), { expires: 1 });
          dispatch(setToken(response.token));
          onClose();
          navigate('/');
        } else {
          setErrors(response.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
    const googleLogin = async(email: string) =>{
      try {
        const response = await userGoogleLogin({
          email: email
        });
        if(response.statusCode === 200){
          Cookies.set('token', response.token, { expires: 1 });
          Cookies.set('user', JSON.stringify(response.userDetails), { expires: 1 });
          dispatch(setToken(response.token));
          onClose();
          navigate('/');
        } else {
          setErrors(response.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleloginUser();
    }
    const handleLoginSuccess = (response: CredentialResponse) => {
      const idToken = response.credential;
      if (idToken) {
        const userInfo = jwtDecode(idToken); 
        googleLogin(userInfo.email);
      } else {
        console.error('ID token is undefined');
      }
              // dispatch(setUser(userInfo));
    }
  return (
    <div className={`${params.page == 'page' ? 'py-8 flex items-center justify-center z-50 bg-gray-300':''}`}>
    <div className={`${params.page == 'page' ? 'lg:w-[35%] md:w-[50%] bg-white p-6 rounded-md shadow-lg relative':''}`}>
        <h2 className="text-2xl font-semibold text-center text-green-400">Sign In</h2>
        <p className="text-center text-gray-600 mt-1">
          Don't have an account? <Link onClick={()=>onClose()} to='/user/register' className="text-green-400">Register Here</Link>
        </p> 
        {errors && (<p className='text-red-500 text-xs'>{errors}</p>)}
        <form className="mt-4" onSubmit={handleSubmit}>
        <label className="block text-left text-gray-700">Email</label>
        <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your email"
            value={formData.email}
            required
            id='email'
            onChange={(e) => onChange(e)}
          />
          <label className="block text-left text-gray-700 mt-3">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your password"
            value={formData.password}
            required    
            id='password'
            onChange={(e) => onChange(e)}
          />
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.rememberMe}
              id='rememberMe'
              onChange={(e) => onChange(e)}
            />
            <span className="text-gray-700">Remember me</span>
          </div>
          <div className="text-right mt-2">
            <Link onClick={()=>onClose()} to='/user/forgetpassword' className="text-green-400">Forgot your Password?</Link>
          </div>
          {params.page == 'page' && (
            <hr className='mt-8'/>
          )}
          <button type='submit' className={`${params.page==='page' ? 'text-2xl font-semibold py-2 px-6' : 'w-full'} bg-green-400 text-white py-2 mt-4 rounded hover:bg-green-600`}>
            Log In
          </button>
        </form>
        <hr/>
        <div className='mt-8'>
        <span className="text-gray-700">Or</span>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
          <GoogleLogin onSuccess={handleLoginSuccess}/>        
        </GoogleOAuthProvider>
        </div>
    </div>
    </div>
  )
}

export default SignIn