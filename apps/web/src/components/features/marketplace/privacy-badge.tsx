import { Globe, LockKeyhole } from 'lucide-react'
import { ReactElement } from 'react'

type PrivacyStatus = 'public' | 'private'

type ColorStyle = {
  bg: string
  text: string
  border: string
  emoji: ReactElement
  ctx: string
}

const COLOR_STYLES: Record<PrivacyStatus, ColorStyle> = {
  public: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    emoji: <Globe className="h-4 w-4 text-blue-400" />,
    ctx: 'Public',
  },
  private: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    emoji: <LockKeyhole className="h-4 w-4" />,
    ctx: 'Private',
  },
}

const PrivacyBadge = ({ status = 'public' }: { status: 'public' | 'private' }) => {
  const c = COLOR_STYLES[status]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 text-xs font-medium py-0.5 ${c.bg} ${c.text} ${c.border}`}
    >
      <span className="text-sm">{c.emoji}</span>
      {c.ctx}
    </span>
  )
}

export default PrivacyBadge
