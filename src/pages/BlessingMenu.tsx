import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { TempleData } from '../data/temples';
import { ScrollText, MessageCircleHeart, Flame, Sparkles, ChevronLeft } from 'lucide-react';

export default function BlessingMenu({ temple }: { temple: TempleData }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'draw-lot',
      icon: <ScrollText size={32} strokeWidth={1.5} />,
      title: '求一支籤',
      desc: '為您指引方向',
      path: '/draw-lot'
    },
    {
      id: 'chat',
      icon: <MessageCircleHeart size={32} strokeWidth={1.5} />,
      title: '聽一段指引',
      desc: `與${temple.deity}對話`,
      path: '/chat'
    },
    {
      id: 'wish',
      icon: <Flame size={32} strokeWidth={1.5} />,
      title: '傳達心願',
      desc: '點一盞心燈',
      path: '/wish'
    },
    {
      id: 'reminder',
      icon: <Sparkles size={32} strokeWidth={1.5} />,
      title: '今日提醒',
      desc: '一則簡單的祝福',
      path: '/reminder'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[100vh] min-h-[100dvh] pb-12 flex flex-col relative z-10"
    >
      {/* Header */}
      <div className="pt-12 pb-6 px-6 flex items-center relative z-20">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-ink-light active:bg-black/5 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-widest text-ink-light">返回首頁</span>
      </div>

      <div className="text-center mb-12 px-6">
        <h1 className="text-2xl font-serif text-ink tracking-widest mb-4 drop-shadow-sm">
          今日，您想進行什麼祈福？
        </h1>
        <div className="w-16 h-1 gold-gradient mx-auto rounded-full" />
      </div>

      <div className="flex-1 flex flex-col gap-6 px-6">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.8 }}
            onClick={() => navigate(item.path)}
            className="temple-card rounded-3xl p-6 flex items-center gap-6 active:scale-[0.98] transition-transform text-left relative overflow-hidden group border border-gold/20"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-dark-red/5 to-transparent rounded-bl-full" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-beige-dark to-beige flex items-center justify-center text-dark-red shrink-0 shadow-inner border border-gold/10 group-active:from-dark-red group-active:to-dark-red-light group-active:text-gold-light transition-all duration-300">
              {item.icon}
            </div>
            <div className="relative z-10">
              <h2 className="text-lg text-ink font-serif font-medium tracking-widest mb-1">{item.title}</h2>
              <p className="text-sm text-ink-light tracking-wider">{item.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
