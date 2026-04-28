import { Lock } from 'lucide-react';

export default function ProfileGridCard({ profile, blurred = false }) {
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden bg-gray-200"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      <img
        src={profile.photos[0]}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={blurred ? { filter: 'blur(18px)', transform: 'scale(1.1)' } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      {blurred && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <Lock size={20} className="text-white" />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold truncate">{profile.name}</span>
          <span className="text-base font-light">{profile.age}</span>
        </div>
      </div>
    </div>
  );
}
