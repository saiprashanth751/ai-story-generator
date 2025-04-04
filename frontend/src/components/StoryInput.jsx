import React from 'react';

const StoryInput = ({ name, value, onChange, placeholder, rows = 4, isDarkMode }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-2 border-2 rounded-lg ${
        isDarkMode
          ? 'bg-parchment-dark border-gray-600 text-gray-200 placeholder-gray-400'
          : 'bg-white bg-opacity-50 border-gray-400 text-gray-800 placeholder-gray-500'
      } font-['Lora'] focus:outline-none focus:ring-2 focus:ring-gold-500 transition shadow-inner`}
    />
  );
};

export default StoryInput;