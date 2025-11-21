import { Button } from '@/components/ui/button'
import { ArrowUpRight, Clock3, Download, Filter, Play } from 'lucide-react'

const EditorDashboardPage = () => {
  return (
    <div className="p-6 md:py-6 md:px-0 flex flex-col gap-6">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl">
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
        <div className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Live</span>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">24</p>
          <p className="text-xs text-emerald-500">Aktiv und antwortend</p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Geplant</span>
            <Clock3 className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">250</p>
          <p className="text-xs text-amber-500">Startbereit</p>
        </div>
      </div>
    </div>
  )
}

export default EditorDashboardPage
