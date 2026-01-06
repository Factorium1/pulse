import {
  ArrowLeftIcon,
  ArrowUpRight,
  CalendarDays,
  Clock10Icon,
  ShieldAlertIcon,
  Users2,
} from 'lucide-react'
import { getSurvey } from './actions'
import { StudyBadge } from '@/components/features/studies/study-badge'
import { Button } from '@/components/ui/button'
import { CalendarCard } from '@/components/features/marketplace/calendar-card'
import { ApplicationType } from '@prisma/client'
import ApplyButton from '@/components/features/marketplace/apply-button'
import BackToMarketplaceButton from '@/components/features/marketplace/back-button'
import { SurveyStatus } from '@/types/props'

type MarketplaceSurvey = {
  title: string
  shortLabel: string | null
  emoji: string | null
  description: string | null
  tags: string[]
  targetParticipants: number
  _count: {
    participants: number
  }
  application: ApplicationType
  status: string
}

const MarketplaceDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const res = await getSurvey(id)

  if (!res.ok) {
    //TODO: redirect not found 404
  }

  const survey: MarketplaceSurvey = res.survey
  const description = survey.description ?? ''

  const surveyStatus: Record<SurveyStatus, string> = {
    PLANNED: 'Geplant',
    ACTIVE: 'Aktiv',
    PAUSED: 'Pausiert',
    COMPLETED: 'Abgeschlossen',
    ARCHIVED: 'Archiviert',
  }

  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex-start flex-col gap-4">
        <BackToMarketplaceButton />
      </div>
      <div className="rounded-2xl bg-linear-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md flex-start flex-col gap-2">
        <StudyBadge name={survey.shortLabel ?? ''} emoji={survey.emoji ?? undefined} />
        <div className="h1-bold">{survey.title}</div>
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
          <ApplyButton
            targetParticipants={survey.targetParticipants}
            participants={survey._count.participants}
            application={survey.application}
            id={id}
          />
          <Button variant="ghost" size="default">
            Weitere Studien ansehen <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-4">
        <div className="col-span-3 flex-center flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card text-foreground px-6 py-4 shadow-md w-full flex-start flex-col gap-2">
            <div className="h2-bold">Ueberblick</div>
            <p className="text-muted-foreground">
              <span>{description}</span>
            </p>
            <div className="flex items-center justify-start gap-2 w-full flex-wrap">
              <StudyBadge
                color="gray"
                name={'2 Tage • 2 min/Tag'}
                emoji=<Clock10Icon className="h-4 w-4" />
              />
              <StudyBadge
                color="gray"
                name={
                  survey.targetParticipants - survey._count.participants <= 0
                    ? 'Studie ist voll'
                    : `Noch ${survey.targetParticipants - survey._count.participants} Plaetze`
                }
                emoji=<Users2 className="h-4 w-4" />
              />
              <StudyBadge
                color="gray"
                name={'12.12.2022'}
                emoji=<CalendarDays className="h-4 w-4" />
              />
            </div>
          </div>

          {(survey.status === SurveyStatus.PLANNED || survey.status === SurveyStatus.PAUSED) && (
            <div className="rounded-2xl border border-border bg-card text-foreground px-6 py-4 shadow-md w-full flex-start flex-col gap-2">
              <div className="flex-start flex-col gap-2">
                <div className="flex-center gap-2">
                  <ShieldAlertIcon className="text-orange-300" />
                  <p className="h3-bold text-orange-300">Warnung</p>
                </div>

                <div className="flex-center">
                  <p className="text-sm text-muted-foreground">
                    Die Studie hat den Status{' '}
                    <span className="font-semibold text-foreground">
                      {surveyStatus[survey.status]}
                    </span>
                    .
                    <span className="block">
                      Der Zeitplan sowie die angegebenen Informationen koennen sich aendern.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-border bg-card text-foreground px-6 py-4 shadow-md w-full flex-start flex-col gap-2">
            <div className="h2-bold">Was du machst</div>
            <p className="text-muted-foreground">{/* TODO: Show  */}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card text-foreground px-6 py-4 shadow-md w-full flex-start flex-col gap-2">
            <div className="h2-bold">Zeitplan</div>
            <p className="text-muted-foreground">{/* TODO: Show  */}</p>
            <CalendarCard startDate={new Date()} endDate={new Date('2027-01-01')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceDetailsPage
