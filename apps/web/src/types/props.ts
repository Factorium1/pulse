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
