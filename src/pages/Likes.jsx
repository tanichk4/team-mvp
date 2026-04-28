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
    <div className="w-full max-w-3xl mx-auto px-3 pt-4 pb-6 md:pt-8">
      <h1
        className="font-extrabold mb-4 px-1"
        style={{
          fontSize: 'var(--font-size-xl)',
          letterSpacing: 'var(--letter-spacing-tight)',
        }}
      >
        Likes
      </h1>

      <div
        className="flex gap-2 mb-4"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn('relative px-4 py-3 font-semibold transition-colors')}
            style={{
              fontSize: 'var(--font-size-base)',
              color: tab === t.key ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            }}
          >
            {t.label}
            {tab === t.key && (
              <span
                className="absolute left-2 right-2 -bottom-px h-0.5 rounded-full"
                style={{ background: 'var(--gradient-brand)' }}
              />
            )}
            {t.key === 'likes' && (
              <span
                className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-white font-bold"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--gradient-brand)',
                  fontSize: 'var(--font-size-xs)',
                }}
              >
                {likesYou.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'likes' ? (
        <>
          <div
            className="relative overflow-hidden p-5 mb-5 flex items-center gap-4"
            style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-gold)',
              backgroundSize: '200% auto',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Crown size={24} className="text-white" fill="white" />
            </div>
            <div className="flex-1 text-white">
              <p className="font-bold" style={{ fontSize: 'var(--font-size-base)' }}>
                See who likes you
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.92)' }}>
                Match with them instantly with Gold
              </p>
            </div>
            <button
              className="font-bold"
              style={{
                background: 'white',
                color: 'var(--color-gold-dark)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 'var(--font-size-sm)',
                boxShadow: 'var(--shadow-action-btn)',
                letterSpacing: 'var(--letter-spacing-wide)',
              }}
            >
              Get Gold
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2" style={{ padding: '0 4px' }}>
            {likesYou.map((p) => (
              <ProfileGridCard key={p.id} profile={p} blurred />
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className="p-5 mb-5 flex items-center gap-4 text-white"
            style={{
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--color-boost), var(--color-brand-primary))',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Sparkles size={22} className="text-white" fill="white" />
            </div>
            <div className="flex-1">
              <p className="font-bold" style={{ fontSize: 'var(--font-size-base)' }}>
                Today's Top Picks
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.92)' }}>
                Refreshes daily at 9pm
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2" style={{ padding: '0 4px' }}>
            {topPicks.map((p) => (
              <ProfileGridCard key={p.id} profile={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
