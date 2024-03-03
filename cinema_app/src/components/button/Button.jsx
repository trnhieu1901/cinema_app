import React from 'react';

const Button = ({
  children,
  type,
  bgColor = 'primary',
  className,
  onClick,
}) => {
  let bgClassName = 'bg-primary';
  switch (bgColor) {
    case 'primary':
      bgClassName = 'bg-primary';
      break;
    case 'secondary':
      bgClassName = 'bg-secondary';
      break;
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white py-3 px-6 ${bgClassName} ${className} rounded-lg shadow-lg capitalize font-bold mt-auto`}
    >
      {children}
    </button>
  );
};

export default Button;
