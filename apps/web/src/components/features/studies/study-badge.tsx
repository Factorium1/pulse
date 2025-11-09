type ColorKey = 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet'

const COLOR_STYLES: Record<
  ColorKey,
  {
    bg: string
    text: string
    border: string
  }
> = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
}

export const StudyBadge = ({
  name,
  emoji,
  color = 'indigo',
}: {
  name: string
  emoji?: string
  color?: ColorKey
}) => {
  const c = COLOR_STYLES[color]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium
        ${c.bg} ${c.text} ${c.border}`}
    >
      {emoji && <span className="text-sm">{emoji}</span>}
      {name}
    </span>
  )
}
