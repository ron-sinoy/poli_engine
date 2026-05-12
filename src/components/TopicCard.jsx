import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ to, time, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="mx-auto flex min-h-[92px] w-full cursor-pointer items-start justify-between gap-[14px] bg-cardBg px-[20px] py-[18px] box-border no-underline transition-colors hover:bg-[#F8FAFC]"
  >
    <h2 className="flex-1 overflow-hidden font-anek text-[16px] font-semibold leading-[1.28] text-titleMalayalam line-clamp-3">
      {text}
    </h2>
    <span className="shrink-0 pt-[3px] font-inter text-[11px] font-medium leading-[1.2] text-timeText">{time}</span>
  </Link>
);

export default TopicCard;
