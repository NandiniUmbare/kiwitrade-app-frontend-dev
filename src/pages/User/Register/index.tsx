import { registerUser } from '@/api/data';
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import message from 'antd/es/message';
import { Button } from 'antd';
export interface FormDataProps {
    username: string;
    email: string;
    contactNo: number | undefined;
    password: string;
    confirmPassword: string;
    emailNewsletter: boolean;
    termsAndConditions: boolean;
}
interface ErrorProps {
  username: string;
  email: string;
  contactNo: string;
  password: string;
  confirmPassword: string;
  other: any;
}
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormDataProps>({
      username: "",
      email: "",
      contactNo: undefined,
      password: "",
      confirmPassword: "",
      emailNewsletter: false,
      termsAndConditions: false,
    });
    const [errors, setErrors] = useState({
      username: '',
      email: '',
      contactNo: '',
      password: '',
      confirmPassword: '',
      other: ''
    });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: "",
      }));
    }
    const validateUser = (): boolean => {
      const password = formData.password?.trim();
      const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{6,16}$/;
      const newErrors: ErrorProps = {
        username: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
        other: ''
      };
      let isValid: boolean = true;
      if (!formData.username) {
        newErrors.username = "Name is required.";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email is required.";
        isValid = false;
      }
      if (!password) {
        newErrors.password = "Password is required.";
        isValid = false;
    } else if (!strongPasswordRegex.test(password)) {
        newErrors.password = "Password must be 6-16 characters, include 1 uppercase letter, 1 number, and 1 special character.";
        isValid = false;
    }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
        isValid = false;
      }
      setErrors(newErrors);
      return isValid;
    }
    const postUser = async() => {
      try {
        const response = await registerUser(formData);
        if(response?.statusCode === 200){
          message.success(response.data.message);
          navigate('/user/login/page');
        } else {
          if(response.data.statusCode == 409){
            setErrors({...errors, other: response.data.message})
          } else {
            console.log(response.data.errors)
          }
        }
      } catch (error) {
        // setErrors({...errors, other: (error as any).message})
        console.log(error)
      }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateUser()) {
        postUser();
      } else {
        console.log(errors);
      }
    }

  return (
    <div className="py-8 flex flex-col items-center justify-center z-50 bg-gray-300">
      <Button className= 'right-[40%]' onClick={() => navigate('/')}>⬅Go back</Button>
      <div className="bg-white p-6 rounded-md shadow-lg relative">
      <h2 className="text-2xl font-semibold text-center text-green-400">Sign In</h2>
        <p className="text-center text-gray-600 mt-1">
        Already have an account? <Link to='/user/login/page' className="text-green-400">Log In Here</Link>
        </p>
        <form className="mt-4" onSubmit={handleSubmit}>
        {errors.other && 
        <p className="text-red-500 text-xs">{errors.other}</p>}
        <label className="block text-left text-gray-700">Name</label>
        <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your desired username"
            value={formData.username}
            id='username'
            onChange={(e) => onChange(e)}
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
        <label className="block text-left text-gray-700">Email</label>
        <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter email"
            value={formData.email}
            id='email'
            onChange={(e) => onChange(e)}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          <label className="block text-left text-gray-700">Contact</label>
        <input
            type="number"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Contact"
            value={formData.contactNo}
            id='contactNo'
            onChange={(e) => onChange(e)}
          />
          {errors.contactNo && <p className="text-red-500 text-xs">{errors.contactNo}</p>}
          <label className="block text-left text-gray-700 mt-3">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your password"
            value={formData.password}    
            id='password'
            onChange={(e) => onChange(e)}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          <label className="block text-left text-gray-700 mt-3">Re-enter Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}    
            id='confirmPassword'
            onChange={(e) => onChange(e)}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
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

          <button type="submit" className="text-2xl font-semibold bg-green-400 text-white py-2 px-6 mt-4 rounded hover:bg-green-600">
          Create Account
          </button>
          </form>
      </div>
    </div>
  )
}

export default Register