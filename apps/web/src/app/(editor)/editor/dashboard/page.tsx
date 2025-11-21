import { Button } from '@/components/ui/button'
import { Download, Filter, Play } from 'lucide-react'

const EditorDashboardPage = () => {
  return (
    <div className="p-6 md:py-6 md:px-0">
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
    </div>
  )
}

export default EditorDashboardPage
