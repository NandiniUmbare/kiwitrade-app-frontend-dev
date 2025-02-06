import React from 'react'

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;   
    children: React.ReactNode; 
}
const SignInModal: React.FC<SignInModalProps> = ({isOpen, onClose, children}) => {
    console.log(isOpen,children);
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">&times;</button>
        {children}
      </div>
    </div>
  )
}

export default SignInModal