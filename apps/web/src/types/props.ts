import type { IconType } from 'react-icons'
import type {
  BlockScheduleType,
  Prisma,
  QuestionType,
  Survey,
  SurveyStatus,
  SurveyType,
} from '@prisma/client'
import type { z } from 'zod'
import { BlockSchema, QuestionSchema, SurveySchema } from './rules'

export type CardProps = {
  icon?: IconType
  title: string
  description?: string
}

export type PricingCardProps = {
  price?: string
  title: string
  description?: string
  features: string[]
  icon?: IconType
  button: string
}

export type InputFieldProps = {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
}

export type QuestionProps = z.infer<typeof QuestionSchema>

export type QuestionBlockProps = z.infer<typeof BlockSchema>

export type SurveyDraft = z.infer<typeof SurveySchema>

export type SurveyForm = Survey

export type SurveyWithParticipants = Survey & {
  participants: number
}

export type SurveyWithRelations = Prisma.SurveyGetPayload<{
  include: {
    blocks: {
      include: {
        questions: true
      }
    }
    questions: true
  }
}>

export { BlockScheduleType, QuestionType, SurveyStatus, SurveyType }
