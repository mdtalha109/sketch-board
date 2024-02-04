import React from 'react'

const Card = ({className, children}) => {
  return (
    <div className={`bg-white rounded overflow-hidden shadow-lg  ${className}`}>
        {children}
    </div>
  )
}

export default Card