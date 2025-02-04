import React, { useEffect, useState } from 'react';
import jobs from '@assets/images/jobs.png';
import Header from '../Header';

const Jobs: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);
  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img src={jobs} alt="Real Estate" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center h-full text-white">
        <Header />
        <h1 className="text-4xl text-center p-6 text-white font-bold mt-16">
          Connecting great candidates with great jobs
        </h1>
        <div className="flex">
          <div
            onClick={() => setSelectedOption('find-talents')}
            className="bg-gray-100 bg-opacity-30 px-16 py-8"
          >
            <h3 className="text-white text-xl font-semibold">Find Talent</h3>
          </div>
          <div
            onClick={() => setSelectedOption('find-jobs')}
            className="bg-gray-100 bg-opacity-30 px-16 py-8"
          >
            <h3 className="text-white text-xl font-semibold">Find Jobs</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
