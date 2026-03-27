import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, HeartHandshake, MapPin, ChevronRight } from 'lucide-react';
import { TempleData } from '../data/temples';
import { ReactNode } from 'react';

export default function TempleHome({ temple }: { temple: TempleData }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100vh] min-h-[100dvh] pb-12 flex flex-col relative z-10"
    >
      {/* Hero Section */}
      <div className="relative h-[65vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${temple.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-red via-dark-red/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="p-1 rounded-full gold-gradient shadow-2xl mb-6"
          >
            <img 
              src={temple.logo} 
              alt="Logo" 
              className="w-24 h-24 rounded-full border-2 border-dark-red object-cover"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl font-serif font-medium text-white tracking-widest mb-3 drop-shadow-lg"
          >
            {temple.name}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gold-light tracking-widest text-sm mb-10 drop-shadow-md font-medium"
          >
            {temple.subtitle}
          </motion.p>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={() => navigate('/meditation')}
            className="gold-gradient text-dark-red px-12 py-4 rounded-full text-lg font-medium tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95 transition-transform flex items-center gap-2 border border-gold-light/50"
          >
            進入祈福 <ChevronRight size={20} />
          </motion.button>
        </div>
        
        {/* Decorative transition wave */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-beige" />
      </div>

      {/* About Section */}
      <div className="px-8 py-12 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 gold-gradient rounded-full" />
        <h2 className="text-sm gold-text-gradient font-medium tracking-widest mb-6 mt-4">關於本廟</h2>
        <p className="text-ink leading-loose tracking-wider whitespace-pre-line mb-8 font-serif">
          {temple.about}
        </p>
        <button className="text-sm text-dark-red tracking-widest border-b border-dark-red/30 pb-1 hover:text-dark-red-light transition-colors">
          查看更多
        </button>
      </div>

      {/* Services Section */}
      <div className="px-6 py-4">
        <h2 className="text-sm gold-text-gradient font-medium tracking-widest mb-6 text-center">廟宇服務</h2>
        <div className="grid grid-cols-3 gap-4">
          <ServiceCard icon={<Calendar size={24} />} title="最新活動" />
          <ServiceCard icon={<HeartHandshake size={24} />} title="功德捐款" />
          <ServiceCard icon={<MapPin size={24} />} title="參拜資訊" />
        </div>
      </div>

      {/* Event Card */}
      <div className="px-6 py-6">
        <div className="temple-card rounded-2xl p-6 flex justify-between items-center border-t-2 border-gold relative overflow-hidden group active:scale-[0.98] transition-transform">
          <div className="absolute right-0 top-0 w-32 h-32 bg-dark-red/5 rounded-bl-full -z-10" />
          <div>
            <div className="text-xs gold-text-gradient font-medium mb-2 tracking-widest">近期活動</div>
            <div className="text-ink tracking-wider font-medium">{temple.deity}誕辰祈福活動</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-beige-dark flex items-center justify-center text-dark-red group-active:bg-dark-red group-active:text-beige transition-colors">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-12 text-center text-xs text-ink-light/80 tracking-widest space-y-3">
        <p>{temple.address}</p>
        <p>{temple.phone}</p>
        <p>{temple.hours}</p>
      </div>
    </motion.div>
  );
}

function ServiceCard({ icon, title }: { icon: ReactNode, title: string }) {
  return (
    <div className="temple-card rounded-2xl p-5 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-50" />
      <div className="w-12 h-12 rounded-full bg-beige-dark flex items-center justify-center text-dark-red shadow-inner">
        {icon}
      </div>
      <span className="text-xs tracking-widest text-ink font-medium">{title}</span>
    </div>
  );
}
