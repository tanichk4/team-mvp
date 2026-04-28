import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

export default function CardStack({ deck, onSwipe }) {
  const visible = deck.slice(0, 3);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {visible
          .slice()
          .reverse()
          .map((profile, revIdx) => {
            const stackIndex = visible.length - 1 - revIdx;
            const isTop = stackIndex === 0;
            return (
              <SwipeCard
                key={profile.id}
                profile={profile}
                onSwipe={onSwipe}
                isTop={isTop}
                stackIndex={stackIndex}
              />
            );
          })}
      </AnimatePresence>

      {deck.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-tinder-muted text-center px-6">
          <p>You're all caught up.<br />Check back later for new people.</p>
        </div>
      )}
    </div>
  );
}
