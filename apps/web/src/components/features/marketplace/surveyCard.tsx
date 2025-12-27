import { ArrowUpRight, CalendarDays, Clock10Icon, Users2 } from 'lucide-react'
import { StudyBadge } from '../studies/study-badge'
import PrivacyBadge from './privacy-badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SurveyCard = ({
  title,
  description,
  days,
  remainingPlaces,
  date,
  tags,
  id,
}: {
  title: string
  description: string
  days: number
  remainingPlaces: number
  date: Date
  tags: string[]
  id: string
}) => {
  const formattedDate = date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="flex-start rounded-2xl px-6 pb-3 pt-8 gap-3 shadow-md flex-col border border-border/80 bg-card/80 col-span-1">
      <div className="flex-between w-full">
        <StudyBadge name="Gesundheit" color="emerald" emoji="" />
        <PrivacyBadge status="public" />
      </div>
      <div className="h2-bold">{title}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center justify-start gap-2 w-full flex-wrap">
        <StudyBadge
          color="gray"
          name={`${days} Tage • 2 min/Tag`}
          emoji=<Clock10Icon className="h-4 w-4" />
        />
        <StudyBadge
          color="gray"
          name={`Noch ${remainingPlaces} Plaetze`}
          emoji=<Users2 className="h-4 w-4" />
        />
        <StudyBadge
          color="gray"
          name={`${formattedDate}`}
          emoji=<CalendarDays className="h-4 w-4" />
        />
      </div>
      <div className="flex items-center justify-start gap-2 w-full flex-wrap">
        {tags?.map((s) => (
          <StudyBadge key={s} name={s} />
        ))}
      </div>
      <div className="flex-between w-full mt-5">
        <div className="flex-center gap-2">
          <Button variant={'outline'} size={'default'}>
            Direkt teilnehmen
          </Button>
          <Button variant={'outline'} size={'default'}>
            Beschreibung
          </Button>
        </div>
        <Link href={`/marketplace/${id}`}>
          <Button variant={'ghost'} size={'default'}>
            Details <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SurveyCard
