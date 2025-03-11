import React from 'react';

interface IBaseProps {
  label: string;
}
interface IInputProps extends IBaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  textArea?: false;
}
interface ITextAreaProps extends IBaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textArea: true;
}
type TextFieldProps = IInputProps | ITextAreaProps;

const TextField = ({label, textArea, ...props}:TextFieldProps) => {
  return (
    <>
      <label htmlFor={props?.id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className="mt-1">
        {textArea ? (
          <textarea 
            {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          />) : (
          <input
            {...props as React.InputHTMLAttributes<HTMLInputElement>}
            className="appearance-none block w-full px-3 py-2
          border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none 
          focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        )}
      </div>
    </>
  );
};

export default TextField;