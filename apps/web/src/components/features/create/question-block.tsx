import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minimize2, Plus, Smartphone } from 'lucide-react'

const QuestionBlock = () => {
  return (
    <div className="w-full flex-center flex-col gap-4">
      <div className="rounded-lg border border-border/70 bg-background/70 p-6 text-center flex-center flex-col gap-4 w-full">
        <div className="flex-between w-full">
          <div className="flex-center gap-1 lg:gap-4 flex-wrap">
            <p className="text-muted-foreground text-md font-semibold">Block 1</p>
            <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
              24.12.2025
            </span>
            <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
              17:30 Uhr
            </span>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button variant="outline" size="sm" className="text-xs">
              <Plus className="h-4 w-4" />
              Frage hinzufügen
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Minimize2 className="h-4 w-4" />
              Minimieren
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 w-full">
          <div className="flex-start flex-col gap-1">
            <label htmlFor="block-datum" className="text-sm text-muted-foreground">
              Datum
            </label>
            <Input
              type="date"
              id="block-datum"
              name="block-datum"
              className="bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70"
            />
          </div>
          <div className="flex-start flex-col gap-1">
            <label htmlFor="block-uhrzeit" className="text-sm text-muted-foreground">
              Uhrzeit
            </label>
            <Input
              type="time"
              id="block-uhrzeit"
              name="block-uhrzeit"
              className="bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70"
            />
          </div>
        </div>
        <div className="w-full flex-center flex-col gap-4 p-4 border border-border/70 rounded-lg bg-background/70">
          <div className="flex-between w-full">
            <div className="flex-center gap-4">
              <p className="text-muted-foreground text-xs">Frage 1</p>
              <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
                Freitext
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              <Smartphone className="h-4 w-4" />
              In Vorschau
            </Button>
          </div>
          <input
            type="text"
            id="frage-titel"
            name="frage-titel"
            className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
            placeholder="z.B. Wie zufrieden sind Sie mit unserem Produkt?"
          />
          <textarea
            id="frage-beschreibung"
            name="frage-beschreibung"
            rows={2}
            className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
            placeholder="Optionale Beschreibung oder Anweisungen zur Frage"
          />
          <div className="w-full flex-center flex-col gap-2">
            <div className="text-sm text-muted-foreground w-full flex-start flex-col gap-2">
              <label htmlFor="frage-typ" className="text-xs text-muted-foreground">
                Fragetyp
              </label>
              <select
                id="frage-typ"
                name="frage-typ"
                className="rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              >
                <option value="freetext">Freitext</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="single-choice">Single Choice</option>
                <option value="rating">Bewertungsskala</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionBlock
