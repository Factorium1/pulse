import { ArrowLeftIcon, ArrowRight, ArrowUpRight } from 'lucide-react'
import { getSurvey } from './actions'
import { StudyBadge } from '@/components/features/studies/study-badge'
import { Button } from '@/components/ui/button'

const MarketplaceDetailsPage = async ({ params }: { params: { id: string } }) => {
  const res = await getSurvey(params.id)

  if (!res.ok) {
    //TODO: redirect not found 404
  }

  const survey = res.survey

  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex-start flex-col gap-4">
        <p className="text-muted-foreground flex-center gap-2 text-sm cursor-pointer">
          <ArrowLeftIcon className="h-4 w-4 inline-flex" /> Zurueck zum Marketplace
        </p>
      </div>
      <div className="rounded-2xl bg-linear-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md flex-start flex-col gap-2">
        <StudyBadge name={survey.shortLabel} emoji={survey.emoji} />
        <div className="h1-bold">{survey.title}</div>
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
          <Button variant="ghost" size="default">
            Direkt Teilnehmen <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="default">
            Weitere Studien ansehen <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceDetailsPage
