import { Link, useLocation } from 'react-router-dom';
import { Flame, Star, MessageCircle, User } from 'lucide-react';
import TinderLogo from './TinderLogo';
import { cn } from '../lib/cn';

const items = [
  { to: '/', label: 'Discover', Icon: Flame, match: (p) => p === '/' },
  { to: '/likes', label: 'Likes', Icon: Star, match: (p) => p.startsWith('/likes') },
  { to: '/messages', label: 'Messages', Icon: MessageCircle, match: (p) => p.startsWith('/messages') },
  { to: '/profile', label: 'Profile', Icon: User, match: (p) => p.startsWith('/profile') },
];

export default function SidebarNav() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-gray-200 bg-white px-4 py-6">
      <div className="px-3 mb-8">
        <TinderLogo size={32} />
      </div>
      <nav className="flex flex-col gap-1">
        {items.map(({ to, label, Icon, match }) => {
          const isActive = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors',
                isActive ? 'bg-tinder-gradient text-white' : 'text-tinder-text hover:bg-gray-100'
              )}
            >
              <Icon
                size={22}
                strokeWidth={2.4}
                className={isActive ? 'text-white' : 'text-tinder-pink'}
              />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 text-xs text-tinder-muted">© tinder clone</div>
    </aside>
  );
}
