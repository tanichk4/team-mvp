import { Link, useLocation } from 'react-router-dom';
import { Flame, Star, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/cn';

const tabs = [
  { to: '/', Icon: Flame, match: (p) => p === '/' },
  { to: '/likes', Icon: Star, match: (p) => p.startsWith('/likes') },
  { to: '/messages', Icon: MessageCircle, match: (p) => p.startsWith('/messages') },
  { to: '/profile', Icon: User, match: (p) => p.startsWith('/profile') },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-white border-t border-gray-200 flex items-center justify-around pb-[env(safe-area-inset-bottom)]">
      {tabs.map(({ to, Icon, match }) => {
        const isActive = match(pathname);
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center justify-center w-14 h-14 rounded-full transition-colors',
              isActive ? 'text-tinder-pink' : 'text-gray-400'
            )}
          >
            <Icon
              size={28}
              strokeWidth={isActive ? 2.5 : 2.2}
              fill={isActive ? '#FD267A' : 'none'}
              fillOpacity={isActive ? 0.12 : 0}
            />
          </Link>
        );
      })}
    </nav>
  );
}
