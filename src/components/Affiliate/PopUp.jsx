import React, { useState } from 'react';
import selectIcon from '../../../public/tick.png'; // Ensure the path is correct

const Popup = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div
    className="bg-[#1A1D26] border-2 border-transparent flex flex-col items-center justify-center rounded-[50px] p-[168px_79px] opacity-100"
    style={{
      borderImageSource: 'linear-gradient(90deg, #45F882 0%, #FFBE18 100%)',
      borderImageSlice: 1,
      borderWidth: '2px', // Explicitly set the border width to ensure it's applied
    }}
  >
    <img src={selectIcon} alt="Select Icon" className="w-16 h-16 mb-4" />
    <h2 className="text-green-500 text-center">Congratulations!</h2>
    <p className="text-white text-center">The Affiliate Rock Tournament has been created successfully.</p>
  </div>
</div>

  );
};

export default Popup;
