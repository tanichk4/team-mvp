import { useState } from 'react';

function initialsFor(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function Avatar({
  src,
  alt = '',
  name,
  className = '',
  loading = 'lazy',
  draggable = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || name || 'avatar'}
        className={`bg-tinder-gradient flex items-center justify-center text-white font-semibold ${className}`}
      >
        {initialsFor(name || alt)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name || ''}
      loading={loading}
      draggable={draggable}
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
