import React from 'react'

const Input = ({
    label = '',
    name = '',
    type = 'text',
    className = '',
    isRequired = true, 
    placeholder = '',
    value = '',
    onChange = () => {}
}) => {
  return (
    <div className='w-1/2'>
      {/* <label for={name} className='block ml-2 mb-1 text-sm font-medium text-gray-800'>{label}</label> */}
      <input type={type} id={name} className={`p-6 bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 block w-[380px]  ${className}`} placeholder={placeholder} value={value} onChange={onChange} required={isRequired}></input>
    </div>
  )
}

export default Input
