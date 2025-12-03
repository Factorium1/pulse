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
