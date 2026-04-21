import React from 'react';

const BreakingNews = ({ text }) => (
  // Used flex flex-row items-center and gap to ensure text and live-badge strictly never overlap
  <div className="w-full max-w-[354px] h-[75px] bg-bnBg rounded-[24px] mx-auto flex flex-row items-center px-[12px] gap-[20px] box-border shrink-0 shadow-sm relative">
    <div className="w-[15.61px] h-[52.21px] rounded-[34px] bg-bnPill flex items-center justify-center shrink-0 z-20 overflow-hidden">
      <span className="font-inter font-medium text-[9px] text-bnPillText uppercase -rotate-90 flex items-center justify-center h-full w-full tracking-widest whitespace-nowrap relative pt-[1px]">live</span>
    </div>
    <p className="font-anek font-semibold text-[12px] text-textMalayalam leading-[1.247] h-[37px] line-clamp-3 flex items-center">
      {text}
    </p>
  </div>
);

export default BreakingNews;
