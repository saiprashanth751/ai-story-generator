import React from 'react';

const Button = ({ onClick, disabled, children, color = 'purple', className = '' }) => {
  const colorStyles = {
    purple: 'bg-purple-700 hover:bg-purple-800 border-purple-900',
    green: 'bg-green-700 hover:bg-green-800 border-green-900',
    blue: 'bg-blue-700 hover:bg-blue-800 border-blue-900',
    red: 'bg-red-700 hover:bg-red-800 border-red-900',
    teal: 'bg-teal-700 hover:bg-teal-800 border-teal-900',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 rounded-lg text-white font-semibold border-2 ${
        disabled
          ? 'bg-gray-500 border-gray-700 cursor-not-allowed opacity-50'
          : `${colorStyles[color] || colorStyles.purple} transition-all duration-300 hover:shadow-md`
      } font-['Lora'] tracking-wide ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;