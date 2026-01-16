import { AnswerValue } from '@/components/features/studies/surveys/manage-page'
import { Question } from '@prisma/client'
import { z } from 'zod'

export const QuestionSchema = z
  .object({
    id: z.string().uuid(),
    type: z.enum(['freetext', 'multiple-choice', 'single-choice', 'rating']),
    title: z.string().min(1, 'Question title is required'),
    description: z.string().optional(),
    answerChoices: z.number().int().min(1).max(5).optional(),
    questionChoices: z.number().int().min(2).max(5).optional(),
    question: z.array(z.string().min(1, 'Answer option is required')).optional(),
  })
  .strict()
  .superRefine((question, ctx) => {
    const isChoice = question.type === 'single-choice' || question.type === 'multiple-choice'

    if (!isChoice) {
      return
    }

    if (!question.answerChoices) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Answer choices are required for choice questions',
        path: ['answerChoices'],
      })
    }

    if (question.type === 'single-choice' && question.answerChoices !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Single choice questions must allow exactly one answer',
        path: ['answerChoices'],
      })
    }

    if (question.type === 'multiple-choice' && question.answerChoices !== undefined) {
      if (question.answerChoices < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Multiple choice questions must allow at least two answers',
          path: ['answerChoices'],
        })
      }
    }

    if (!question.questionChoices) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Number of options is required for choice questions',
        path: ['questionChoices'],
      })
    }

    const providedOptions = question.question ?? []
    if (question.questionChoices && providedOptions.length < question.questionChoices) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide text for each option',
        path: ['question'],
      })
    }
  })

export const BlockSchema = z
  .object({
    id: z.string().uuid(),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    questions: z.array(QuestionSchema).min(1, 'Each block needs at least one question'),
  })
  .strict()

const BaseSurveySchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    shortLabel: z.string().min(1, 'Short label is required'),
    emoji: z.string().min(1, 'Emoji is required'), // TODO: Enum for allowed emojis
    description: z.string().min(1, 'Description is required'),
    tags: z.array(z.string()).default([]),
    targetParticipants: z.number().int().min(1, 'At least one participant is required'),
    audience: z.string().optional(),
  })
  .strict()

export const ShortQuestionSchema = BaseSurveySchema.extend({
  type: z.literal('short'),
  questions: z.array(QuestionSchema).min(1, 'At least one question is required'),
  blocks: z.array(BlockSchema).max(0).optional(),
}).strict()

export const LongQuestionSchema = BaseSurveySchema.extend({
  type: z.literal('long'),
  blocks: z.array(BlockSchema).min(1, 'At least one question block is required'),
  questions: z.array(QuestionSchema).max(0).optional(),
}).strict()

export const SurveySchema = z.discriminatedUnion('type', [ShortQuestionSchema, LongQuestionSchema])

export const SurveyUpdateSchema = z.discriminatedUnion('type', [
  ShortQuestionSchema.extend({
    id: z.string().cuid(),
  }),
  LongQuestionSchema.extend({
    id: z.string().cuid(),
  }),
])

export function SchemaForQuestion(q: Question) {
  switch (q.type) {
    case 'TEXT': {
      return z.string().trim().min(1, 'Answer is required')
    }

    case 'MULTIPLE_CHOICE': {
      const maxAnswers = q.maxAnswers ?? q.options.length
      return z
        .array(z.string().min(1))
        .min(1, 'At least one option must be selected')
        .max(maxAnswers, `Select up to ${maxAnswers} options`)
        .refine((values) => values.every((v) => q.options.includes(v)), 'Invalid option selected')
    }

    case 'SINGLE_CHOICE': {
      return z
        .string()
        .min(1, 'Answer is required')
        .refine((value) => q.options.includes(value), 'Invalid option selected')
    }

    case 'SCALE':
    case 'RATING': {
      return z.number()
    }

    case 'AUDIO':
    case 'VIDEO':
    case 'IMAGE': {
      return z.string().min(1, 'Answer is required')
    }
  }

  return z.never()
}

export function CheckQuestionWithAnswers(q: Question[], a: AnswerValue[]) {
  if (q.length !== a.length) {
    return false
  }

  for (let i = 0; i < q.length; i += 1) {
    const question = q[i]
    const answer = a[i]

    switch (question.type) {
      case 'TEXT':
      case 'AUDIO':
      case 'VIDEO':
      case 'IMAGE': {
        if (typeof answer !== 'string' || answer.trim().length === 0) {
          return false
        }
        break
      }

      case 'MULTIPLE_CHOICE': {
        if (!Array.isArray(answer) || answer.length === 0) {
          return false
        }

        if (
          answer.some((value) => typeof value !== 'string' || !question.options.includes(value))
        ) {
          return false
        }

        if (question.maxAnswers !== null && question.maxAnswers !== undefined) {
          if (answer.length > question.maxAnswers) {
            return false
          }
        }
        break
      }

      case 'SINGLE_CHOICE': {
        if (typeof answer !== 'string' || !question.options.includes(answer)) {
          return false
        }
        break
      }

      case 'SCALE':
      case 'RATING': {
        if (typeof answer !== 'number' || !Number.isFinite(answer)) {
          return false
        }
        break
      }

      default: {
        return false
      }
    }
  }

  return true
}
