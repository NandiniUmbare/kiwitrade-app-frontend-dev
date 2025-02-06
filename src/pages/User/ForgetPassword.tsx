import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  return (
    <div className="py-8 flex items-center justify-center z-50 bg-gray-300">
      <div className="bg-white p-6 rounded-md shadow-lg relative">
      <h2 className="text-2xl font-semibold text-center text-green-400">Forgot your password?</h2>
      <p className="text-center text-gray-600 mt-1">
        Please enter your login email, we will send you a recovery email.
      </p>
      <label className="block text-left text-gray-700">Email</label>
        <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            placeholder="johnsmith@gmail.com"
            value={email}
            required
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          />
      <hr className='mt-8'/>
      <div className='mt-6 flex justify-between'>
        <Link to='/user/login/page' className="text-green-400">{'<--'}Return to Login</Link>
        <button className="px-12 py-2 font-semibold text-white bg-green-400 rounded-md hover:bg-green-500 transition">Submit</button>
      </div>
    </div>
    </div>
  )
}

export default ForgetPassword