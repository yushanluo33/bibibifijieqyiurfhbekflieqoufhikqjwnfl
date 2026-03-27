import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { TempleData } from '../data/temples';

export default function Meditation({ temple }: { temple: TempleData }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-[100vh] min-h-[100dvh] flex flex-col items-center justify-center relative px-8"
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_60%)] opacity-10" />
      
      {/* Faint Deity Outline */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-64 h-64 rounded-full border border-ink" />
      </motion.div>

      <div className="relative z-10 text-center space-y-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <h1 className="text-3xl font-serif text-ink tracking-[0.2em] mb-6">
            請靜心片刻
          </h1>
          <p className="text-ink-light tracking-widest leading-loose">
            將您的心願，<br />輕輕放在心中
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          onClick={() => navigate('/menu')}
          className="text-dark-red tracking-[0.2em] border border-dark-red/30 rounded-full px-12 py-4 hover:bg-dark-red/5 active:bg-dark-red/10 transition-colors"
        >
          開始
        </motion.button>
      </div>
    </motion.div>
  );
}
