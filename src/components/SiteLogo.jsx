import React from 'react';
import siteLogo from '../Logo.png';

const SiteLogo = ({ className = '', alt = 'Cat logo', variant = 'default' }) => {
  const imageClassName =
    variant === 'home'
      ? 'block h-full w-full object-cover object-left'
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
