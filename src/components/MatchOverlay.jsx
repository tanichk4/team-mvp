import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

export default function MatchOverlay({ profile, me, open, onClose }) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && profile && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center px-8 text-white text-center"
          style={{ zIndex: 'var(--z-modal)', backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(253, 38, 122, 0.25), transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
            <motion.h1
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 15 }}
              className="text-brand-gradient font-extrabold animate-match-glow"
              style={{
                fontSize: 40,
                letterSpacing: '-1px',
                lineHeight: 1.1,
              }}
            >
              IT'S A MATCH
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 'var(--font-size-md)',
                color: 'rgba(255,255,255,0.92)',
                fontWeight: 400,
              }}
            >
              You and {profile.name} liked each other
            </motion.p>

            <motion.div
              className="relative flex items-center justify-center gap-4 mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 18 }}
            >
              <Avatar
                src={me}
                name="You"
                alt="you"
                loading="eager"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl -rotate-6"
              />
              <Avatar
                src={profile.photos[0]}
                name={profile.name}
                loading="eager"
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
                className="w-full text-white font-bold active:scale-95 transition-transform"
                style={{
                  height: 52,
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--gradient-brand)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  fontSize: 'var(--font-size-md)',
                  boxShadow: 'var(--shadow-modal)',
                }}
              >
                Send a Message
              </button>
              <button
                onClick={onClose}
                className="w-full font-bold text-white active:scale-95 transition-transform"
                style={{
                  height: 52,
                  borderRadius: 'var(--radius-pill)',
                  border: '2px solid var(--color-white)',
                  backgroundColor: 'transparent',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  fontSize: 'var(--font-size-md)',
                }}
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
