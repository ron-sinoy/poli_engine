import React from 'react';
import BreakingNews from './BreakingNews';
import TopicCard from './TopicCard';
import appleLogoText from '../apple-logo-text.png';

const HomeContainer = ({ onTopicClick }) => {
    return (
        <div className="w-full h-full flex flex-col box-border px-[24px] items-start">
            <div className="mt-[75px]">
                <BreakingNews text="എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല" />
            </div>
            
            <div className="relative ml-[11px] mt-[17px]  h-[55px] w-[111px] flex-shrink-0 overflow-hidden md:block">
                <img src={appleLogoText} className="h-full w-full object-cover" alt="Logo" />
            </div>

            <div className="relative mt-6 flex h-[326px] w-full max-w-[354px] flex-col gap-[6px] overflow-hidden rounded-[34px] bg-[rgba(240,242,244,1)] py-[10px] md:mt-[2px]">
               <TopicCard time="1 min" text="സുധാകരൻ കുടുംബാംഗങ്ങളോടൊപ്പം" onClick={() => onTopicClick('topic-1')} />
               <TopicCard time="1 min" text="സ്ഥാനാർഥി നിർണയത്തിൽ അതൃപ്തിയുണ്ടോ" onClick={() => onTopicClick('topic-2')} />
               <TopicCard time="1 min" text="പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല" onClick={() => onTopicClick('topic-3')} />
            </div>

            <div className="w-[94px] h-[27px] bg-[#8290A8] rounded-[33px] flex items-center justify-center ml-[130px] mt-[7px] shadow-sm cursor-pointer hover:bg-opacity-90">
                <span className="font-sf font-semibold text-[13px] text-[#FFFFFF] tracking-[-1.77%] -mr-1">More</span>
            </div>

            <div className="w-full h-[1px] bg-[#000000] mt-[16px] opacity-20"></div>

            <div className="w-full max-w-[354px] h-[161px] bg-gray-200 mt-[20px] rounded-[12px] flex items-center justify-center">
                <span className="text-gray-500 font-inter">Spotlight (UI Pending)</span>
            </div>
        </div>
    );
};

export default HomeContainer;
