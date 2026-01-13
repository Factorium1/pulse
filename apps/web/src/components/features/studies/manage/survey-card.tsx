import { LogOut } from 'lucide-react'
import { StudyBadge } from '../study-badge'

const LeaveSurveyCard = ({
  badgeName,
  badgeEmoji,
  title,
  info,
  estimatedDuration,
  availableTo,
}: {
  badgeName: string
  badgeEmoji: string
  title: string
  info: string
  estimatedDuration: number
  availableTo: string
}) => {
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
  ].filter(Boolean)
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm text-start">
      <div className="flex flex-between">
        <StudyBadge name={badgeName} preset={badgeEmoji} />
        <div className="bg-red-500 text-200 px-2 py-4">
          Studie verlassen <LogOut className="h-4 w-4" />
        </div>
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

export default LeaveSurveyCard
