import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';

interface FormDataProps {
    email: string;
    password: string;
    rememberMe: boolean;
}
interface SignInProps {
  onClose: () => void | null;
}
const SignIn: React.FC<SignInProps> = ({onClose}) => {
  const params = useParams();
    const [formData, setFormData] = useState<FormDataProps>({});
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
        console.log(formData);
    }
    console.log(params.page)
  return (
    <div className={`${params.page == 'page' ? 'py-8 flex items-center justify-center z-50 bg-gray-300':''}`}>
    <div className={`${params.page == 'page' ? 'w-[35%] bg-white p-6 rounded-md shadow-lg relative':''}`}>
        <h2 className="text-2xl font-semibold text-center text-green-400">Sign In</h2>
        <p className="text-center text-gray-600 mt-1">
          Don't have an account? <Link onClick={()=>onClose()} to='/user/register' className="text-green-400">Register Here</Link>
        </p> 
        <form className="mt-4">
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
          <button onClick={handleClick} className={`${params.page==='page' ? 'text-2xl font-semibold py-2 px-6' : 'w-full'} bg-green-400 text-white py-2 mt-4 rounded hover:bg-green-600`}>
            Log In
          </button>
        </form>
    </div>
    </div>
  )
}

export default SignIn