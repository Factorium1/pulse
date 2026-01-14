'use client'

import SingleChoice from './single-choice'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { Question } from '@prisma/client'

const ManagePage = ({ questions }: { questions: Question[] }) => {
  const [backHidden, setBackHidden] = useState<boolean>(false)
  const [next, setNext] = useState<boolean>(true)
  const [questionLength, setQuestionLength] = useState<number>(1)

  const total = questions.length
  const progress = (questionLength / total) * 100

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
              className={`text-sm text-muted-foreground font-medium cursor-pointer border-2 px-6 py-2 rounded-md ${backHidden ? 'invisible' : ''}`}
            >
              Zurück
            </button>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium cursor-pointer">
              {next ? 'Weiter' : 'Absenden'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePage
