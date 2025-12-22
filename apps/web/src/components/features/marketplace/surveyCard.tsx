import { ArrowUpRight, CalendarDays, Clock10Icon, Users2 } from 'lucide-react'
import { StudyBadge } from '../studies/study-badge'
import PrivacyBadge from './privacy-badge'
import { Button } from '@/components/ui/button'

const SurveyCard = () => {
  return (
    <div className="flex-start rounded-2xl px-6 pb-3 pt-8 gap-3 shadow-md flex-col border border-border/80 bg-card/80 col-span-1">
      <div className="flex-between w-full">
        <StudyBadge name="Gesundheit" color="emerald" emoji="" />
        <PrivacyBadge status="public" />
      </div>
      <div className="h2-bold">Stress-Kompass</div>
      <p className="text-sm text-muted-foreground">
        Hilf uns herauszufinden wie Menschen auf Stress reagieren. Am ende bekommst du unsere
        Analyse.
      </p>
      <div className="flex items-center justify-start gap-2 w-full flex-wrap">
        <StudyBadge
          color="gray"
          name="10 Tage • 2 min/Tag"
          emoji=<Clock10Icon className="h-4 w-4" />
        />
        <StudyBadge color="gray" name="Noch 18 Plaetze" emoji=<Users2 className="h-4 w-4" /> />
        <StudyBadge color="gray" name="Bis 31.01." emoji=<CalendarDays className="h-4 w-4" /> />
      </div>
      <div className="flex items-center justify-start gap-2 w-full flex-wrap">
        <StudyBadge name="Sport" />
        <StudyBadge name="Studenten" />
        <StudyBadge name="Schueler" />
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
        <Button variant={'ghost'} size={'default'}>
          Details <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default SurveyCard
