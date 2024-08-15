import React from 'react';

const Button = ({
    label = 'Button',
    type = 'button',
    className = '',
    disabled = false
}) => {
  return (
    <button 
      type={type} 
      className={` w-[380px] text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm p-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className} `} 
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button;
