import { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { MapPin, BadgeCheck } from 'lucide-react';

export default function SwipeCard({ profile, onSwipe, isTop, stackIndex = 0 }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -20], [1, 0]);

  const handleDragEnd = async (_e, info) => {
    const swipeFar = Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500;
    if (!swipeFar) {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } });
      return;
    }
    const dir = info.offset.x > 0 ? 1 : -1;
    await controls.start({
      x: dir * 600,
      rotate: dir * 25,
      transition: { duration: 0.35, ease: 'easeOut' },
    });
    onSwipe?.(dir > 0 ? 'right' : 'left', profile);
  };

  const tapPhoto = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    setPhotoIdx((idx) => {
      if (isLeft) return Math.max(0, idx - 1);
      return Math.min(profile.photos.length - 1, idx + 1);
    });
  };

  const offsetY = stackIndex * 8;
  const scale = 1 - stackIndex * 0.04;

  return (
    <motion.div
      drag={isTop ? 'x' : false}
      dragElastic={0.7}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate }}
      initial={{ scale, y: offsetY }}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
      className="absolute inset-0 select-none animate-card-in"
    >
      <div
        className="relative w-full h-full overflow-hidden bg-surface-card"
        style={{
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-card)',
        }}
        onClick={isTop ? tapPhoto : undefined}
      >
        <img
          src={profile.photos[photoIdx]}
          alt={profile.name}
          loading={isTop ? 'eager' : 'lazy'}
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden';
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none bg-gradient-to-br from-tinder-pink to-tinder-orange"
          draggable={false}
        />

        {profile.photos.length > 1 && (
          <div className="absolute top-2 left-2 right-2 flex gap-1">
            {profile.photos.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i === photoIdx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--gradient-card-overlay)' }}
        />

        {isTop && (
          <>
            <motion.div
              style={{
                opacity: likeOpacity,
                color: 'var(--color-like)',
                borderColor: 'var(--color-like)',
              }}
              className="absolute top-8 left-6 px-3 py-1.5 border-[3px] rounded-md text-3xl font-extrabold tracking-widest -rotate-12 pointer-events-none"
            >
              LIKE
            </motion.div>
            <motion.div
              style={{
                opacity: nopeOpacity,
                color: 'var(--color-nope)',
                borderColor: 'var(--color-nope)',
              }}
              className="absolute top-8 right-6 px-3 py-1.5 border-[3px] rounded-md text-3xl font-extrabold tracking-widest rotate-12 pointer-events-none"
            >
              NOPE
            </motion.div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
          <div className="flex items-baseline gap-2">
            <h2
              className="font-extrabold"
              style={{
                fontSize: 'var(--font-size-2xl)',
                letterSpacing: 'var(--letter-spacing-tight)',
              }}
            >
              {profile.name}
            </h2>
            <span className="font-regular" style={{ fontSize: 'var(--font-size-xl)' }}>
              {profile.age}
            </span>
            {profile.verified !== false && (
              <BadgeCheck size={18} style={{ color: 'var(--color-superlike)' }} fill="white" />
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="frosted-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white"
              style={{ fontSize: 'var(--font-size-sm)' }}
            >
              <MapPin size={12} />
              {profile.distance}
            </span>
          </div>
          <p
            className="mt-2 line-clamp-2 leading-snug"
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {profile.bio}
          </p>
          {profile.interests?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.interests.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="frosted-pill px-2.5 py-1 rounded-full text-white font-medium"
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
