'use client'

import { useState } from 'react'
import QuestionCard from './question-card'

type QuestionType = {
  id: string
  type: 'freetext' | 'multiple-choice' | 'single-choice' | 'rating'
  title: string
  description?: string
  answerChoices?: number
  questionChoices?: number
  question?: string[]
}

const QuestionExecuter = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([
    { id: crypto.randomUUID(), type: 'freetext', title: '' },
  ])

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'freetext',
        title: '',
      },
    ])
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((question) => question.id !== id))
  }

  return (
    <div className="w-full flex-center flex-col gap-4 p-4 border border-border/70 rounded-lg bg-background/70">
      {questions.map((question) => (
        <QuestionCard key={question.id} />
      ))}
    </div>
  )
}

export default QuestionExecuter
