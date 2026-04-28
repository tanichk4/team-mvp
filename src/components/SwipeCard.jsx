import { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { MapPin } from 'lucide-react';

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
      className="absolute inset-0 select-none"
    >
      <div
        className="relative w-full h-full overflow-hidden bg-white"
        style={{
          borderRadius: 'var(--radius-card)',
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-8 left-6 px-3 py-1.5 border-[3px] border-emerald-400 rounded-md text-emerald-400 text-3xl font-extrabold tracking-widest -rotate-12 pointer-events-none"
            >
              LIKE
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-8 right-6 px-3 py-1.5 border-[3px] border-rose-500 rounded-md text-rose-500 text-3xl font-extrabold tracking-widest rotate-12 pointer-events-none"
            >
              NOPE
            </motion.div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">{profile.name}</h2>
            <span className="text-2xl font-light">{profile.age}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-white/85">
            <MapPin size={14} />
            <span>{profile.distance}</span>
          </div>
          <p className="mt-2 text-sm text-white/90 line-clamp-2 leading-snug">{profile.bio}</p>
        </div>
      </div>
    </motion.div>
  );
}
