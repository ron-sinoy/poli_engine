import React from 'react';

const PersonsInvolvedSection = ({ people = [], isExpanded = true, onToggle, fallbackImageSrc }) => {
    const handleImageError = (event) => {
        if (!fallbackImageSrc || event.currentTarget.dataset.fallbackApplied === 'true') {
            return;
        }

        event.currentTarget.dataset.fallbackApplied = 'true';
        event.currentTarget.src = fallbackImageSrc;
    };

    if (people.length === 0) {
        return null;
    }

    return (
        <div className="ml-[28px] mr-[24px] mt-[20px]">
            <div className="h-[1px] w-full bg-[#000000] opacity-20"></div>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between py-[14px] text-left"
                aria-expanded={isExpanded}
                aria-label="Toggle persons involved section"
            >
                <span className="font-anek text-[16px] font-semibold text-textPrimary">
                    Persons Involved
                </span>
                <span className="font-inter text-[20px] font-semibold leading-[1] text-textPrimary">
                    {isExpanded ? '−' : '+'}
                </span>
            </button>

            {isExpanded && (
                <div className="grid grid-cols-3 gap-x-[12px] gap-y-[14px] pb-[14px]">
                    {people.map((person) => (
                        <div key={person.key} className="flex items-center justify-center">
                            <div
                                className="flex h-[72px] w-[72px] items-end justify-center overflow-hidden rounded-full"
                                style={{
                                    backgroundColor: person.accentColor,
                                    border: `3px solid ${person.accentColor}`,
                                }}
                            >
                                <img
                                    src={person.imageSrc}
                                    onError={handleImageError}
                                    className="h-[66px] w-[66px] object-cover object-top"
                                    alt={person.name || 'Person involved'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="h-[1px] w-full bg-[#000000] opacity-20"></div>
        </div>
    );
};

export default PersonsInvolvedSection;
