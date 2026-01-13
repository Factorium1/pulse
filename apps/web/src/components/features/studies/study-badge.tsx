type ColorKey = 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'gray'

const COLOR_STYLES: Record<ColorKey, { bg: string; text: string; border: string }> = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  gray: { bg: 'bg-gray-50', text: 'text-muted-foreground', border: 'border-gray-200' },
}

const EMOJI_STYLES = {
  brain: { emoji: '🧠', color: 'indigo' },
  grow: { emoji: '🌱', color: 'emerald' },
  energy: { emoji: '⚡', color: 'amber' },
  passion: { emoji: '❤️‍🔥', color: 'rose' },
  idea: { emoji: '💡', color: 'violet' },
  info: { emoji: '📎', color: 'gray' },
} as const satisfies Record<string, { emoji: string; color: ColorKey }>

type EmojiKey = keyof typeof EMOJI_STYLES

type StudyBadgeProps = {
  name: string
  preset?: EmojiKey
  emoji?: React.ReactNode
  color?: ColorKey
}

export const StudyBadge = ({ name, preset, emoji, color }: StudyBadgeProps) => {
  const presetDefaults = preset ? EMOJI_STYLES[preset] : undefined

  const finalEmoji = emoji ?? presetDefaults?.emoji
  const finalColor: ColorKey = color ?? presetDefaults?.color ?? 'indigo'

  const c = COLOR_STYLES[finalColor]

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium
        ${c.bg} ${c.text} ${c.border}`}
    >
      {finalEmoji && <span className="text-sm">{finalEmoji}</span>}
      {name}
    </span>
  )
}
