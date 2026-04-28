import { useState } from 'react';
import { Crown, Sparkles } from 'lucide-react';
import profiles from '../data/profiles';
import ProfileGridCard from '../components/ProfileGridCard';
import { cn } from '../lib/cn';

const TABS = [
  { key: 'likes', label: 'Likes You' },
  { key: 'top', label: 'Top Picks' },
];

export default function Likes() {
  const [tab, setTab] = useState('likes');

  const likesYou = profiles.slice().reverse();
  const topPicks = profiles.slice(2, 8);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-4 pb-6 md:pt-8">
      <h1 className="text-2xl font-bold mb-4">Likes</h1>

      <div className="flex gap-2 border-b border-gray-200 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'relative px-4 py-3 text-[15px] font-semibold transition-colors',
              tab === t.key ? 'text-tinder-text' : 'text-tinder-muted'
            )}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-tinder-gradient rounded-full" />
            )}
            {t.key === 'likes' && (
              <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-tinder-pink text-white text-[11px] font-bold">
                {likesYou.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'likes' ? (
        <>
          {/* Gold upsell banner */}
          <div className="bg-gold-gradient rounded-2xl p-5 mb-5 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center backdrop-blur-sm">
              <Crown size={24} className="text-white" fill="white" />
            </div>
            <div className="flex-1 text-white">
              <p className="font-bold text-[15px]">See who likes you</p>
              <p className="text-[13px] text-white/90">Match with them instantly with Gold</p>
            </div>
            <button className="bg-white text-tinder-gold px-4 py-2 rounded-full font-bold text-[13px] shadow">
              Get Gold
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {likesYou.map((p) => (
              <ProfileGridCard key={p.id} profile={p} blurred />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="rounded-2xl p-5 mb-5 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center gap-4 text-white shadow-md">
            <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center backdrop-blur-sm">
              <Sparkles size={22} className="text-white" fill="white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[15px]">Today's Top Picks</p>
              <p className="text-[13px] text-white/90">Refreshes daily at 9pm</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topPicks.map((p) => (
              <ProfileGridCard key={p.id} profile={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
