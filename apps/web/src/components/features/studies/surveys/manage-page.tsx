'use client'

import SingleChoice from './single-choice'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { Question } from '@prisma/client'
import { redirect } from 'next/navigation'

const ManagePage = ({ questions }: { questions: Question[] }) => {
  const [questionLength, setQuestionLength] = useState<number>(1)
  const [question, setQuestion] = useState<Question>(questions[questionLength - 1])

  const total = questions.length
  const progress = total > 0 ? (questionLength / total) * 100 : 0

  const backHidden = questionLength === 1
  const isLast = total > 0 && questionLength === total

  async function handleNext() {
    if (questionLength === total) {
      // await
      redirect('/studies')
    }

    setQuestion(questions[questionLength])
  }

  async function handleBack() {
    if (questionLength === 0) {
      return
    }

    setQuestion(questions[questionLength - 1])
  }

  return (
    <div className="w-full">
      <Progress value={progress} className="rounded-none md:rounded-full" />
      <div className="flex-center">
        <div className="flex-start bg-card rounded-md p-6 shadow-md mt-10 flex-col gap-4 w-full mx-10">
          <p className="text-primary font-semibold text-sm">
            Frage {questionLength} von {total}
          </p>
          <SingleChoice />
          <div className="flex-between w-full">
            <button
              onClick={() => handleNext()}
              className={`text-sm text-muted-foreground font-medium cursor-pointer border-2 px-6 py-2 rounded-md ${backHidden ? 'invisible' : ''}`}
            >
              Zurück
            </button>
            <button
              onClick={() => handleBack()}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              {isLast ? 'Absenden' : 'Weiter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePage
