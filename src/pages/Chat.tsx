import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { TempleData } from '../data/temples';
import { ChevronLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'deity';
}

export default function Chat({ temple }: { temple: TempleData }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `信士您好，我是${temple.deity}。今日有什麼煩心事，或是想說的話，都可以告訴我。`,
      sender: 'deity'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with gentle, guiding tone
    setTimeout(() => {
      const newDeityMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: '凡事不急於一時，靜心觀察，方向自然會明朗。願你心安。',
        sender: 'deity'
      };
      setMessages(prev => [...prev, newDeityMsg]);
      setIsTyping(false);
    }, 2500);
  };

  return (
    <div className="h-[100vh] h-[100dvh] flex flex-col bg-beige">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center bg-beige/90 backdrop-blur-md z-20 border-b border-gold/20 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-ink-light active:bg-black/5 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 text-center pr-8">
          <span className="text-sm tracking-widest text-ink font-serif font-medium">聽一段指引</span>
          <div className="text-[10px] tracking-widest text-dark-red mt-0.5">{temple.deity}</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.sender === 'deity' && (
              <span className="text-xs text-dark-red tracking-widest mb-1.5 ml-1 font-medium">{temple.deity}</span>
            )}
            <div 
              className={`max-w-[80%] rounded-2xl p-4 tracking-wider leading-relaxed text-sm font-serif ${
                msg.sender === 'user' 
                  ? 'gold-gradient text-dark-red rounded-tr-sm shadow-md border border-gold-light/50 font-medium' 
                  : 'bg-white text-ink border border-gold/20 rounded-tl-sm shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-start"
          >
            <span className="text-xs text-dark-red tracking-widest mb-1.5 ml-1 font-medium">{temple.deity}</span>
            <div className="bg-white border border-gold/20 rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1.5">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gold/20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-end gap-2 bg-beige rounded-3xl p-2 pl-4 border border-gold/10">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="請輸入您的心事..."
            className="flex-1 bg-transparent border-none focus:outline-none resize-none py-2 text-sm tracking-wider text-ink placeholder:text-ink-light/50 max-h-32 min-h-[40px] font-serif"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full gold-gradient text-dark-red flex items-center justify-center shrink-0 disabled:opacity-50 disabled:grayscale transition-all shadow-sm border border-gold-light/50"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
