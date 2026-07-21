import React, { useEffect, useState } from 'react';
import { getTrendingPoliticians } from '../api/politicians';
import politicianPlaceholder from '../assets/politicianPlaceholder';

const ROTATE_MS = 3000;
const FALLBACK_ACCENT = '#8290A8';

// A TopicCard is min-h-[92px]. The section is 1.5x that; the portrait is
// 0.9 of the section height.
const THREAD_BLOCK_PX = 92;
const SECTION_PX = Math.round(THREAD_BLOCK_PX * 1.5); // 138
const PORTRAIT_PX = Math.round(SECTION_PX * 0.9); // 124

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TrendingPoliticians = () => {
  const [politicians, setPoliticians] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isActive = true;

    getTrendingPoliticians()
      .then((results) => {
        if (isActive) {
          setPoliticians(results);
        }
      })
      .catch(() => {
        if (isActive) {
          setPoliticians([]);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (politicians.length < 2 || prefersReducedMotion()) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % politicians.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [politicians.length]);

  // Nothing to show, show nothing.
  if (politicians.length === 0) {
    return null;
  }

  const politician = politicians[activeIndex] ?? politicians[0];
  const accentColor = politician.alliance_color || FALLBACK_ACCENT;

  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallbackApplied === 'true') {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = politicianPlaceholder;
  };

  return (
    <div className="w-full max-w-[354px] mt-[8px]">
      <h2 className="font-anek text-[16px] font-semibold text-textPrimary">Politician in Spotlight</h2>

      <div
        className="mt-[12px] flex w-full items-center gap-[16px] overflow-hidden rounded-[12px] bg-cardBg px-[16px]"
        style={{ height: `${SECTION_PX}px` }}
      >
        <div
          key={politician.person_id}
          className="flex shrink-0 items-end justify-center overflow-hidden rounded-full transition-opacity duration-500"
          style={{
            height: `${PORTRAIT_PX}px`,
            width: `${PORTRAIT_PX}px`,
            backgroundColor: accentColor,
            border: `3px solid ${accentColor}`,
          }}
        >
          <img
            src={politician.photo_url || politicianPlaceholder}
            onError={handleImageError}
            alt={politician.name || 'Politician'}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <p className="truncate font-anek text-[16px] font-semibold text-titleMalayalam">
            {politician.name}
          </p>

          <div className="flex items-center gap-[8px]">
            {politician.alliance && (
              <span
                className="inline-flex rounded-[8px] px-[10px] py-[3px] font-inter text-[11px] font-semibold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {politician.alliance}
              </span>
            )}
            {politician.party && (
              <span className="truncate font-inter text-[11px] font-medium text-timeText">
                {politician.party}
              </span>
            )}
          </div>

          <p className="font-inter text-[11px] font-medium text-timeText">
            Trending <span className="font-semibold text-textPrimary">{politician.score}</span>
          </p>
        </div>

        {politicians.length > 1 && (
          <div className="flex shrink-0 flex-col gap-[6px] self-center">
            {politicians.map((item, index) => (
              <button
                key={item.person_id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.name}`}
                aria-current={index === activeIndex}
                className="h-[6px] w-[6px] rounded-full transition-opacity"
                style={{
                  backgroundColor: index === activeIndex ? accentColor : '#D6DCE6',
                  opacity: index === activeIndex ? 1 : 0.7,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPoliticians;
