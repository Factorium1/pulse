import { IconType } from 'react-icons'

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

export type QuestionProps = {
  id: string
  type: 'freetext' | 'multiple-choice' | 'single-choice' | 'rating'
  title: string
  description?: string
  answerChoices?: number
  questionChoices?: number
  question?: string[]
}

export type QuestionBlockProps = {
  id: string
  date: string
  time: string
  questions: QuestionProps[]
}

export type SurveyDraft = {
  title: string
  shortLabel: string
  emoji: string
  description: string
  type: 'short' | 'long'
  tags: string[]
  targetParticipants: number
  audience: string
  questions: QuestionProps[]
  blocks: QuestionBlockProps[]
}

export enum BlockScheduleType {
  FIXED_DATETIME = 'FIXED_DATETIME',
  RELATIVE_TO_START = 'RELATIVE_TO_START',
  EVENT_TRIGGERED = 'EVENT_TRIGGERED',
}

export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = ' SINGLE_CHOICE',
  SCALE = 'SCALE',
  RATING = 'RATING',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

export enum SurveyType {
  SHORT = 'SHORT',
  LONG = 'LONG',
}
