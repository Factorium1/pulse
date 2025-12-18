import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

const MarketplacePage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex-between rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md flex-col lg:flex-row gap-6">
        <div className="flex-start flex-col">
          <p className="h1-bold">Marketplace</p>
          <p className="text-primary-foreground/80">
            Entdecke neue Studien - bewirb dich oder nimm direkt teil.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm">
          Studie erstellen <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-between rounded-2xl text-primary-foreground px-6 py-8 shadow-md flex-col lg:flex-row"></div>
    </div>
  )
}

export default MarketplacePage
