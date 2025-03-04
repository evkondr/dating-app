import React from 'react';

interface IProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  label: string
}
const RadioButton = ({label, ...props}:IProps) => {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="radio"
        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
      />
      <label htmlFor={props?.id} className='ml-2 block text-sm text-gray-900'>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;