import React, {useState} from 'react'
import { Link } from 'react-router-dom'
interface FormDataProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    emailNewsletter: boolean;
    termsAndConditions: boolean;
}
const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormDataProps>({});
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    }
  return (
    <div className="py-8 flex items-center justify-center z-50 bg-gray-300">
      <div className="bg-white p-6 rounded-md shadow-lg relative">
      <h2 className="text-2xl font-semibold text-center text-green-400">Sign In</h2>
        <p className="text-center text-gray-600 mt-1">
        Already have an account? <Link to='/user/login/page' className="text-green-400">Log In Here</Link>
        </p>
        <form className="mt-4">
        <label className="block text-left text-gray-700">Username</label>
        <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your desired username"
            value={formData.username}
            required
            id='username'
            onChange={(e) => onChange(e)}
          />
        <label className="block text-left text-gray-700">Email</label>
        <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter email"
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
          <label className="block text-left text-gray-700 mt-3">Re-enter Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            required    
            id='confirmPassword'
            onChange={(e) => onChange(e)}
          />
          <div className="text-left mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.emailNewsletter}
              id='emailNewsletter'
              onChange={(e) => onChange(e)}
            />
            <span className="text-gray-700">I accept to recevie the Debbie Email Newsletter.</span>
          </div>
          <div className="text-left mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.termsAndConditions}
              id='termsAndConditions'
              onChange={(e) => onChange(e)}
            />
            <span className="text-gray-700">I have read and accept eCay's </span>
            <a href="#" target='_blank' className="text-green-400">Terms and Conditions</a>
          </div>
          <hr className='mt-8'/>

          <button className="text-2xl font-semibold bg-green-400 text-white py-2 px-6 mt-4 rounded hover:bg-green-600">
          Create Account
          </button>
          </form>
      </div>
    </div>
  )
}

export default Register