import { Loader } from 'lucide-react';
import React from 'react';

const LoadingMessagesUI = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        <Loader size={48} className='mx-auto text-pink-500 animate-spin mb-4' />
        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Loading Chat</h2>
        <p className='text-gray-600'>Please wait while we fetch your conversation...</p>
        <div className='mt-6 flex justify-center space-x-2'>
          <div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce' style={{ animationDelay: '0s' }}></div>
          <div
            className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessagesUI;