import { useMemo, useState } from 'react';
import profiles from '../data/profiles';
import CardStack from '../components/CardStack';
import ActionButtons from '../components/ActionButtons';
import MatchOverlay from '../components/MatchOverlay';
import TinderLogo from '../components/TinderLogo';
import { useApp } from '../context/AppContext';
import { MapPin, Briefcase, GraduationCap, Bell, SlidersHorizontal } from 'lucide-react';

const ME_AVATAR = 'https://picsum.photos/200/200?random=99';

export default function Home() {
  const [deck, setDeck] = useState(profiles);
  const [history, setHistory] = useState([]);
  const [matchProfile, setMatchProfile] = useState(null);
  const { addMatch } = useApp();

  const top = deck[0];
  const matchKey = useMemo(() => Math.random(), [deck.length]);

  const handleSwipe = (direction, profile) => {
    setHistory((h) => [...h, profile]);
    setDeck((d) => d.slice(1));
    if (direction === 'right') {
      if (Math.random() < 0.7) {
        addMatch(profile);
        setMatchProfile(profile);
      }
    }
  };

  const triggerSwipe = (direction) => {
    if (!top) return;
    handleSwipe(direction, top);
  };

  const rewind = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setDeck((d) => [last, ...d]);
  };

  return (
    <div className="flex w-full h-[calc(100dvh-64px)] md:h-screen">
      <section className="flex-1 min-w-0 flex flex-col items-center px-4 pt-3 pb-4 md:pt-6 md:pb-8">
        <div
          className="w-full max-w-md flex items-center justify-between mb-3 md:hidden surface-nav rounded-2xl px-3 py-2"
          style={{ height: 'var(--nav-height-top)' }}
        >
          <TinderLogo size={26} withWordmark={false} />
          <TinderLogo size={20} withWordmark={true} />
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="p-1.5">
              <Bell size={22} strokeWidth={1.5} style={{ color: 'var(--color-text-primary)' }} />
            </button>
            <button aria-label="Filters" className="p-1.5">
              <SlidersHorizontal size={22} strokeWidth={1.5} style={{ color: 'var(--color-text-primary)' }} />
            </button>
          </div>
        </div>

        <div
          className="relative w-full max-w-md"
          style={{
            aspectRatio: '3/4',
            maxHeight: 'calc(100% - 110px)',
          }}
        >
          <CardStack deck={deck} onSwipe={handleSwipe} />
        </div>

        <div className="mt-4 md:mt-6">
          <ActionButtons
            onRewind={rewind}
            onNope={() => triggerSwipe('left')}
            onSuperLike={() => triggerSwipe('right')}
            onLike={() => triggerSwipe('right')}
            onBoost={() => {}}
          />
        </div>
      </section>

      <aside
        className="hidden lg:flex shrink-0 flex-col overflow-y-auto"
        style={{
          width: 360,
          borderLeft: '1px solid var(--color-border-light)',
          backgroundColor: 'var(--color-surface-card)',
        }}
      >
        {top ? (
          <>
            <div className="relative w-full aspect-[3/4]">
              <img src={top.photos[0]} alt={top.name} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: 'var(--gradient-card-overlay)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-baseline gap-2">
                  <h2
                    className="font-extrabold"
                    style={{
                      fontSize: 'var(--font-size-2xl)',
                      letterSpacing: 'var(--letter-spacing-tight)',
                    }}
                  >
                    {top.name}
                  </h2>
                  <span style={{ fontSize: 'var(--font-size-xl)' }}>{top.age}</span>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3
                  className="font-bold uppercase mb-1"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: 'var(--letter-spacing-wider)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  About
                </h3>
                <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)' }}>
                  {top.bio}
                </p>
              </div>
              <div className="space-y-2" style={{ fontSize: 'var(--font-size-sm)' }}>
                <div className="flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <Briefcase size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                  {top.job}
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <GraduationCap size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                  {top.school}
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <MapPin size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                  {top.distance}
                </div>
              </div>
              <div>
                <h3
                  className="font-bold uppercase mb-2"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: 'var(--letter-spacing-wider)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {top.interests?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 font-medium"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid var(--color-border-medium)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3
                  className="font-bold uppercase mb-2"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: 'var(--letter-spacing-wider)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  Photos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {top.photos.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      alt=""
                      className="w-full aspect-square object-cover"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className="flex-1 flex items-center justify-center"
            style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}
          >
            No more cards
          </div>
        )}
      </aside>

      <MatchOverlay
        key={matchKey}
        profile={matchProfile}
        me={ME_AVATAR}
        open={!!matchProfile}
        onClose={() => setMatchProfile(null)}
      />
    </div>
  );
}
