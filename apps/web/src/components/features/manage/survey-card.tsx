import { Button } from '@/components/ui/button'
import StatusPill from '../editor-dashboard/status-pill'
import {
  ArrowUpRight,
  Bell,
  ChartColumnIncreasing,
  Download,
  Pause,
  PenBox,
  Play,
  Trash,
} from 'lucide-react'
import { SurveyForm } from '@/types/props'

export type SurveyWithParticipants = SurveyForm & {
  participants: number
  updatedAt: Date
}

type SurveyCardProps = {
  data: SurveyWithParticipants
}

const SurveyCard = ({ data: survey }: SurveyCardProps) => {
  const isCompletedOrArchived = () => {
    return survey.status === 'COMPLETED' || survey.status === 'ARCHIVED'
  }

  const updatedDate = new Date(survey.updatedAt).toLocaleString('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/80 p-5 text-sm shadow-xs w-full flex flex-col gap-4">
      <div className="flex-center">
        <div className="flex justify-center align-center flex-col gap-2 lg:flex-row lg:justify-between w-full items-center sm:items-start">
          <div className="flex-center gap-2">
            <StatusPill status={survey.status} />
            <p className="text-base font-semibold text-foreground">{survey.title}</p>
            <p className="rounded-full px-3 py-1 border border-border/60 bg-background/80 font-medium text-xs">
              {survey.id}
            </p>
          </div>
          <div className="flex items-center justify-start md:items-center md:justify-center flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <ChartColumnIncreasing className="h-4 w-4" />
              Stats
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <PenBox className="h-4 w-4" />
              Editieren
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Teilnehmende</p>
          <p className="text-lg font-semibold text-foreground">{survey.participants}</p>
          <p className="text-xs text-muted-foreground">Ziel {survey.targetParticipants}</p>
        </div>
        {/* TODO: implement Beantwortungszeit */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Ø Beantwortungszeit</p>
          <p className="text-lg font-semibold text-foreground">3min 12s</p>
          <p className="text-xs text-muted-foreground">Letzte Woche: 2min 50s</p>
        </div>
        {/* TODO: implement Reminder Erfolgsquote */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Reminder Erfolgsquote</p>
          <p className="text-lg font-semibold text-foreground">52%</p>
          <p className="text-xs text-muted-foreground">Letzte Woche: 47%</p>
        </div>
        {/* TODO: implement Abschlussquote */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Abschlussquote</p>
          <p className="text-lg font-semibold text-foreground">64%</p>
          <p className="text-xs text-muted-foreground">Gesamte Studie</p>
        </div>
      </div>
      <div className="flex items-start flex-col gap-2 md:flex-row md:gap-0 md:items-center md:justify-between">
        <div className="flex-start flex-col">
          <p className="font-semibold text-foreground">{`Letzte Aktivität: ${updatedDate} `}</p>
          <p className="text-xs text-muted-foreground">Letzte Änderung am Studiendesign</p>
        </div>
        <div className="flex-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs cursor-pointer ${isCompletedOrArchived() ? 'hidden' : ''}`}
          >
            {survey.status === 'ACTIVE' ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Freigeben <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Loeschen <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SurveyCard
