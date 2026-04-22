import React, { useState } from 'react';

const DevelopmentNoticeBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <div className="w-full max-w-[354px] rounded-[18px] border border-[#D8CBA3] bg-[#FFF7D8] px-[14px] py-[10px] shadow-sm">
      <div className="flex items-start gap-[10px]">
        <p className="flex-1 font-inter text-[11px] font-semibold leading-[1.4] text-[#5F4B08]">
          ഈ വെബ്സൈറ്റിൽ ഇപ്പോൾ നൽകിയിരിക്കുന്ന വാർത്തകളെ വിശ്വസിക്കരുത്. ഇവ യാദൃച്ഛികമായ
          വാർത്താ കട്ടിംഗുകളാണ്; ശരിയായിരിക്കാം, അല്ലാതിരിക്കാം. App under development.
          Coming soon.
        </p>

        <button
          type="button"
          aria-label="Close development notice"
          onClick={() => setIsDismissed(true)}
          className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full border border-[#D8CBA3] bg-[#FFF2BF] text-[12px] font-bold leading-none text-[#5F4B08] transition-colors hover:bg-[#F8E8A8]"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DevelopmentNoticeBanner;
