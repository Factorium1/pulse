import { SurveyStatus } from '@/types/props'
import { is } from 'zod/v4/locales'

const StatusPill = ({ status }: { status: SurveyStatus }) => {
  const isLive = status === 'ACTIVE'
  const isScheduled = status === 'PLANNED'
  const isPaused = status === 'PAUSED'
  const baseColor = isLive
    ? 'bg-emerald-500'
    : isScheduled || isPaused
      ? 'bg-amber-500'
      : 'bg-rose-500'
  const label = isLive ? 'Live' : isScheduled ? 'Geplant' : 'Pausiert'

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${baseColor} opacity-60 animate-ping`}
        />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${baseColor}`} />
      </span>
      {label}
    </span>
  )
}

export default StatusPill
