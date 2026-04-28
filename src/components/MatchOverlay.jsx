import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MatchOverlay({ profile, me, open, onClose }) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && profile && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-tinder-gradient opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
            <motion.h1
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 15 }}
              className="text-5xl font-extrabold italic tracking-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
            >
              It's a Match! 🔥
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-white/90"
            >
              You and {profile.name} have liked each other.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-4 mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 18 }}
            >
              <img
                src={me}
                alt="you"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl -rotate-6"
              />
              <img
                src={profile.photos[0]}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl rotate-6"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full flex flex-col gap-3 mt-4"
            >
              <button
                onClick={() => {
                  onClose?.();
                  navigate(`/messages/${profile.id}`);
                }}
                className="w-full py-3.5 rounded-full bg-white text-tinder-pink font-bold text-base shadow-lg active:scale-95 transition-transform"
              >
                Send a Message
              </button>
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-white/15 backdrop-blur text-white font-semibold text-base border border-white/40 active:scale-95 transition-transform"
              >
                Keep Swiping
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
