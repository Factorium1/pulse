import Link from 'next/link'
import { StudyBadge } from './study-badge'

type SurveyCardProps = {
  id: string
  title: string
  availableFrom?: string
  availableTo?: string
  estimatedDuration?: string
  info?: string
  samplingLimit?: number
  sampling?: boolean
  badgeEmoji: 'brain' | 'grow' | 'energy' | 'passion' | 'idea' | 'info'
  badgeName: string
  disabled?: boolean
  timeBlocked?: boolean
}

const SurveyCard = ({
  id,
  title,
  availableTo,
  estimatedDuration,
  info,
  samplingLimit,
  sampling,
  badgeEmoji,
  badgeName,
  disabled = false,
  timeBlocked = false,
}: SurveyCardProps) => {
  const Items = [
    info && <div>{info}</div>,
    estimatedDuration && (
      <div>
        <span className="">ca. </span> {estimatedDuration} Min
      </div>
    ),
    availableTo && (
      <div>
        <span className="">bis: </span> {availableTo}
      </div>
    ),
    samplingLimit && (
      <div>
        <span className="">heute 1/{samplingLimit}</span>
      </div>
    ),
  ].filter(Boolean)

  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm text-start">
      <div className="flex flex-between">
        <StudyBadge name={badgeName} preset={badgeEmoji} />
        {!disabled &&
          (timeBlocked ? (
            <span className="text-sm px-4 py-2 bg-muted text-muted-foreground cursor-not-allowed rounded-xl font-semibold">
              {sampling ? 'Jetzt protokollieren' : 'Starten'}
            </span>
          ) : (
            <Link
              href={`/studies/${id}`}
              className="text-sm px-4 py-2 bg-primary text-accent cursor-pointer rounded-xl font-semibold"
            >
              {sampling ? 'Jetzt protokollieren' : 'Starten'}
            </Link>
          ))}
      </div>
      <p className="h3-bold">{title}</p>
      <div className="flex justify-start flex-row text-sm text-muted-foreground flex-wrap">
        {Items.map((item, index) => (
          <div key={index} className="flex-center flex-row">
            {item}
            {index < Items.length - 1 && <div className="mx-2 flex-center">•</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SurveyCard
