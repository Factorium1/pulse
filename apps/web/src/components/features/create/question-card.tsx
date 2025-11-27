'use client'

import { Button } from '@/components/ui/button'
import { Smartphone } from 'lucide-react'
import { useState } from 'react'

const QuestionCard = () => {
  const [questionType, setQuestionType] = useState('Freitext')

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'freetext':
        setQuestionType('Freitext')
        break
      case 'multiple-choice':
        setQuestionType('Multiple Choice')
        break
      case 'single-choice':
        setQuestionType('Single Choice')
        break
      case 'rating':
        setQuestionType('Bewertungsskala')
        break
      default:
        setQuestionType('Freitext')
    }
  }

  return (
    <div className="w-full flex-center flex-col gap-4 p-4 border border-border/70 rounded-lg bg-background/70">
      <div className="flex-between w-full">
        <div className="flex-center gap-4">
          <p className="text-muted-foreground text-xs">Frage 1</p>
          <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
            {questionType}
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
            // value={questionType}
            onChange={(e) => handleQuestionTypeChange(e)}
          >
            <option value="freetext">Freitext</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="single-choice">Single Choice</option>
            <option value="rating">Bewertungsskala</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
