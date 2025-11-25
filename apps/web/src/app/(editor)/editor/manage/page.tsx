import {
  CalendarRange,
  ChartColumnIncreasing,
  Download,
  Pause,
  Play,
  Settings2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import EventCard from '@/components/features/editor-dashboard/event-card'

const ManagePage = () => {
  return (
    <div className="p-6 md:px-0 space-y-6">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl">
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
              <Download className="h-4 w-4" />
              Bulk-Export
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Settings2 className="h-4 w-4" />
              Richtlinien
            </Button>
            <Button size="sm" className="shadow-md">
              <Play className="h-4 w-4" />
              Neue Studie
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <EventCard
            title="Geplant"
            icon={<CalendarRange />}
            count={15}
            statusText="Bereit zum Start"
            statusColorClass="text-blue-500"
          />
          <EventCard
            title="In Umsetzung"
            icon={<ChartColumnIncreasing />}
            count={8}
            statusText="Aktiv und laufend"
            statusColorClass="text-emerald-500"
          />
          <EventCard
            title="Pausiert"
            icon={<Pause />}
            count={3}
            statusText="Warten auf Reaktivierung"
            statusColorClass="text-yellow-500"
          />
          <EventCard
            title="Abgeschlossen"
            icon={<Download />}
            count={20}
            statusText="Daten exportiert"
            statusColorClass="text-purple-500"
          />
        </div>
      </div>
    </div>
  )
}

export default ManagePage
