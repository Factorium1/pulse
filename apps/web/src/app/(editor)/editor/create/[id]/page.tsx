import { Button } from '@/components/ui/button'
import { CheckCircle2, LayoutGrid, Sparkles } from 'lucide-react'

const CreateSurveyPage = () => {
  return (
    <div className="flex-center flex-col w-full p-4 gap-4">
      <div className="rounded-3xl border border-border/70 bg-gradient-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Studien erstellen
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2">
              Konfiguriere Survey + Live-Preview
              <Sparkles className="h-6 w-6 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Nutze das Survey-Model (Titel, Beschreibung, Fragen, Optionen, Timing) und ergänze
              Tags sowie Ziel-Teilnehmer, um alles aus einem Flow zu pflegen.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <LayoutGrid className="h-4 w-4" />
              Vorlagen
            </Button>
            <Button size="sm" className="shadow-md">
              <CheckCircle2 className="h-4 w-4" />
              Entwurf sichern
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSurveyPage
