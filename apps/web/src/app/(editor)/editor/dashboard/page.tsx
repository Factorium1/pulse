import { Button } from '@/components/ui/button'
import EventCard from '@/components/features/editor-dashboard/event-card'
import { ArrowUpRight, Clock3, Download, Filter, Play } from 'lucide-react'
import StatusPill from '@/components/features/editor-dashboard/status-pill'
import { Progress } from '@/components/ui/progress'
import OverviewCard from '@/components/features/editor-dashboard/overview-card'

type StudyStatus = 'live' | 'scheduled' | 'paused'

type Study = {
  id: string
  name: string
  status: StudyStatus
  participants: number
  target: number
  completion: number
  conversion: number
  updated: string
}

const studies: Study[] = [
  {
    id: 'CX-2412',
    name: 'Kundenzufriedenheit 2024',
    status: 'live',
    participants: 482,
    target: 600,
    completion: 76,
    conversion: 54,
    updated: 'vor 2 Std.',
  },
  {
    id: 'PR-2309',
    name: 'Preis-Sensitivität Retail',
    status: 'scheduled',
    participants: 0,
    target: 350,
    completion: 0,
    conversion: 0,
    updated: 'geplant für morgen',
  },
  {
    id: 'FM-2403',
    name: 'Finanz-App Onboarding',
    status: 'live',
    participants: 198,
    target: 250,
    completion: 64,
    conversion: 38,
    updated: 'vor 40 Min.',
  },
  {
    id: 'HX-2311',
    name: 'UX Benchmark Checkout',
    status: 'paused',
    participants: 122,
    target: 200,
    completion: 41,
    conversion: 22,
    updated: 'wird überprüft',
  },
]

const EditorDashboardPage = () => {
  return (
    <div className="p-6 md:py-6 md:px-0 flex flex-col gap-6">
      <div className="rounded-3xl border border-border/60 bg-linear-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Editor</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Studien-Dashboard
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Überwache Live-Studien, halte Pausen im Blick und setze kommende Launches auf Kurs.
              Klar priorisiert für schnelles Handeln.
            </p>
          </div>
          <div className="flex-center md:flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Filter className="h-4 w-4" />
              Filtern
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="shadow-md">
              <Play className="h-4 w-4" />
              Neue Studie starten
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <EventCard
          title="Live"
          icon={<ArrowUpRight />}
          count={24}
          statusText="Aktiv und antwortend"
          statusColorClass="text-emerald-500"
        />
        <EventCard
          title="Pausiert"
          icon={<Clock3 />}
          count={5}
          statusText="Warten auf Reaktivierung"
          statusColorClass="text-yellow-500"
        />
        <EventCard
          title="Abgeschlossen"
          icon={<Download />}
          count={12}
          statusText="Daten exportiert"
          statusColorClass="text-blue-500"
        />
        <EventCard
          title="Fehlerhaft"
          icon={<ArrowUpRight />}
          count={2}
          statusText="Überprüfung erforderlich"
          statusColorClass="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-cm xl:col-span-2">
          <div className="flex-between gap-4">
            <div className="">
              <p className="h3-bold">Studienpipeline</p>
              <p className="text-sm text-muted-foreground">
                Status, Fortschritte und Engagement pro Studie.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              Alle ansehen <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {studies.map((study) => {
              const utilization = Math.min(
                100,
                Math.round((study.participants / study.target) * 100),
              )
              return (
                <div
                  key={study.id}
                  className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/60 p-4 text-sm shadow-xs lg:flex-row lg:items-center lg:gap-6"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <StatusPill status={study.status} />
                    <div>
                      <p className="font-semibold text-foreground">{study.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {study.id} • {study.updated}
                      </p>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-2 items-center gap-3 md:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Teilnehmende</p>
                      <p className="text-base font-semibold text-foreground">
                        {study.participants}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Abschlussrate</p>
                      <p className="text-base font-semibold text-foreground">{study.completion}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Conversion</p>
                      <p className="text-base font-semibold text-foreground">{study.conversion}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Zielerreichung</p>
                      <Progress value={utilization} />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {utilization}% von {study.target}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-cm">
          <div className="flex-between gap-4">
            <div>
              <p className="h3-bold">Signal-Check</p>
              <p className="text-sm text-muted-foreground">
                Qualitaet & Geschwindigkeit im Ueberblick.
              </p>
            </div>
            {/* TODO: All Buttons to Link with href */}
            <Button variant="ghost" size="sm" className="text-xs">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <OverviewCard
            label="Ø Abschlussrate"
            delta="+5% seit letzter Woche"
            value={72}
            icon={<ArrowUpRight />}
          />
          <OverviewCard
            label="Ø Antwortzeit"
            delta="+8% diesen Monat"
            value={45}
            icon={<ArrowUpRight />}
          />
          <OverviewCard
            label="Mobile Anteil"
            delta="+2% vs Desktop"
            value={88}
            icon={<ArrowUpRight />}
          />
        </div>
      </div>
    </div>
  )
}

export default EditorDashboardPage
