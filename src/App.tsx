/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import TempleHome from './pages/TempleHome';
import Meditation from './pages/Meditation';
import BlessingMenu from './pages/BlessingMenu';
import DrawLot from './pages/DrawLot';
import Chat from './pages/Chat';
import MakeWish from './pages/MakeWish';
import DailyReminder from './pages/DailyReminder';
import { temples } from './data/temples';
import LiffGuide from './components/LiffGuide';

function AppContent() {
  const [searchParams] = useSearchParams();
  const tid = searchParams.get('tid') || 'default';
  const temple = temples[tid] || temples['default'];

  const isLineApp = () => /Line/i.test(navigator.userAgent);
  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isLineApp()) {
    if (isMobile() && !sessionStorage.getItem('liff_redirected')) {
      sessionStorage.setItem('liff_redirected', '1');

      const liffId = '2009623218-lr2ajozK';
      // 先嘗試 deep link 喚起 LINE App
      window.location.href = `line://app/${liffId}`;
      // LINE 未安裝或無法喚起時，1.5 秒後 fallback 到 liff.line.me
      const timer = setTimeout(() => {
        window.location.href = `https://liff.line.me/${liffId}`;
      }, 1500);
      // 若 LINE 成功開啟（頁面進入背景），取消 fallback
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearTimeout(timer);
      }, { once: true });

      return null;
    }
    return (
      <div className="max-w-md mx-auto min-h-[100vh] min-h-[100dvh] bg-beige relative overflow-hidden shadow-xl bg-texture">
        <LiffGuide />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-[100vh] min-h-[100dvh] bg-beige relative overflow-hidden shadow-xl bg-texture">
      <Routes>
        <Route path="/" element={<TempleHome temple={temple} />} />
        <Route path="/meditation" element={<Meditation temple={temple} />} />
        <Route path="/menu" element={<BlessingMenu temple={temple} />} />
        <Route path="/draw-lot" element={<DrawLot temple={temple} />} />
        <Route path="/chat" element={<Chat temple={temple} />} />
        <Route path="/wish" element={<MakeWish temple={temple} />} />
        <Route path="/reminder" element={<DailyReminder temple={temple} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
