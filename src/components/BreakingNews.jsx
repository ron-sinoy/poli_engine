import React, { useEffect, useState } from 'react';

const ROTATION_INTERVAL_MS = 3000;

const BreakingNews = ({ news = [], isLoading = false, error = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const incidents = news.filter((incident) => typeof incident?.body === 'string' && incident.body.trim());

  useEffect(() => {
    setActiveIndex(0);

    if (incidents.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % incidents.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [news, incidents.length]);

  const text = incidents[activeIndex]?.body
    || (isLoading ? 'Loading breaking news...' : '')
    || (error ? 'Breaking news is unavailable.' : '')
    || 'No breaking news available.';

  return (
    <div className="w-full max-w-[354px] min-h-[75px] bg-bnBg rounded-[24px] mx-auto flex flex-col items-start px-[16px] py-[12px] gap-[8px] box-border shrink-0 shadow-sm">
      <div className="h-[18px] rounded-[34px] bg-bnPill flex items-center justify-center px-[9px] shrink-0">
        <span className="font-inter font-medium text-[9px] text-bnPillText uppercase tracking-widest whitespace-nowrap">live</span>
      </div>
      <p className="font-anek font-semibold text-[12px] text-textMalayalam leading-[1.5] w-full">
        {text}
      </p>
    </div>
  );
};

export default BreakingNews;
