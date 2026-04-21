import React from 'react';

const TopicCard = ({ time, text, onClick }) => (
  // Used items-center and justify-between on a row flexbox layout to ensure the content is vertically aligned mathematically centered
  // Added hover and active interactions to reflect dynamic routing mapping
  <div onClick={onClick} className="cursor-pointer hover:bg-gray-100 transition-colors w-full max-w-[354px] h-[105px] bg-cardBg rounded-[34px] mx-auto px-[33px] pr-[27px] box-border shrink-0 z-10 shadow-sm flex flex-row items-center justify-between">
    <h2 className="font-noto font-semibold text-[16px] text-titleMalayalam leading-[1.247] w-[225px] overflow-hidden line-clamp-3">
      {text}
    </h2>
    <div className="w-[69px] h-[20px] bg-timeBg rounded-[34px] flex items-center justify-center shrink-0">
      <span className="font-inter font-medium text-[9px] text-timeText tracking-tight">{time}</span>
    </div>
  </div>
);

export default TopicCard;
