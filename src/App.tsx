/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TempleHome from './pages/TempleHome';
import Meditation from './pages/Meditation';
import BlessingMenu from './pages/BlessingMenu';
import DrawLot from './pages/DrawLot';
import Chat from './pages/Chat';
import MakeWish from './pages/MakeWish';
import DailyReminder from './pages/DailyReminder';
import NfcRelay from './pages/NfcRelay';
import { temples, TempleData } from './data/temples';
import LiffGuide from './components/LiffGuide';

function AppContent() {
  const [searchParams] = useSearchParams();
  const [verifyState, setVerifyState] = useState<'loading' | 'ok' | 'fail'>('loading');

  const isLineApp = () => /Line/i.test(navigator.userAgent);
  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // /relay 頁面不做 LINE 檢查，直接渲染
  if (window.location.pathname === '/relay') {
    return <Routes><Route path="/relay" element={<NfcRelay />} /></Routes>;
  }

  // 非 LINE 瀏覽器處理
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

  // 解析 session token（直接或從 liff.state 裡）
  let session = searchParams.get('session');
  const liffState = searchParams.get('liff.state');
  if (!session && liffState) {
    const liffParams = new URLSearchParams(liffState.replace(/^\?/, ''));
    session = liffParams.get('session');
  }

  const tid = (() => {
    let t = searchParams.get('tid');
    if (!t && liffState) t = new URLSearchParams(liffState.replace(/^\?/, '')).get('tid');
    return t || 'default';
  })();
  const temple = temples[tid] || temples['default'];

  return <SessionGate session={session} verifyState={verifyState} setVerifyState={setVerifyState} temple={temple} />;
}

function SessionGate({
  session,
  verifyState,
  setVerifyState,
  temple,
}: {
  session: string | null;
  verifyState: 'loading' | 'ok' | 'fail';
  setVerifyState: (s: 'loading' | 'ok' | 'fail') => void;
  temple: TempleData;
}) {
  useEffect(() => {
    // 已有 localStorage 快取，直接放行
    if (localStorage.getItem('nfc_verified') === '1') {
      setVerifyState('ok');
      return;
    }
    // 有新的 session token，向後端驗證
    if (session) {
      fetch(`/api/verify-session?token=${encodeURIComponent(session)}`)
        .then((res) => {
          if (res.ok) {
            localStorage.setItem('nfc_verified', '1');
            setVerifyState('ok');
          } else {
            setVerifyState('fail');
          }
        })
        .catch(() => setVerifyState('fail'));
      return;
    }
    // 沒有 session 也沒有快取
    setVerifyState('fail');
  }, [session, setVerifyState]);

  if (verifyState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600" />
        <p className="text-gray-500 text-sm">驗證中...</p>
      </div>
    );
  }

  if (verifyState === 'fail') {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 text-center px-8">
        <p className="text-2xl">⛔</p>
        <p className="text-gray-700 font-medium">請先掃描 NFC 標籤</p>
        <p className="text-sm text-gray-400">透過 NFC 標籤進入才能使用</p>
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
