import React from 'react';

const Input = React.forwardRef(({ label, placeholder, value, onChange, className, style, type = 'text', ...rest }, ref) => {
  const inputStyle = {
    ...style
  };

  return (
    <div className={`input mb-4 ${className}`} style={inputStyle}>
      {label && <label className="block  mb-2">{label}</label>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`py-3 px-4 block w-full border outline-none border-gray-200 rounded-md text-sm focus:border-blue-500 focus:border-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${className}`}
        {...rest}
      />
    </div>
  );
});

Input.displayName = 'Input'

export default Input;
