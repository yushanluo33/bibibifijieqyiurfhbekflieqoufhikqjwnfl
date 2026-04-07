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
import NfcRelay from './pages/NfcRelay';
import { temples } from './data/temples';
import LiffGuide from './components/LiffGuide';

const TEST_TOKEN = 'TEST_TOKEN_123';

function AppContent() {
  const [searchParams] = useSearchParams();
  const tid = searchParams.get('tid') || 'default';
  const token = searchParams.get('token');
  const temple = temples[tid] || temples['default'];

  const isLineApp = () => /Line/i.test(navigator.userAgent);
  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // /relay 頁面不做 LINE 檢查，直接渲染
  if (window.location.pathname === '/relay') {
    return <Routes><Route path="/relay" element={<NfcRelay />} /></Routes>;
  }

  if (!isLineApp()) {
    if (isMobile() && !sessionStorage.getItem('liff_redirected')) {
      sessionStorage.setItem('liff_redirected', '1');

      const liffId = '2009623218-lr2ajozK';
      window.location.href = `line://app/${liffId}`;
      const timer = setTimeout(() => {
        window.location.href = `https://liff.line.me/${liffId}`;
      }, 1500);
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

  // Token gate：有 token 時驗證
  if (token && token !== TEST_TOKEN) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 text-center px-8">
        <p className="text-2xl">⛔</p>
        <p className="text-gray-700 font-medium">連結已失效</p>
        <p className="text-sm text-gray-400">請重新掃描 NFC 標籤</p>
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
        <Route path="/relay" element={<NfcRelay />} />
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
