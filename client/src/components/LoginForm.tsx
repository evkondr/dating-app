import React, { useState } from 'react';
import Button from './buttons/Button';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const loading = false;
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
        Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="name"
            type="email"
            autoComplete="email"
            value={email}
            required
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2
          border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none 
          focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            required
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2
          border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none 
          focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;