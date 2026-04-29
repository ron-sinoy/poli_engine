import React from 'react';
import splashImage from '../assets/cat_loading.gif';

const LoadingSplash = () => {
  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center bg-white">
      <img
        src={splashImage}
        alt="Loading"
        className="block h-[200px] w-[256px] max-w-full object-contain"
      />
    </div>
  );
};

export default LoadingSplash;
