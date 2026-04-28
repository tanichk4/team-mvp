import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react';

function ActionButton({ onClick, size, color, children, ariaLabel }) {
  const px = size === 'lg' ? 56 : 44;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-full bg-surface-card flex items-center justify-center shrink-0 transition-transform active:scale-95 hover:scale-110"
      style={{
        width: px,
        height: px,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: color,
        color,
        boxShadow: 'var(--shadow-action-btn)',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDuration: '300ms',
      }}
    >
      {children}
    </button>
  );
}

export default function ActionButtons({ onRewind, onNope, onSuperLike, onLike, onBoost }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <ActionButton onClick={onRewind} size="sm" color="var(--color-rewind)" ariaLabel="Rewind">
        <RotateCcw size={20} strokeWidth={2.5} />
      </ActionButton>
      <ActionButton onClick={onNope} size="lg" color="var(--color-nope)" ariaLabel="Nope">
        <X size={28} strokeWidth={2.5} />
      </ActionButton>
      <ActionButton onClick={onSuperLike} size="sm" color="var(--color-superlike)" ariaLabel="Super Like">
        <Star size={20} strokeWidth={2.5} />
      </ActionButton>
      <ActionButton onClick={onLike} size="lg" color="var(--color-like)" ariaLabel="Like">
        <Heart size={26} strokeWidth={2.5} />
      </ActionButton>
      <ActionButton onClick={onBoost} size="sm" color="var(--color-boost)" ariaLabel="Boost">
        <Zap size={20} strokeWidth={2.5} />
      </ActionButton>
    </div>
  );
}
