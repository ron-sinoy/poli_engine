import React, { useEffect, useState } from 'react';
import DevelopmentNoticeBanner from './DevelopmentNoticeBanner';
import TimelineCard from './TimelineCard';
import PersonsInvolvedSection from './PersonsInvolvedSection';
import politician001 from '../politician001.png';
import manilaColoredLogo from '../../Manila-colored.svg';

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

const collectPersonsInvolved = (timelineEntries = []) => {
    const people = [];
    const seenPeople = new Set();

    timelineEntries.forEach((entry) => {
        (entry.persons_involved ?? []).forEach((person) => {
            const name = person?.name?.trim() || '';
            const photoUrl = person?.photo_url?.trim() || '';

            if (!name && !photoUrl) {
                return;
            }

            const key = `${name.toLowerCase()}::${photoUrl}`;

            if (seenPeople.has(key)) {
                return;
            }

            seenPeople.add(key);

            people.push({
                key,
                name,
                imageSrc: photoUrl || politician001,
                accentColor: person?.alliance?.color || AVATAR_FALLBACKS[people.length % AVATAR_FALLBACKS.length],
            });
        });
    });

    return people;
};

const ThreadsContainer = ({ thread, isLoading = false, error = '', onBack }) => {
    const [isPeopleSectionExpanded, setIsPeopleSectionExpanded] = useState(true);

    useEffect(() => {
        setIsPeopleSectionExpanded(true);
    }, [thread?.thread_id]);

    const timelineEntries = isLoading || !thread
        ? []
        : [...(thread.timeline_entries ?? [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

    const events = isLoading || !thread
        ? []
        : timelineEntries.map(toTimelineEvent);
    const personsInvolved = isLoading || !thread ? [] : collectPersonsInvolved(timelineEntries);

    return (
        <div className="w-full flex items-center justify-center box-border pb-[70px]">
            {/* The primary frame container for the Threads view */}
            <div className="w-full relative overflow-visible box-border">
                {/* Content Wrapper */}
                <div className="flex flex-col pt-[20px] md:pt-[72px]">
                    <div className="ml-[33px] mt-[20px] h-[93px] w-[78px] overflow-hidden">
                        <img src={manilaColoredLogo} className="h-full w-full object-contain" alt="Manila" />
                    </div>
                    {/* Back Button for Navigation (Hidden inside design, used as utility overlay) */}
                    <button onClick={onBack} className="text-blue-500 font-bold text-xs hover:opacity-80 cursor-pointer self-start ml-[28px] mt-[-5px]">
                        &lt; Home
                    </button>
                    {/* Header Title (Aligned cleanly and precisely to scale with Figma parameters) */}
                    <h1 className="ml-[28px] mt-[10px] w-[339px] font-malayalam font-bold text-[20px] text-textPrimary leading-[1.247]">
                        {isLoading ? 'Loading...' : thread?.title ?? ''}
                    </h1>

                    <div className="ml-[28px] mr-[20px] mt-[12px]">
                        <DevelopmentNoticeBanner />
                    </div>

                    <PersonsInvolvedSection
                        people={personsInvolved}
                        isExpanded={isPeopleSectionExpanded}
                        onToggle={() => setIsPeopleSectionExpanded((currentValue) => !currentValue)}
                        fallbackImageSrc={politician001}
                    />
                </div>

                {/* Dynamic Timeline Group */}
                <div className={`w-full flex flex-col relative z-10 box-border ${personsInvolved.length > 0 ? 'pt-[24px]' : 'pt-[40px]'}`}>
                    {error && (
                        <div className="ml-[28px] mr-[24px] rounded-[24px] bg-cardBg px-[20px] py-[18px] shadow-sm">
                            <p className="font-noto font-bold text-[16px] text-textPrimary">Content could not load</p>
                            <p className="mt-[8px] font-inter text-[11px] leading-[1.35] text-timeText break-words">{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && thread && events.length === 0 && (
                        <div className="ml-[28px] mr-[24px] rounded-[24px] bg-cardBg px-[20px] py-[18px] shadow-sm">
                            <p className="font-noto font-medium text-[16px] text-textPrimary">No timeline entries available</p>
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
                                        <p className="w-full font-noto font-medium text-[16px] text-textPrimary leading-[1.4] opacity-90">
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
