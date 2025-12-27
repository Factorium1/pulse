import { ArrowLeftIcon } from 'lucide-react'

const MarketplaceDetailsPage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex-start flex-col">
        <p className="text-muted-foreground flex-center gap-2 text-sm">
          <ArrowLeftIcon className="h-4 w-4 inline-flex" /> Zurueck zum Marketplace
        </p>
      </div>
    </div>
  )
}

export default MarketplaceDetailsPage
