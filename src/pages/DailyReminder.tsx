import { motion } from 'motion/react';
import { TempleData } from '../data/temples';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DailyReminder({ temple }: { temple: TempleData }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 flex items-center relative z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-ink-light active:bg-black/5 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-widest text-ink-light">今日提醒</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gold/10 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-beige px-4 py-1 text-xs tracking-widest text-gold">
              {new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })}
            </div>
            
            <h2 className="text-2xl font-serif text-ink tracking-widest leading-relaxed mb-8 mt-4">
              「心存善念，<br />福報自然來。」
            </h2>
            
            <div className="w-8 h-px bg-gold/50 mx-auto mb-6" />
            
            <p className="text-sm text-ink-light tracking-widest">
              來自 {temple.deity} 的祝福
            </p>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/menu')}
              className="text-ink-light tracking-widest text-sm border-b border-ink-light/30 pb-1"
            >
              返回首頁
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
