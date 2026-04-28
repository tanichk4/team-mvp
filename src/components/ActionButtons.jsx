import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react';
import { cn } from '../lib/cn';

function ActionButton({ onClick, size = 'md', color, children, ariaLabel }) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'rounded-full bg-white flex items-center justify-center shrink-0 transition-transform active:scale-90 hover:scale-105',
        sizes[size]
      )}
      style={{ boxShadow: 'var(--shadow-fab)', color }}
    >
      {children}
    </button>
  );
}

export default function ActionButtons({ onRewind, onNope, onSuperLike, onLike, onBoost }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <ActionButton onClick={onRewind} size="sm" color="#F5B800" ariaLabel="Rewind">
        <RotateCcw size={22} strokeWidth={3} />
      </ActionButton>
      <ActionButton onClick={onNope} size="md" color="#FF3B6F" ariaLabel="Nope">
        <X size={32} strokeWidth={3} />
      </ActionButton>
      <ActionButton onClick={onSuperLike} size="sm" color="#1EC9F0" ariaLabel="Super Like">
        <Star size={22} strokeWidth={3} fill="#1EC9F0" />
      </ActionButton>
      <ActionButton onClick={onLike} size="md" color="#1ED760" ariaLabel="Like">
        <Heart size={30} strokeWidth={3} fill="#1ED760" />
      </ActionButton>
      <ActionButton onClick={onBoost} size="sm" color="#9333EA" ariaLabel="Boost">
        <Zap size={22} strokeWidth={3} fill="#9333EA" />
      </ActionButton>
    </div>
  );
}
