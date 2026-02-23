import React from 'react'

function Button({
    children,
    type='button',
    bgColor = 'bg-red-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-2 py-2 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
        { children }
    </button>
  )
}

export default Button