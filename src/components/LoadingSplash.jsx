import React from 'react';
import './LoadingSplash.css';
import splashImage from '../../emote_hog_rider_confused.png';

const LoadingSplash = () => {
  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center bg-white">
      <img
        src={splashImage}
        alt="Loading"
        className="loading-splash-blink block h-[200px] w-[256px] max-w-full object-contain"
      />
    </div>
  );
};

export default LoadingSplash;
