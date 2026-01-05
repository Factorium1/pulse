import SurveyCard from '@/components/features/marketplace/surveyCard'
import { Button } from '@/components/ui/button'
import { SurveyUpdateDraft } from '@/types/props'
import { ArrowUpRight, SearchIcon, Stars } from 'lucide-react'
import { getSurveys } from './actions'

type SurveyUpdateCountDraft = SurveyUpdateDraft & {
  _count: {
    participants: number
  }
}

const MarketplacePage = async () => {
  const res = await getSurveys()
  const surveys = res.ok ? (res.surveys ?? []) : []
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex items-start sm:justify-between rounded-2xl bg-linear-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md flex-col lg:flex-row gap-6">
        <div className="flex-start flex-col">
          <p className="h1-bold">Marketplace</p>
          <p className="text-primary-foreground/80">
            Entdecke neue Studien - bewirb dich oder nimm direkt teil.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" className="">
          Studie erstellen <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-between rounded-2xl text-primary-foreground px-6 py-8 shadow-md flex-col lg:flex-row border border-border/80 bg-card/80">
        <div className="flex-start w-full flex-col gap-4">
          <div className="flex-center gap-2 rounded-md border border-border/60 bg-background/60 w-full py-1 px-3 backdrop-blur">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Suche nach Thema, Kategorie oder Stichwort..."
              // value={}
              // onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex-between flex-wrap w-full gap-2">
            <p className="text-foreground/80 flex-center text-sm gap-1">
              <Stars className="inline-block h-4 w-4" />
              {surveys.length} Ergebnisse gefunden
            </p>
            <div className="flex-center gap-2 flex-wrap">
              <button
                className={`rounded-full px-3 py-1 text-xs cursor-pointer ${'ACTIVE' === 'ACTIVE' ? 'bg-indigo-200 border-none text-indigo-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
                // onClick={}
              >
                Bewerbung
              </button>
              <button
                className={`rounded-full px-3 py-1 text-xs cursor-pointer ${'ACTIVE' === 'ACTIVE' ? 'bg-indigo-200 border-none text-indigo-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
                // onClick={}
              >
                Direktteilnahme
              </button>
              <button
                className={`rounded-full px-3 py-1 text-xs cursor-pointer ${'ACTIVE' === 'ACTIVE' ? 'bg-indigo-200 border-none text-indigo-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
                // onClick={}
              >
                Kurz
              </button>
              <button
                className={`rounded-full px-3 py-1 text-xs cursor-pointer ${'ACTIVE' === 'ACTIVE' ? 'bg-indigo-200 border-none text-indigo-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
                // onClick={}
              >
                Lang
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        {surveys.map((s: SurveyUpdateCountDraft) => (
          <SurveyCard
            key={s.id}
            title={s.title}
            description={s.description ?? ''}
            days={1}
            remainingPlaces={s.targetParticipants - s._count.participants}
            date={new Date(2026, 0, 21)}
            tags={s.tags}
            id={s.id}
          />
        ))}
      </div>
    </div>
  )
}

export default MarketplacePage
