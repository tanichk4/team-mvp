import { Link, useLocation } from 'react-router-dom';
import { Flame, Star, MessageCircle, User, Settings } from 'lucide-react';
import TinderLogo from './TinderLogo';
import { cn } from '../lib/cn';

const items = [
  { to: '/', label: 'Discover', Icon: Flame, match: (p) => p === '/' },
  { to: '/likes', label: 'Likes', Icon: Star, match: (p) => p.startsWith('/likes') },
  { to: '/messages', label: 'Messages', Icon: MessageCircle, match: (p) => p.startsWith('/messages') },
  { to: '/profile', label: 'Profile', Icon: User, match: (p) => p.startsWith('/profile') },
];

function NavIcon({ Icon, active, size = 26 }) {
  const id = `sidebar-grad-${Icon.displayName || size}-${Math.random().toString(36).slice(2, 7)}`;
  if (!active) {
    return (
      <Icon size={size} strokeWidth={1.5} style={{ color: 'var(--color-text-secondary)' }} />
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
      <Icon size={size} strokeWidth={1.5} style={{ stroke: `url(#${id})`, fill: `url(#${id})` }} />
    </span>
  );
}

export default function SidebarNav() {
  const { pathname } = useLocation();
  return (
    <aside
      className="hidden md:flex shrink-0 flex-col items-stretch py-5 group transition-[width] duration-300 ease-out"
      style={{
        width: 'var(--sidebar-width)',
        borderRight: '1px solid var(--color-border-light)',
        backgroundColor: 'var(--color-surface-card)',
      }}
    >
      <div className="flex items-center justify-center mb-8 px-3">
        <TinderLogo size={32} withWordmark={false} />
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {items.map(({ to, label, Icon, match }) => {
          const isActive = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={cn(
                'flex items-center justify-center gap-3 rounded-xl px-3 py-3 transition-colors',
                isActive ? 'bg-bg-secondary' : 'hover:bg-bg-secondary'
              )}
            >
              <NavIcon Icon={Icon} active={isActive} size={26} />
              <span
                className={cn(
                  'hidden font-semibold',
                  isActive ? 'text-brand-gradient' : ''
                )}
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: isActive ? undefined : 'var(--color-text-primary)',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 flex items-center justify-center">
        <Settings size={22} strokeWidth={1.5} style={{ color: 'var(--color-text-tertiary)' }} />
      </div>
    </aside>
  );
}
