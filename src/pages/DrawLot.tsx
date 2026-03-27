import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TempleData } from '../data/temples';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Step = 'start' | 'shaking' | 'drawing' | 'result';

export default function DrawLot({ temple }: { temple: TempleData }) {
  const [step, setStep] = useState<Step>('start');
  const navigate = useNavigate();

  const handleStart = () => {
    setStep('shaking');
    setTimeout(() => {
      setStep('drawing');
      setTimeout(() => {
        setStep('result');
      }, 2500); // 2.5 seconds for drawing animation (stick flying up)
    }, 2000); // 2 seconds of cylinder shaking
  };

  return (
    <div className="min-h-[100vh] min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 flex items-center relative z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-ink-light active:bg-black/5 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-widest text-ink-light">求籤</span>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center px-8 pb-20">
        <AnimatePresence mode="wait">
          {step !== 'result' && (
            <motion.div
              key="interaction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.8 }}
              className="text-center w-full flex flex-col items-center relative"
            >
              {/* Magical Particles during drawing */}
              <AnimatePresence>
                {step === 'drawing' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0, opacity: 0, scale: 0 }}
                        animate={{ 
                          y: -150 - Math.random() * 100, 
                          opacity: [0, 1, 0],
                          scale: [0, Math.random() * 1.5 + 0.5, 0],
                          x: (Math.random() - 0.5) * 150
                        }}
                        transition={{ duration: 2, delay: i * 0.15, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,1)]"
                      />
                    ))}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0.3 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[radial-gradient(circle,_var(--color-gold)_0%,_transparent_70%)] rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Cylinder */}
              <LotCylinder step={step} />
              
              <div className="h-32 flex flex-col items-center justify-start mt-4">
                {step === 'start' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                    <h2 className="text-2xl font-serif text-ink tracking-widest mb-8 drop-shadow-sm">
                      請在心中默念您的問題
                    </h2>
                    <button
                      onClick={handleStart}
                      className="gold-gradient text-dark-red px-12 py-4 rounded-full text-lg tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 transition-transform w-full max-w-xs font-medium border border-gold-light/50"
                    >
                      開始求籤
                    </button>
                  </motion.div>
                )}
                {step === 'shaking' && (
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-dark-red font-serif tracking-[0.2em] font-medium text-lg mt-4"
                  >
                    正在為您請示…
                  </motion.p>
                )}
                {step === 'drawing' && (
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-gold-dark font-serif tracking-[0.2em] font-medium text-lg mt-4"
                  >
                    神明賜籤…
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full max-w-sm"
            >
              <div className="temple-card rounded-3xl p-8 border-2 border-gold relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-dark-red/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gold/20 to-transparent rounded-tr-full" />
                
                <div className="text-center mb-8 relative z-10">
                  <span className="inline-block gold-gradient text-dark-red px-5 py-1.5 rounded-full text-sm tracking-widest mb-4 font-medium shadow-sm border border-gold-light/50">
                    第23籤
                  </span>
                  <h3 className="text-2xl font-serif text-dark-red tracking-widest mb-2 font-medium">
                    雲開月明，前路自明
                  </h3>
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <h4 className="text-xs gold-text-gradient font-medium tracking-widest mb-2">解釋</h4>
                    <p className="text-ink tracking-wider leading-relaxed text-sm font-serif">
                      目前的困境將逐漸明朗，不需過度擔憂。
                    </p>
                  </div>
                  
                  <div className="w-full h-px gold-gradient opacity-30" />

                  <div>
                    <h4 className="text-xs gold-text-gradient font-medium tracking-widest mb-2">{temple.deity}提醒</h4>
                    <p className="text-dark-red tracking-wider leading-relaxed font-serif font-medium">
                      「順勢而行，心安則路明」
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => navigate('/menu')}
                  className="text-ink-light tracking-widest text-sm border-b border-ink-light/30 pb-1"
                >
                  返回首頁
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LotCylinder({ step }: { step: Step }) {
  const isShaking = step === 'shaking';
  const isDrawing = step === 'drawing';

  return (
    <motion.div 
      animate={isShaking ? {
        rotate: [0, -4, 4, -4, 4, -2, 2, 0],
        x: [0, -2, 2, -2, 2, -1, 1, 0]
      } : { rotate: 0, x: 0 }}
      transition={{ duration: 0.4, repeat: isShaking ? Infinity : 0 }}
      className="relative w-28 h-48 mx-auto z-10"
    >
      {/* Background Sticks */}
      <div className="absolute bottom-8 left-0 w-full h-full flex justify-center gap-3 px-4 z-0">
        <motion.div 
          animate={isShaking ? { y: [0, -15, 0, -20, 0] } : { y: 0 }} 
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
          className="w-3 h-36 bg-gradient-to-b from-beige to-beige-dark border border-gold-dark/40 rounded-t-full origin-bottom -rotate-12" 
        />
        <motion.div 
          animate={isShaking ? { y: [0, -25, 0, -10, 0] } : { y: 0 }} 
          transition={{ duration: 0.4, repeat: Infinity }}
          className="w-3 h-40 bg-gradient-to-b from-beige to-beige-dark border border-gold-dark/40 rounded-t-full origin-bottom -rotate-2" 
        />
        <motion.div 
          animate={isShaking ? { y: [0, -10, 0, -15, 0] } : { y: 0 }} 
          transition={{ duration: 0.25, repeat: Infinity, delay: 0.2 }}
          className="w-3 h-36 bg-gradient-to-b from-beige to-beige-dark border border-gold-dark/40 rounded-t-full origin-bottom rotate-12" 
        />
      </div>

      {/* The Winning Stick */}
      <motion.div
        initial={{ y: 0, opacity: 0, scale: 1 }}
        animate={isDrawing ? { 
          y: -140, 
          opacity: [0, 1, 1, 0],
          scale: 1.5,
          filter: ["brightness(1)", "brightness(1.2)", "brightness(1.5)"]
        } : { opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-5 h-44 bg-gradient-to-b from-white to-beige border border-gold rounded-t-full z-10 flex justify-center pt-3 shadow-[0_0_20px_rgba(212,175,55,0.8)]"
      >
        <span className="text-dark-red text-[10px] font-serif writing-vertical-rl font-bold">第二三籤</span>
      </motion.div>

      {/* Cylinder Body */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-dark-red to-[#5a1212] rounded-b-3xl rounded-t-xl border-2 border-gold shadow-2xl z-20 overflow-hidden flex flex-col items-center justify-between py-4">
        <div className="w-full h-1.5 gold-gradient opacity-80" />
        <div className="w-14 h-14 rounded-full border-2 border-gold/60 flex items-center justify-center bg-dark-red-light/40 shadow-inner">
          <span className="text-gold font-serif text-lg tracking-widest writing-vertical-rl font-medium">聖意</span>
        </div>
        <div className="w-full h-1.5 gold-gradient opacity-80" />
      </div>
    </motion.div>
  );
}
