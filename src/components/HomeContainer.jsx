import React, { useState } from 'react';
import BreakingNews from './BreakingNews';
import DevelopmentNoticeBanner from './DevelopmentNoticeBanner';
import LoadingSplash from './LoadingSplash';
import SiteLogo from './SiteLogo';
import TopicCard from './TopicCard';
import TrendingPoliticians from './TrendingPoliticians';

const COLLAPSED_THREAD_COUNT = 3;

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

const HomeContainer = ({
  threads = [],
  isLoading = false,
  error = '',
  breakingNews = [],
  breakingNewsLoading = false,
  breakingNewsError = '',
  onTopicClick,
}) => {
  const [showAllThreads, setShowAllThreads] = useState(false);

  if (isLoading) {
    return <LoadingSplash />;
  }

  const visibleThreads = isLoading ? [] : threads.filter((thread) => thread?.updated_at);
  const displayedThreads = showAllThreads
    ? visibleThreads
    : visibleThreads.slice(0, COLLAPSED_THREAD_COUNT);
  const hasMoreThreads = visibleThreads.length > COLLAPSED_THREAD_COUNT;

  return (
    <div className="flex min-h-full w-full flex-col items-start bg-cardBg px-[24px] box-border">
      <div className="mt-[10px] md:mt-[75px]">
        <BreakingNews
          news={breakingNews}
          isLoading={breakingNewsLoading}
          error={breakingNewsError}
        />
      </div>

      <div className="mt-[10px]">
        <DevelopmentNoticeBanner />
      </div>

      <SiteLogo
        className="mt-[34px] h-[69px] w-[122px] flex-shrink-0 md:block"
        alt="edge logo"
        variant="home"
      />

      <div className="w-full h-[1px] bg-[#000000] mt-[16px] opacity-20"></div>

      <TrendingPoliticians />

      <div className="w-full h-[1px] bg-[#000000] mt-[16px] opacity-20"></div>

      <div className="relative mt-[49px] flex min-h-[326px] w-full max-w-[354px] flex-col overflow-hidden border-b border-[#D6DCE6] bg-cardBg md:mt-[27px]">
        {!isLoading && error && (
          <div className="flex min-h-[105px] w-full flex-col justify-center gap-[8px] px-[20px] py-[18px]">
            <span className="font-anek font-semibold text-[16px] text-titleMalayalam">Content could not load</span>
            <span className="font-inter text-[11px] leading-[1.35] text-timeText break-words">{error}</span>
          </div>
        )}
        {!isLoading && !error && visibleThreads.length === 0 && (
          <div className="flex h-[105px] w-full items-center px-[20px]">
            <span className="font-anek font-semibold text-[16px] text-titleMalayalam">No threads available</span>
          </div>
        )}
        {!isLoading && !error && visibleThreads.length > 0 && (
          <div className="flex flex-col divide-y divide-[#D6DCE6]">
            {displayedThreads.map((thread) => (
              <TopicCard
                key={thread.thread_id}
                to={`/threads/${encodeURIComponent(thread.thread_id)}`}
                time={formatUpdatedAt(thread.updated_at)}
                text={thread.title}
                onClick={onTopicClick ? () => onTopicClick(thread.thread_id) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {!isLoading && !error && hasMoreThreads && (
        <button
          type="button"
          onClick={() => setShowAllThreads((currentValue) => !currentValue)}
          aria-expanded={showAllThreads}
          className="mx-auto mt-[20px] flex h-[27px] w-[94px] cursor-pointer items-center justify-center rounded-[33px] bg-[#0066cc] shadow-sm hover:bg-opacity-90"
        >
          <span className="font-anek text-[16px] font-semibold tracking-[-1.77%] text-[#FFFFFF]">
            {showAllThreads ? 'Less' : 'Show more'}
          </span>
        </button>
      )}

    </div>
  );
};

export default HomeContainer;
