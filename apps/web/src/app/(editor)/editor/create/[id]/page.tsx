'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CheckCircle2,
  LayoutGrid,
  Minimize2,
  Plus,
  Smartphone,
  Sparkles,
  Tag,
  Target,
  Users2,
} from 'lucide-react'
import { useState } from 'react'

const CreateSurveyPage = () => {
  const [type, setType] = useState<'short' | 'long'>('short')
  function handleTypeChange(newType: 'short' | 'long') {
    setType(newType)
  }

  return (
    <div className="flex-center flex-col w-full p-4 gap-4">
      <div className="rounded-3xl border border-border/70 bg-gradient-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl w-full">
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

      <div className="w-full grid grid-cols-1 gap-6 items-start lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm flex-start flex-col gap-4">
          <div className="">
            <p className="text-xs uppercase text-muted-foreground tracking-widest">Grunddaten</p>
            <h2 className="text-xl font-semibold text-foreground">Survey Details</h2>
            <p className="text-sm text-muted-foreground">
              Titel, Beschreibung, Fragen & Optionen für dein Survey konfigurieren.
            </p>
          </div>
          <div className="w-full">
            <label htmlFor="titel" className="text-sm text-muted-foreground">
              Titel der Studie
            </label>
            <input
              type="text"
              id="titel"
              name="titel"
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              placeholder="z.B. Kundenzufriedenheitsumfrage Q2 2024"
            />
          </div>
          <div className="w-full">
            <label htmlFor="beschreibung" className="text-sm text-muted-foreground">
              Beschreibung
            </label>
            <textarea
              id="beschreibung"
              name="beschreibung"
              rows={4}
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              placeholder="Worum geht es, was erwartet die Teilnehmer?"
            />
          </div>
          <div className="w-full">
            <label htmlFor="suvey-typ" className="text-sm text-muted-foreground">
              Survey-Typ
            </label>
            <select
              id="survey-typ"
              name="survey-typ"
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as 'short' | 'long')}
            >
              <option value="short">Umfrage</option>
              <option value="long">Mehrtägige Studie</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex items-center justify-start gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <p className="text-muted-foreground">Tags</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Tags hinzufügen..."
                className="bg-transparent outline-none text-muted-foreground px-3 text-sm rounded-lg border border-border/70"
              />
              <Button variant="outline" size="sm" className="text-xs">
                <Plus className="h-4 w-4" />
                Hinzufügen
              </Button>
            </div>
            <div className="flex-center flex-wrap gap-2">
              <span className="flex-center gap-1 rounded-full border border-border/70 bg-muted/60 px-3 py-1 text-xs text-foreground font-semibold">
                Kundenzufriedenheit
                <span className="text-muted-foreground cursor-pointer">✕</span>
              </span>
            </div>
          </div>
          <div className="w-full grid gap-4 md:grid-cols-2">
            <div className="flex-start flex-col gap-2 rounded-xl border border-border/70 bg-background/80 p-4">
              <div className="flex-center flex-row gap-2">
                <Target className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">Ziel-Teilnehmer</p>
              </div>
              <Input
                type="number"
                placeholder="Anzahl der Teilnehmer"
                className="bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70 flex-1"
              />
              <p className="text-muted-foreground text-xs">
                Anzahl gplanter Teilnehmer für die Studie.
              </p>
            </div>
            <div className="flex-start flex-col gap-2 rounded-xl border border-border/70 bg-background/80 p-4">
              <div className="flex-center flex-row gap-2">
                <Users2 className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">Zielgruppe</p>
              </div>
              <Input
                type="text"
                placeholder="Beschreibung der Zielgruppe"
                className="bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70 flex-1"
              />
              <p className="rounded-full bg-muted/60 border border-border/70 px-3 py-1 text-xs">
                Deutschland
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-6 items-start lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm flex-start flex-col gap-4">
          <div className="flex-between w-full">
            <div className="">
              <p className="text-xs uppercase text-muted-foreground tracking-widest">Fragen</p>
              <h2 className="text-xl font-semibold text-foreground">Fragebogen</h2>
              <p className="text-sm text-muted-foreground">
                Titel, Beschreibung, Fragetyp & Optionen und Timing je Frage. Die aktive frage
                erscheint in der Vorschau.
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Plus className="h-4 w-4" />
              {type === 'short' ? 'Frage hinzufügen' : 'Block hinzufügen'}
            </Button>
          </div>
          {type === 'short' ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateSurveyPage
