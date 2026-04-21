import React from 'react';
import TimelineCard from './TimelineCard';
import politician001 from '../politician001.png';

const AVATAR_FALLBACKS = ['#F48789', '#94BEF2'];

const toTimelineEvent = (entry, index) => {
    if (entry.entry_type === 'quote') {
        const speaker = entry.speaker ?? {};
        const authorColor = speaker.alliance?.color || AVATAR_FALLBACKS[index % AVATAR_FALLBACKS.length];

        return {
            type: 'card',
            text: entry.quote_text ? `“${entry.quote_text}”` : '',
            authorName: speaker.name || '',
            authorColor,
            imageSrc: speaker.photo_url || politician001,
        };
    }

    return {
        type: 'text',
        text: entry.body || '',
    };
};

const ThreadsContainer = ({ thread, isLoading = false, error = '', onBack }) => {
    const events = isLoading || !thread
        ? []
        : [...(thread.timeline_entries ?? [])]
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            .map(toTimelineEvent);

    return (
        <div className="w-full flex items-center justify-center box-border pb-[70px]">
            {/* The primary frame container for the Threads view */}
            <div className="w-full relative overflow-visible box-border">
                {/* Content Wrapper */}
                <div className="flex flex-col pt-[20px] md:pt-[72px]">
                    {/* Apple Logo replacing generic image to match user 1.png precisely! */}
                    <div className="ml-[23px] w-[26px] h-[31px]">
                        <svg viewBox="0 0 384 512" fill="black" className="w-full h-full">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                        </svg>
                    </div>
                    {/* Back Button for Navigation (Hidden inside design, used as utility overlay) */}
                    <button onClick={onBack} className="text-blue-500 font-bold text-xs hover:opacity-80 cursor-pointer self-start ml-[28px] mt-[25px]">
                        &lt; Home
                    </button>
                    {/* Header Title (Aligned cleanly and precisely to scale with Figma parameters) */}
                    <h1 className="ml-[28px] mt-[10px] w-[339px] font-malayalam font-bold text-[20px] text-textPrimary leading-[1.247]">
                        {isLoading ? 'Loading...' : thread?.title ?? ''}
                    </h1>
                </div>

                {/* Dynamic Timeline Group */}
                <div className="w-full pt-[40px] flex flex-col relative z-10 box-border">
                    {error && (
                        <div className="ml-[28px] mr-[24px] rounded-[24px] bg-cardBg px-[20px] py-[18px] shadow-sm">
                            <p className="font-noto font-bold text-[15px] text-textPrimary">Content could not load</p>
                            <p className="mt-[8px] font-inter text-[11px] leading-[1.35] text-timeText break-words">{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && thread && events.length === 0 && (
                        <div className="ml-[28px] mr-[24px] rounded-[24px] bg-cardBg px-[20px] py-[18px] shadow-sm">
                            <p className="font-noto font-medium text-[15px] text-textPrimary">No timeline entries available</p>
                        </div>
                    )}

                    {/* The overarching continuous timeline line bounded smoothly by array heights */}
                    {events.length > 0 && (
                        <div className="absolute left-[28.5px] top-[20px] bottom-[50px] w-[1px] bg-timelineStroke opacity-60 pointer-events-none -translate-x-1/2"></div>
                    )}

                    {events.map((ev, index) => {
                        return (
                            <div key={index} className="relative w-full mb-[32px]">
                                {/* Timeline Dot positioned exactly at left: 23px with half width mapping to center 28.5px */}
                                <div className={`absolute w-[11px] h-[11px] rounded-full bg-timelineStroke left-[23.5px] z-20 shadow-sm ${ev.type === 'card' ? 'top-[56px]' : 'top-[5px]'}`}></div>
                                
                                {ev.type === 'card' ? (
                                    <div className="ml-[43px] mr-[24px]">
                                        <TimelineCard 
                                            text={ev.text}
                                            authorName={ev.authorName} 
                                            authorColor={ev.authorColor} 
                                            imageSrc={ev.imageSrc} 
                                            fallbackImageSrc={politician001}
                                        />
                                    </div>
                                ) : (
                                    <div className="ml-[46px] mr-[24px]">
                                        <p className="w-full font-noto font-medium text-[15px] text-textPrimary leading-[1.4] opacity-90">
                                            {ev.text}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                {/* Fixed Bottom Nav Simulation */}
            </div>
        </div>
    );
};

export default ThreadsContainer;
