'use client'

import {
  CalendarRange,
  ChartColumnIncreasing,
  Download,
  Filter,
  Pause,
  Play,
  SearchIcon,
  Settings2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import EventCard from '@/components/features/editor-dashboard/event-card'
import { SurveyForm } from '@/types/props'
import SurveyCard from '@/components/features/manage/survey-card'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type ManageClientProps = {
  data: SurveyForm[]
}

const ManageClient = ({ data: surveys }: ManageClientProps) => {
  const surveysPlanned = surveys.filter((survey: SurveyForm) => survey.status === 'PLANNED')
  const surveysActive = surveys.filter((survey: SurveyForm) => survey.status === 'ACTIVE')
  const surveysPaused = surveys.filter((survey: SurveyForm) => survey.status === 'PAUSED')
  const surveysCompleted = surveys.filter((survey: SurveyForm) => survey.status === 'COMPLETED')

  const [filterByStatus, setFilterByStatus] = useState<
    'LIVE' | 'PAUSED' | 'PLANNED' | 'COMPLETED' | ''
  >('')

  const [searchFilter, setSearchFilter] = useState<string>('')

  const [filteredSurvey, setFilteredSurvey] = useState(surveys)

  useEffect(() => {
    let result = surveys

    if (filterByStatus !== '') {
      result = result.filter((s) => s.status === filterByStatus)
    }

    if (searchFilter !== '') {
      const search = searchFilter.toLowerCase().trim()
      result = result.filter((s) => s.title.toLowerCase().includes(search))
    }

    setFilteredSurvey(result)
  }, [filterByStatus, surveys, searchFilter])

  return (
    <div className="p-6 md:px-0 space-y-6">
      <div className="rounded-3xl border border-border/60 bg-linear-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Studienverwaltung
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Pipeline planen, steuern & ausrollen
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Übersichtlich pro Status, mit klaren Handlungsfeldern für Launches, Qualität und
              Kommunikation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Settings2 className="h-4 w-4" />
              Richtlinien
            </Button>
            <Link href="/editor/create">
              <Button size="sm" className="shadow-md cursor-pointer">
                <Play className="h-4 w-4" />
                Neue Studie
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <EventCard
            title="Geplant"
            icon={<CalendarRange />}
            count={surveysPlanned.length}
            statusText="Bereit zum Start"
            statusColorClass="text-blue-500"
          />
          <EventCard
            title="In Umsetzung"
            icon={<ChartColumnIncreasing />}
            count={surveysActive.length}
            statusText="Aktiv und laufend"
            statusColorClass="text-emerald-500"
          />
          <EventCard
            title="Pausiert"
            icon={<Pause />}
            count={surveysPaused.length}
            statusText="Warten auf Reaktivierung"
            statusColorClass="text-yellow-500"
          />
          <EventCard
            title="Abgeschlossen"
            icon={<Download />}
            count={surveysCompleted.length}
            statusText="Daten exportiert"
            statusColorClass="text-purple-500"
          />
        </div>
      </div>
      <div className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-xs flex-center flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <div className="">
            <p className="h3-bold">Allgemeine Studienverwaltung</p>
            <p className="text-sm text-muted-foreground">
              Aktionen für Statuswechsel, Launchplanung, Kommunikation und Qualitätssicherung.
            </p>
          </div>
          <div className="flex-center flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Filter className="h-4 w-4" />
              Filtern
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <form action="">
            <div className="flex-center gap-2 rounded-md border border-border/60 bg-background/60 w-full py-1 px-3 backdrop-blur">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Studie suchen..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </form>
          <div className="flex-center flex-wrap gap-2">
            <button
              className={`rounded-full px-3 py-1 text-xs cursor-pointer ${filterByStatus === 'LIVE' ? 'bg-emerald-200 border-none text-emerald-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
              onClick={() =>
                filterByStatus !== 'LIVE' ? setFilterByStatus('LIVE') : setFilterByStatus('')
              }
            >
              Live
            </button>
            <button
              className={`rounded-full px-3 py-1 text-xs cursor-pointer ${filterByStatus === 'PAUSED' ? 'bg-yellow-200 border-none text-yellow-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
              onClick={() =>
                filterByStatus !== 'PAUSED' ? setFilterByStatus('PAUSED') : setFilterByStatus('')
              }
            >
              Pausiert
            </button>
            <button
              className={`rounded-full px-3 py-1 text-xs cursor-pointer ${filterByStatus === 'PLANNED' ? 'bg-blue-200 border-none text-blue-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
              onClick={() =>
                filterByStatus !== 'PLANNED' ? setFilterByStatus('PLANNED') : setFilterByStatus('')
              }
            >
              Geplant
            </button>
            <button
              className={`rounded-full px-3 py-1 text-xs cursor-pointer ${filterByStatus === 'COMPLETED' ? 'bg-purple-200 border-none text-purple-500 font-semibold' : 'bg-muted/50 border border-border/60 text-foreground font-normal'}`}
              onClick={() =>
                filterByStatus !== 'COMPLETED'
                  ? setFilterByStatus('COMPLETED')
                  : setFilterByStatus('')
              }
            >
              Abgeschlossen
            </button>
          </div>
        </div>
        {filteredSurvey.map((survey: SurveyForm) => {
          return <SurveyCard key={survey.id} data={survey} />
        })}
      </div>
    </div>
  )
}

export default ManageClient
