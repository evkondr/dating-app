import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
const Button = ({
  type,
  children,
  ...props
}:IProps) => {
  return (
    <button
      type={type}
      {...props}
      className={`w-full flex justify-center py-2 px-4
      border border-transparent rounded-md
      shadow-sm text-sm font-medium text-white ${props.disabled ? 
      'bg-pink-400 cursor-not-allowed':
      'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'}`}
    >
      {children}
    </button>
  );
};

export default Button;