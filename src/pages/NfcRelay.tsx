import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const LIFF_ID = '2009623218-lr2ajozK'

type Status = 'verifying' | 'redirecting' | 'error'

export default function NfcRelay() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [errorMsg, setErrorMsg] = useState('')

  const data = searchParams.get('data') ?? ''

  useEffect(() => {
    if (!data) {
      setErrorMsg('缺少必要參數，請重新掃描 NFC')
      setStatus('error')
      return
    }

    fetch('/api/verify-tac', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })
      .then(async (res) => {
        if (res.status === 403) {
          setErrorMsg('此 NFC 標籤已使用過，請重新掃描取得新的動態碼')
          setStatus('error')
          return
        }
        if (!res.ok) {
          setErrorMsg('驗證失敗，請稍後再試')
          setStatus('error')
          return
        }

        // 驗證通過，跳轉 LIFF（帶 session token）
        setStatus('redirecting')
        const body = await res.json()
        const params = `?session=${body.sessionToken}`
        const liffState = encodeURIComponent(params)
        const deepLink = `line://app/${LIFF_ID}?liff.state=${liffState}`
        const fallbackUrl = `https://liff.line.me/${LIFF_ID}?liff.state=${liffState}`

        window.location.href = deepLink
        setTimeout(() => {
          window.location.href = fallbackUrl
        }, 1500)
      })
      .catch(() => {
        setErrorMsg('網路錯誤，請稍後再試')
        setStatus('error')
      })
  }, [data])

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 px-8 text-center">
        <p className="text-4xl">⛔</p>
        <p className="text-gray-700 font-medium">{errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      <p className="text-gray-600">
        {status === 'verifying' ? '正在驗證 NFC...' : '正在開啟 LINE...'}
      </p>
      {status === 'redirecting' && (
        <p className="text-xs text-gray-400">請在對話框中點選「打開」</p>
      )}
    </div>
  )
}
