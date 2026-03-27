import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TempleData } from '../data/temples';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Step = 'input' | 'success';

export default function MakeWish({ temple }: { temple: TempleData }) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('input');
  const [wish, setWish] = useState('');

  const handleSubmit = () => {
    if (!wish.trim()) return;
    setStep('success');
  };

  return (
    <div className="min-h-[100vh] min-h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 flex items-center relative z-20">
        {step === 'input' && (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-ink-light active:bg-black/5 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
        )}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-widest text-ink-light">傳達心願</span>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center px-8 pb-20">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-sm flex flex-col items-center"
            >
              <h2 className="text-2xl font-serif text-ink tracking-widest mb-8 text-center">
                請寫下您的願望
              </h2>
              
              <div className="w-full temple-card rounded-3xl p-6 shadow-md border-2 border-gold mb-8 relative">
                {/* Traditional corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-dark-red/30 rounded-tl-3xl m-2 pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-dark-red/30 rounded-tr-3xl m-2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-dark-red/30 rounded-bl-3xl m-2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-dark-red/30 rounded-br-3xl m-2 pointer-events-none" />

                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="願家人平安健康..."
                  className="w-full h-40 bg-transparent border-none focus:outline-none resize-none text-ink tracking-wider leading-relaxed placeholder:text-ink-light/40 font-serif relative z-10"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!wish.trim()}
                className="gold-gradient text-dark-red px-12 py-4 rounded-full text-lg tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 transition-transform w-full disabled:opacity-50 disabled:active:scale-100 font-medium border border-gold-light/50"
              >
                送出祈福
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center relative z-10"
            >
              {/* Soft light expansion animation */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.25 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[radial-gradient(circle,_var(--color-gold)_0%,_transparent_70%)] rounded-full -z-10"
              />
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif text-dark-red tracking-widest font-medium">
                  您的心願已傳達
                </h3>
                <p className="text-ink tracking-widest leading-loose font-serif">
                  願{temple.deity}護佑，<br />平安順遂
                </p>
                
                <div className="pt-12">
                  <button 
                    onClick={() => navigate('/menu')}
                    className="text-dark-red tracking-widest text-sm border-b border-dark-red/30 pb-1"
                  >
                    返回首頁
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
