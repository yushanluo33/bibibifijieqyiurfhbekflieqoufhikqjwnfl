import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const LIFF_ID = '2009623218-lr2ajozK'
const TEST_TOKEN = 'TEST_TOKEN_123'

export default function NfcRelay() {
  const [searchParams] = useSearchParams()
  const nid = searchParams.get('nid') ?? 'SPOT_001'

  useEffect(() => {
    const params = `?token=${TEST_TOKEN}&nid=${nid}`
    const liffState = encodeURIComponent(params)
    const deepLink = `line://app/${LIFF_ID}?liff.state=${liffState}`
    const fallbackUrl = `https://liff.line.me/${LIFF_ID}?liff.state=${liffState}`

    window.location.href = deepLink
    setTimeout(() => {
      window.location.href = fallbackUrl
    }, 1500)
  }, [nid])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      <p className="text-gray-600">正在開啟 LINE...</p>
      <p className="text-xs text-gray-400">請在對話框中點選「打開」</p>
    </div>
  )
}
