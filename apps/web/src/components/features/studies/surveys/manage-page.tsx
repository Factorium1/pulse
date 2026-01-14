'use client'

import SingleChoice from './single-choice'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { Question } from '@prisma/client'
import { useRouter } from 'next/router'

const ManagePage = ({ questions }: { questions: Question[] }) => {
  const router = useRouter()

  const [questionIndex, setQuestionIndex] = useState(0)

  const total = questions.length
  const progress = total > 0 ? ((questionIndex + 1) / total) * 100 : 0

  const backHidden = questionIndex === 0
  const isLast = total > 0 && questionIndex === total - 1

  const question = questions[questionIndex]

  function handleNext() {
    if (isLast) {
      // await
      router.push('/studies')
      return
    }

    setQuestionIndex((i) => Math.min(i + 1, total - 1))
  }

  function handleBack() {
    setQuestionIndex((i) => Math.max(i - 1, 0))
  }

  return (
    <div className="w-full">
      <Progress value={progress} className="rounded-none md:rounded-full" />
      <div className="flex-center">
        <div className="flex-start bg-card rounded-md p-6 shadow-md mt-10 flex-col gap-4 w-full mx-10">
          <p className="text-primary font-semibold text-sm">
            Frage {Math.min(questionIndex + 1, total)} von {total}
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
