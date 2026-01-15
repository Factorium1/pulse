'use client'

import { Progress } from '@/components/ui/progress'
import { useMemo, useState } from 'react'
import { Question, QuestionType } from '@prisma/client'
import { useRouter } from 'next/navigation'
import TextQuestion from './text'
import MultipleChoiceQuestion from './multiple-choice'
import ScaleQuestion from './scale'
import RatingQuestion from './rating'
import AudioQuestion from './audio'
import VideoQuestion from './video'
import ImageQuestion from './image'
import SingleChoiceQuestion from './single-choice'

type AnswerValue = string | string[] | number | null

export type QuestionComponentProps<T extends AnswerValue> = {
  question: Question
  value: T
  onChange: (value: T) => void
}

const QUESTION_COMPONENTS: Record<QuestionType, QuestionComponent> = {
  TEXT: TextQuestion as QuestionComponent,
  MULTIPLE_CHOICE: MultipleChoiceQuestion as QuestionComponent,
  SINGLE_CHOICE: SingleChoiceQuestion as QuestionComponent,
  SCALE: ScaleQuestion as QuestionComponent,
  RATING: RatingQuestion as QuestionComponent,
  AUDIO: AudioQuestion as QuestionComponent,
  VIDEO: VideoQuestion as QuestionComponent,
  IMAGE: ImageQuestion as QuestionComponent,
}

type AnyQuestionComponentProps = {
  question: Question
  value: AnswerValue
  onChange: (value: AnswerValue) => void
}

type QuestionComponent = (props: AnyQuestionComponentProps) => React.ReactNode

const ManagePage = ({ questions }: { questions: Question[] }) => {
  const router = useRouter()

  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<AnswerValue[]>(() => Array(questions.length).fill(null))

  const total = questions.length
  const progress = total > 0 ? ((questionIndex + 1) / total) * 100 : 0

  const backHidden = questionIndex === 0
  const isLast = total > 0 && questionIndex === total - 1

  const question = questions[questionIndex]

  function handleNext() {
    if (!canGoNext) return

    if (isLast) {
      // TODO: await
      router.push('/studies')
      return
    }

    setQuestionIndex((i) => Math.min(i + 1, total - 1))
  }

  function handleBack() {
    if (questionIndex <= 0) return

    setQuestionIndex((i) => Math.max(i - 1, 0))
  }

  function handleChange(value: AnswerValue) {
    setAnswers((prev) => {
      const next = [...prev]
      next[questionIndex] = value
      return next
    })
  }

  const RenderQuestion = useMemo(() => {
    if (!question) return null
    return QUESTION_COMPONENTS[question.type]
  }, [question])

  if (!total) {
    return <div className="p-6">Keine Fragen vorhanden.</div>
  }

  if (!question) {
    return <div className="p-6">Ungültiger Fragenindex.</div>
  }

  function getDefaultAnswer(q: Question): AnswerValue {
    switch (q.type) {
      case 'MULTIPLE_CHOICE':
        return []
      case 'SCALE':
      case 'RATING':
        return 0
      case 'TEXT':
      case 'SINGLE_CHOICE':
        return ''
      default:
        return null
    }
  }

  function isAnswered(q: Question, v: AnswerValue): boolean {
    switch (q.type) {
      case 'TEXT':
      case 'SINGLE_CHOICE':
        return typeof v === 'string' && v.trim().length > 0
      case 'MULTIPLE_CHOICE':
        return Array.isArray(v) && v.length > 0
      case 'SCALE':
      case 'RATING':
        return typeof v === 'number'
      default:
        return v !== null
    }
  }

  const currentValue = answers[questionIndex] ?? getDefaultAnswer(question)
  const canGoNext = isAnswered(question, answers[questionIndex])

  return (
    <div className="w-full">
      <Progress value={progress} className="rounded-none md:rounded-full" />
      <div className="flex-center">
        <div className="flex-start bg-card rounded-md p-6 shadow-md mt-10 flex-col gap-4 w-full mx-10">
          <p className="text-primary font-semibold text-sm">
            Frage {Math.min(questionIndex + 1, total)} von {total}
          </p>
          {RenderQuestion ? (
            <RenderQuestion question={question} value={currentValue} onChange={handleChange} />
          ) : (
            <div className="text-sm text-destructive">
              Unbekannter Fragetyp: {String(question.type)}
            </div>
          )}

          <div className="flex-between w-full">
            <button
              onClick={() => handleBack()}
              className={`text-sm text-muted-foreground font-medium cursor-pointer border-2 px-6 py-2 rounded-md  ${backHidden ? 'invisible' : ''}`}
            >
              Zurück
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`px-6 py-2 rounded-md text-sm font-medium ${
                !canGoNext
                  ? 'cursor-not-allowed bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground cursor-pointer'
              }`}
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
