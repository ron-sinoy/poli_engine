import React from 'react';
import siteLogo from '../title_logo.jpg';

const SiteLogo = ({ className = '', alt = 'edge logo', variant = 'default' }) => {
  const imageClassName =
    variant === 'home'
      ? 'block h-full w-full object-contain object-left'
      : 'block h-full w-full object-contain';

  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      <img
        src={siteLogo}
        alt={alt}
        className={imageClassName}
      />
    </div>
  );
};

export default SiteLogo;
