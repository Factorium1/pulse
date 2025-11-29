'use client'

import { CheckCircle } from 'lucide-react'
import QuestionCard from './question-card'
import { QuestionProps } from '@/types/props'

const QuestionExecuter = ({
  questions,
  onRemoveQuestion,
  onChangeQuestion,
}: {
  questions: QuestionProps[]
  onRemoveQuestion: (id: string) => void
  onChangeQuestion: (id: string, updatedQuestion: QuestionProps) => void
}) => {
  return (
    <div className="w-full flex-center flex-col gap-4 p-4 border border-border/70 rounded-lg bg-background/70">
      {questions.length === 0 ? (
        <div className="flex-center flex-col gap-2 px-5 lg:px-20 py-10">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
          <p className="text-sm text-muted-foreground text-center">
            Es wurden noch keine Fragen hinzugefügt. Klicke auf "Frage hinzufügen", um zu beginnen
          </p>
        </div>
      ) : (
        questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index + 1}
            onRemove={() => onRemoveQuestion(question.id)}
            onChange={(updatedQuestion: QuestionProps) =>
              onChangeQuestion(question.id, updatedQuestion)
            }
          />
        ))
      )}
    </div>
  )
}

export default QuestionExecuter
