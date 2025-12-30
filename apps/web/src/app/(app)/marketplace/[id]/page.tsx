import { ArrowLeftIcon } from 'lucide-react'
import { getSurvey } from './actions'

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
    </div>
  )
}

export default MarketplaceDetailsPage
