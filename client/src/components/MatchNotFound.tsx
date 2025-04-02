import React from 'react';
import { Link } from 'react-router-dom';
import { UserX } from 'lucide-react';

const MatchNotFound = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        <UserX size={64} className='mx-auto text-pink-500 mb-4' />
        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Match Not Found</h2>
        <p className='text-gray-600'>Oops! It seems this match doesn&apos;t exist or has been removed.</p>
        <Link
          to='/'
          className='mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors 
				focus:outline-none focus:ring-2 focus:ring-pink-300 inline-block'
        >
				Go Back To Home
        </Link>
      </div>
    </div>
  );
};

export default MatchNotFound;