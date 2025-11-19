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
  type: string
  placeholder?: string
  required?: boolean
}
