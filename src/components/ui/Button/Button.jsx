import React from 'react'

const Button = ({ children, onClick, className, type='submit', ...rest }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-2 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold outline-none bg-blue-500 text-white hover:bg-blue-600 focus:outline-none  text-sm  ${className}`}
        >
        
            {children}
        </button>
    )
}
export default Button