import React from 'react';

const TimelineCard = ({ text, authorName, authorColor, imageSrc, fallbackImageSrc }) => {
    const handleImageError = (event) => {
        if (!fallbackImageSrc || event.currentTarget.dataset.fallbackApplied === 'true') {
            return;
        }

        event.currentTarget.dataset.fallbackApplied = 'true';
        event.currentTarget.src = fallbackImageSrc;
    };

    return (
        <div className="w-full min-h-[100px] pb-[21px] rounded-[34px] bg-cardBg border border-[#E2E8F0] box-border flex items-start pt-[21px] pl-[14px] pr-[14px] shadow-sm relative">

            {/* Avatar block with exact solid background mapped, image floating inside naturally */}
            <div
                className="w-[52px] h-[52px] rounded-full overflow-hidden flex items-end justify-center shrink-0"
                style={{
                    backgroundColor: authorColor,
                    border: `3px solid ${authorColor}`,
                }}
            >
                <img src={imageSrc} onError={handleImageError} className="w-[47px] h-[47px] object-cover object-top" alt="avatar" />
            </div>

            {/* Text block with Quote and Author mapped gracefully via Flex column */}
            <div className="ml-[13px] pt-[0px] flex flex-col w-full pr-[10px]">
                <p className="font-anek font-medium text-[16px] text-textPrimary leading-[1.247] w-full">
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
