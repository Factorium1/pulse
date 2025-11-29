'use client'

import { useState } from 'react'
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
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onRemove={() => onRemoveQuestion(question.id)}
          onChange={(updatedQuestion: QuestionProps) =>
            onChangeQuestion(question.id, updatedQuestion)
          }
        />
      ))}
    </div>
  )
}

export default QuestionExecuter
