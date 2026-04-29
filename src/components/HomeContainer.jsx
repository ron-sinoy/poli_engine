import React from 'react';
import BreakingNews from './BreakingNews';
import DevelopmentNoticeBanner from './DevelopmentNoticeBanner';
import LoadingSplash from './LoadingSplash';
import SiteLogo from './SiteLogo';
import TopicCard from './TopicCard';

const formatUpdatedAt = (updatedAt) => {
  if (!updatedAt) {
    return '';
  }

  const updatedDate = new Date(updatedAt);
  if (Number.isNaN(updatedDate.getTime())) {
    return '';
  }

  const diffMs = Date.now() - updatedDate.getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} min`;
  }
  // nothing

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hr`;
  }

  return `${Math.round(diffHours / 24)} day`;
};

const HomeContainer = ({ threads = [], isLoading = false, error = '', onTopicClick }) => {
  if (isLoading) {
    return <LoadingSplash />;
  }

  const visibleThreads = isLoading ? [] : threads.filter((thread) => thread?.updated_at);

  return (
    <div className="w-full h-full flex flex-col box-border px-[24px] items-start">
      <div className="mt-[10px] md:mt-[75px]">
        <BreakingNews text="എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല" />
      </div>

      <div className="mt-[10px]">
        <DevelopmentNoticeBanner />
      </div>

      <SiteLogo
        className="ml-[24px] mt-[17px] h-[36px] w-[101px] flex-shrink-0 md:block"
        alt="Cat logo"
        variant="home"
      />

      <div className="relative mt-6 flex min-h-[326px] w-full max-w-[354px] flex-col gap-[6px]  rounded-[34px] bg-[#f0f2f4] py-[10px] md:mt-[2px]">
        {!isLoading && error && (
          <div className="w-full max-w-[354px] min-h-[105px] bg-cardBg rounded-[34px] mx-auto px-[24px] py-[18px] box-border shrink-0 shadow-sm flex flex-col justify-center gap-[8px]">
            <span className="font-anek font-semibold text-[16px] text-titleMalayalam">Content could not load</span>
            <span className="font-inter text-[11px] leading-[1.35] text-timeText break-words">{error}</span>
          </div>
        )}
        {!isLoading && !error && visibleThreads.length === 0 && (
          <div className="w-full max-w-[354px] h-[105px] bg-cardBg rounded-[34px] mx-auto px-[33px] box-border shrink-0 shadow-sm flex items-center">
            <span className="font-anek font-semibold text-[16px] text-titleMalayalam">No threads available</span>
          </div>
        )}
        {visibleThreads.map((thread) => (
          <TopicCard
            key={thread.thread_id}
            to={`/threads/${encodeURIComponent(thread.thread_id)}`}
            time={formatUpdatedAt(thread.updated_at)}
            text={thread.title}
            onClick={onTopicClick ? () => onTopicClick(thread.thread_id) : undefined}
          />
        ))}
      </div>

      {/* <div className="w-[94px] h-[27px] bg-[#8290A8] rounded-[33px] flex items-center justify-center ml-[130px] mt-[20px] shadow-sm cursor-pointer hover:bg-opacity-90">
        <span className="font-anek font-semibold text-[16px] text-[#FFFFFF] tracking-[-1.77%] -mr-1">More</span>
      </div> */}
      {/* blah blah blah */}

      <div className="w-full h-[1px] bg-[#000000] mt-[16px] opacity-20"></div>

      <div className="hidden w-full max-w-[354px] h-[161px] bg-gray-200 mt-[20px] rounded-[12px] flex items-center justify-center">
        <span className="text-gray-500 font-anek font-semibold text-[16px]">Spotlight (UI Pending)</span>
      </div>
    </div>
  );
};

export default HomeContainer;
