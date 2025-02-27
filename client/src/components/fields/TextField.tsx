import React from 'react';

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  label: string
}
const TextField = ({label, ...props}:IProps) => {
  return (
    <>
      <label htmlFor={props?.id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        {...props}
        className='className="appearance-none block w-full px-3 py-2
          border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none 
          focus:ring-pink-500 focus:border-pink-500 sm:text-sm"'
      />
    </>
  );
};

export default TextField;