import React from 'react'

const MyAccount = () => {
  return (
    <div className="flex h-screen bg-gray-100">
        <div className="w-1/4 bg-white shadow-md p-4">
            <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
            <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg">
            Messages (0)
            </button>
            <ul className="mt-4 space-y-2">
          {[
            "My Ads (0)",
            "My Profile",
            "Followed",
            "Payments",
            "Notification Settings",
          ].map((item, index) => (
            <li key={index} className="py-2 px-4 hover:bg-gray-200 rounded-lg">
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg">
          Delete Account
        </button>
        <button className="w-full bg-gray-300 text-black py-2 mt-2 rounded-lg">
          Post Ad
        </button>
        </div>
        <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-semibold p-4 border-b">Messages</h2>
        <div className="flex flex-1">
        <div className="w-1/3 border-r p-4"></div>
        </div>
        </div>
    </div>
  )
}

export default MyAccount