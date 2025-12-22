'use client'

import PrivacyBadge from '@/components/features/marketplace/privacy-badge'
import { StudyBadge } from '@/components/features/studies/study-badge'
import { Button } from '@/components/ui/button'
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  Clock10,
  Clock10Icon,
  SearchIcon,
  Stars,
  Users2,
} from 'lucide-react'

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
          <p className="text-foreground/80 flex-center text-sm gap-1">
            <Stars className="inline-block h-4 w-4" />5 Ergebnisse gefunden
          </p>
        </div>
        <div className="flex items-center justify-end flex-row flex-wrap w-full gap-2">
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
      <div className="grid grid-cols-1 lg:grid-cols-2">
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
          <div className="flex-center"></div>
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage
