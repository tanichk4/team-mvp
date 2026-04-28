import { useState } from 'react';
import profiles from '../data/profiles';
import CardStack from '../components/CardStack';
import ActionButtons from '../components/ActionButtons';
import MatchOverlay from '../components/MatchOverlay';
import TinderLogo from '../components/TinderLogo';
import { useApp } from '../context/AppContext';

const MATCH_PROBABILITY = 0.7;

export default function Home() {
  const [deck, setDeck] = useState(profiles);
  const [history, setHistory] = useState([]);
  const [matchProfile, setMatchProfile] = useState(null);
  const { addMatch, me } = useApp();

  const top = deck[0];

  const handleSwipe = (direction, profile) => {
    setHistory((h) => [...h, profile]);
    setDeck((d) => d.slice(1));
    if (direction === 'right' && Math.random() < MATCH_PROBABILITY) {
      addMatch(profile);
      setMatchProfile(profile);
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
        <div className="w-full max-w-md flex items-center justify-between mb-3 md:hidden">
          <TinderLogo size={28} />
          <div />
        </div>

        <div className="relative flex-1 w-full max-w-md min-h-0" style={{ aspectRatio: '3 / 4' }}>
          <CardStack deck={deck} onSwipe={handleSwipe} />
        </div>

        <div className="mt-4 md:mt-6 shrink-0">
          <ActionButtons
            onRewind={rewind}
            onNope={() => triggerSwipe('left')}
            onSuperLike={() => triggerSwipe('right')}
            onLike={() => triggerSwipe('right')}
            onBoost={() => {}}
          />
        </div>
      </section>

      <MatchOverlay
        key={matchProfile?.id ?? 'closed'}
        profile={matchProfile}
        me={me.photo}
        open={!!matchProfile}
        onClose={() => setMatchProfile(null)}
      />
    </div>
  );
}
