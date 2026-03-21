import React from 'react';

const TimelineCard = ({ text, authorName, authorColor, imageSrc }) => {
    return (
        <div className="w-full min-h-[123px] pb-[25px] rounded-[34px] bg-cardBg border border-[#E2E8F0] box-border flex items-start pt-[25px] pl-[18px] pr-[18px] shadow-sm relative">
            
            {/* Avatar block with exact solid background mapped, image floating inside naturally */}
            <div
                className="w-[64px] h-[64px] rounded-full overflow-hidden flex items-end justify-center shrink-0"
                style={{
                    backgroundColor: authorColor,
                    border: `3px solid ${authorColor}`,
                }}
            >
                <img src={imageSrc} className="w-[58px] h-[58px] object-cover object-top" alt="avatar" /> 
            </div>
            
            {/* Text block with Quote and Author mapped gracefully via Flex column */}
            <div className="ml-[15px] pt-[0px] flex flex-col w-full pr-[10px]">
                <p className="font-malayalam font-medium text-[14px] text-textPrimary leading-[1.247] w-full">
                    {text}
                </p>
                {authorName && (
                    <p className="mt-[6px] font-malayalam font-normal text-[10px] text-textPrimary opacity-80 leading-[1.247] tracking-tight">
                        {authorName}
                    </p>
                )}
            </div>
        </div>
    )
};

export default TimelineCard;
