import { useMemo, useState } from 'react';
import profiles from '../data/profiles';
import CardStack from '../components/CardStack';
import ActionButtons from '../components/ActionButtons';
import MatchOverlay from '../components/MatchOverlay';
import TinderLogo from '../components/TinderLogo';
import { useApp } from '../context/AppContext';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';

const ME_AVATAR = 'https://picsum.photos/200/200?random=99';

export default function Home() {
  const [deck, setDeck] = useState(profiles);
  const [history, setHistory] = useState([]);
  const [matchProfile, setMatchProfile] = useState(null);
  const { addMatch } = useApp();

  const top = deck[0];
  const matchKey = useMemo(() => Math.random(), [deck.length]); // re-roll per card

  const handleSwipe = (direction, profile) => {
    setHistory((h) => [...h, profile]);
    setDeck((d) => d.slice(1));
    if (direction === 'right') {
      // 70% chance of match for demo
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
      {/* Center column: deck */}
      <section className="flex-1 min-w-0 flex flex-col items-center px-4 pt-3 pb-4 md:pt-6 md:pb-8">
        <div className="w-full max-w-md flex items-center justify-between mb-3 md:hidden">
          <TinderLogo size={28} />
          <div />
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

      {/* Right panel: top card preview (desktop only) */}
      <aside className="hidden lg:flex w-[360px] xl:w-[400px] shrink-0 border-l border-gray-200 bg-white flex-col overflow-y-auto">
        {top ? (
          <>
            <div className="relative w-full aspect-[3/4]">
              <img src={top.photos[0]} alt={top.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-bold">{top.name}</h2>
                  <span className="text-2xl font-light">{top.age}</span>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-tinder-muted mb-1">About</h3>
                <p className="text-[15px] leading-relaxed">{top.bio}</p>
              </div>
              <div className="space-y-2 text-[14px]">
                <div className="flex items-center gap-2 text-tinder-text">
                  <Briefcase size={16} className="text-tinder-muted" />
                  {top.job}
                </div>
                <div className="flex items-center gap-2 text-tinder-text">
                  <GraduationCap size={16} className="text-tinder-muted" />
                  {top.school}
                </div>
                <div className="flex items-center gap-2 text-tinder-text">
                  <MapPin size={16} className="text-tinder-muted" />
                  {top.distance}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-tinder-muted mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {top.interests?.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-gray-300 text-[13px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-tinder-muted mb-2">Photos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {top.photos.map((p, i) => (
                    <img key={i} src={p} alt="" className="w-full aspect-square object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-tinder-muted text-sm">
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
