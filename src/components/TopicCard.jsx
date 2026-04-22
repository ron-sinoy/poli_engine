import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ to, time, text, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="cursor-pointer hover:bg-gray-100 transition-colors w-full max-w-[354px] h-[105px] bg-cardBg rounded-[34px] mx-auto px-[33px] pr-[27px] box-border shrink-0 z-10 shadow-sm flex flex-row items-center justify-between no-underline"
    >
      <h2 className="font-anek font-semibold text-[16px] text-titleMalayalam leading-[1.247] w-[225px] overflow-hidden line-clamp-3">
        {text}
      </h2>
      <div className="w-[69px] h-[20px] bg-timeBg rounded-[34px] flex items-center justify-center shrink-0">
        <span className="font-inter font-medium text-[9px] text-timeText tracking-tight">{time}</span>
      </div>
    </Link>
);

export default TopicCard;
