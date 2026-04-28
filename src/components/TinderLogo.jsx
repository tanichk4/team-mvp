import { Flame } from 'lucide-react';

export default function TinderLogo({ size = 28, withWordmark = true }) {
  const gradId = `tinderLogoGrad-${size}`;
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FD267A" />
            <stop offset="100%" stopColor="#FF6036" />
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
          className="text-tinder-gradient font-bold tracking-tight italic"
          style={{ fontSize: size * 1.05, lineHeight: 1 }}
        >
          tinder
        </span>
      )}
    </span>
  );
}
