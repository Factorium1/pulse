'use client'

import { Button } from '@/components/ui/button'
import { Smartphone, Trash2 } from 'lucide-react'
import { QuestionProps } from '@/types/props'

const QuestionCard = ({
  question,
  onRemove,
  onChange,
}: {
  question: QuestionProps
  onRemove: () => void
  onChange: (updatedQuestion: QuestionProps) => void
}) => {
  const questionTypeLabel: Record<QuestionProps['type'], string> = {
    freetext: 'Freitext',
    'multiple-choice': 'Multiple Choice',
    'single-choice': 'Single Choice',
    rating: 'Bewertungsskala',
  }

  return (
    <div className="w-full flex-center flex-col gap-4 p-4 border border-border/70 rounded-lg bg-background/70">
      <div className="flex-between w-full">
        <div className="flex-center gap-4">
          <p className="text-muted-foreground text-xs">Frage 1</p>
          <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
            {[question.type]}
          </span>
        </div>
        <div className="flex-center gap-4">
          <Button variant="ghost" size="sm" className="text-xs">
            <Smartphone className="h-4 w-4" />
            In Vorschau
          </Button>
          <Button variant="outline" size="sm" className="text-xs" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
            Löschen
          </Button>
        </div>
      </div>
      <input
        type="text"
        id="frage-titel"
        name="frage-titel"
        value={question.title}
        onChange={(e) => onChange({ ...question, title: e.target.value as QuestionProps['title'] })}
        className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
        placeholder="z.B. Wie zufrieden sind Sie mit unserem Produkt?"
      />
      <textarea
        id="frage-beschreibung"
        name="frage-beschreibung"
        rows={2}
        value={question.description}
        onChange={(e) =>
          onChange({ ...question, description: e.target.value as QuestionProps['description'] })
        }
        className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
        placeholder="Optionale Beschreibung oder Anweisungen zur Frage"
      />
      <div className="w-full flex justify-start items-center gap-4 flex-row flex-wrap">
        <div className="text-sm text-muted-foreground flex-start flex-col gap-2">
          <label htmlFor="frage-typ" className="text-xs text-muted-foreground">
            Fragetyp
          </label>
          <select
            id="frage-typ"
            name="frage-typ"
            value={question.type}
            className="rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
            onChange={(e) =>
              onChange({ ...question, type: e.target.value as QuestionProps['type'] })
            }
          >
            <option value="freetext">Freitext</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="single-choice">Single Choice</option>
            <option value="rating">Bewertungsskala</option>
          </select>
        </div>
        {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
          <>
            <div className="text-sm text-muted-foreground flex-start flex-col gap-2">
              <label htmlFor="choice" className="text-xs text-muted-foreground">
                Antwort Möglichkeiten
              </label>
              <select
                id="choice"
                name="choice"
                value={question.answerChoices}
                onChange={(e) =>
                  onChange({
                    ...question,
                    answerChoices: parseInt(e.target.value) as QuestionProps['answerChoices'],
                  })
                }
                className="rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              >
                <option value="1">1 Antwort</option>
                <option value="2">2 Antworten</option>
                <option value="3">3 Antworten</option>
                <option value="4">4 Antworten</option>
                <option value="5">5 Antworten</option>
              </select>
            </div>
            <div className="text-sm text-muted-foreground flex-start flex-col gap-2">
              <label htmlFor="question-choices" className="text-xs text-muted-foreground">
                Anzahl Fragen
              </label>
              <select
                id="question-choices"
                name="question-choices"
                value={question.questionChoices}
                onChange={(e) =>
                  onChange({
                    ...question,
                    questionChoices: parseInt(e.target.value) as QuestionProps['questionChoices'],
                  })
                }
                className="rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              >
                <option value="2">2 Fragen</option>
                <option value="3">3 Fragen</option>
                <option value="4">4 Fragen</option>
                <option value="5">5 Fragen</option>
              </select>
            </div>
          </>
        )}
      </div>
      {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
        <div className="flex items-start justify-start flex-col w-full gap-3 p-4">
          <p className="text-muted-foreground text-sm">Fragen:</p>
          {[...Array(question.questionChoices)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              placeholder={`Antwortmöglichkeit ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
