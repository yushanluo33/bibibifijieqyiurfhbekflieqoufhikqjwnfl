import React from 'react';

export default function LiffGuide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-beige relative overflow-hidden bg-texture">
      <div className="px-6 py-8 md:px-12 w-full max-w-sm relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-8 text-gray-800 text-center tracking-wide">
          請依下方指示設定：
        </h2>
        
        <div className="space-y-6 text-lg font-medium text-left text-gray-800 w-full px-4">
          <p>1. 開啟 LINE App中的「設定」</p>
          <p>2. 進入「LINE Labs」</p>
          <p>3. 關閉「使用預設瀏覽器開啟連結」項目</p>
        </div>
        
        <p className="mt-14 text-md text-gray-600 font-medium tracking-wide">
          完成後，再次點擊開啟連結即可使用
        </p>
      </div>
    </div>
  );
}
