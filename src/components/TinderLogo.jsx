import { Flame } from 'lucide-react';

export default function TinderLogo({ size = 28, withWordmark = true }) {
  const gradId = `tinderLogoGrad-${size}`;
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-primary)" />
            <stop offset="100%" stopColor="var(--color-brand-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <Flame
        size={size}
        strokeWidth={1.5}
        style={{ stroke: `url(#${gradId})`, fill: `url(#${gradId})` }}
      />
      {withWordmark && (
        <span
          className="text-brand-gradient font-extrabold tracking-tight"
          style={{ fontSize: size * 1.05, lineHeight: 1, letterSpacing: 'var(--letter-spacing-tight)' }}
        >
          tinder
        </span>
      )}
    </span>
  );
}
