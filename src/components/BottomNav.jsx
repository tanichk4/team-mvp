import { Link, useLocation } from 'react-router-dom';
import { Flame, Star, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/cn';

const tabs = [
  { to: '/', Icon: Flame, label: 'Discover', match: (p) => p === '/' },
  { to: '/likes', Icon: Star, label: 'Likes', match: (p) => p.startsWith('/likes') },
  { to: '/messages', Icon: MessageCircle, label: 'Messages', match: (p) => p.startsWith('/messages') },
  { to: '/profile', Icon: User, label: 'Profile', match: (p) => p.startsWith('/profile') },
];

function GradientIcon({ Icon, size = 26, active }) {
  const id = `nav-grad-${Icon.displayName || size}-${Math.random().toString(36).slice(2, 7)}`;
  if (!active) {
    return (
      <Icon
        size={size}
        strokeWidth={1.5}
        style={{ color: 'var(--color-text-tertiary)' }}
      />
    );
  }
  return (
    <span className="relative inline-flex">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-primary)" />
            <stop offset="100%" stopColor="var(--color-brand-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <Icon
        size={size}
        strokeWidth={1.5}
        style={{ stroke: `url(#${id})`, fill: `url(#${id})` }}
      />
    </span>
  );
}

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around pb-[env(safe-area-inset-bottom)] surface-nav"
      style={{
        height: 'var(--nav-height-bottom)',
        borderTop: '1px solid var(--color-border-light)',
        boxShadow: 'var(--shadow-nav)',
      }}
    >
      {tabs.map(({ to, Icon, label, match }) => {
        const isActive = match(pathname);
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            aria-label={label}
          >
            <GradientIcon Icon={Icon} size={26} active={isActive} />
            <span
              className={cn(
                'font-semibold',
                isActive ? 'text-brand-gradient' : ''
              )}
              style={{
                fontSize: '10px',
                color: isActive ? undefined : 'var(--color-text-tertiary)',
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
