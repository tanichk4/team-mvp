import { Lock } from 'lucide-react';

export default function ProfileGridCard({ profile, blurred = false }) {
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden"
      style={{
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--color-bg-tertiary)',
      }}
    >
      <img
        src={profile.photos[0]}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={blurred ? { filter: 'blur(8px)', transform: 'scale(1.1)' } : undefined}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'var(--gradient-card-overlay)' }}
      />
      {blurred && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--gradient-gold)',
              boxShadow: 'var(--shadow-action-btn)',
            }}
          >
            <Lock size={20} className="text-white" />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-bold truncate"
            style={{ fontSize: 'var(--font-size-base)' }}
          >
            {profile.name}
          </span>
          <span
            className="font-regular"
            style={{ fontSize: 'var(--font-size-base)' }}
          >
            {profile.age}
          </span>
        </div>
      </div>
    </div>
  );
}
