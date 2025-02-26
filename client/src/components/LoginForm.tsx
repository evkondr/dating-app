import React from 'react';

const LoginForm = () => {
  return (
    <form className="space-y-6">
      <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
        Email address
      </label>
      <div className="mt-1">
        <input
          id='email'
          name='name'
        />
      </div>
    </form>
  );
};

export default LoginForm;