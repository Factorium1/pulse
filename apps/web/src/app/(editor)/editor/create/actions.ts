'use server'

import { SurveySchema } from '@/types/rules'
import type { QuestionBlockProps, QuestionProps, SurveyDraft } from '@/types/props'
import { auth } from '../../../../../../../auth'
import { headers } from 'next/headers'
import { prisma } from '../../../../../../../prisma'
import { BlockScheduleType, QuestionType, SurveyType } from '@prisma/client'

const questionTypeMap: Record<QuestionProps['type'], QuestionType> = {
  freetext: QuestionType.TEXT,
  'multiple-choice': QuestionType.MULTIPLE_CHOICE,
  'single-choice': QuestionType.SINGLE_CHOICE,
  rating: QuestionType.RATING,
}

function mapQuestionToPrisma(question: QuestionProps, order: number) {
  const isChoiceQuestion = question.type === 'multiple-choice' || question.type === 'single-choice'
  const options = isChoiceQuestion ? (question.question ?? []) : []
  const maxAnswers = isChoiceQuestion
    ? (question.answerChoices ?? (question.type === 'single-choice' ? 1 : undefined))
    : undefined

  return {
    title: question.title,
    description: question.description,
    type: questionTypeMap[question.type],
    options,
    maxAnswers,
    order,
  }
}

function parseBlockDateTime(date: string, time: string) {
  const trimmedDate = date?.trim()
  const trimmedTime = time?.trim()
  if (!trimmedDate) {
    return null
  }

  const timeMatch = trimmedTime?.match(/(\d{1,2}):(\d{2})/)
  const hours = timeMatch ? timeMatch[1].padStart(2, '0') : '00'
  const minutes = timeMatch ? timeMatch[2].padStart(2, '0') : '00'

  const dotMatch = trimmedDate.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  const slashMatch = trimmedDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)

  let isoDate: string | null = null
  if (dotMatch) {
    const [, day, month, year] = dotMatch
    isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  } else if (slashMatch) {
    const [, month, day, year] = slashMatch
    isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  if (!isoDate) {
    const fallbackDate = new Date(`${trimmedDate} ${trimmedTime ?? ''}`)
    return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate
  }

  const candidate = new Date(`${isoDate}T${hours}:${minutes}:00`)
  return Number.isNaN(candidate.getTime()) ? null : candidate
}

function mapBlockToPrisma(block: QuestionBlockProps, blockIndex: number) {
  const fixedAt = parseBlockDateTime(block.date, block.time)
  const title = `${block.date} ${block.time}`.trim()

  return {
    index: blockIndex,
    title: title.length ? title : undefined,
    scheduleType: BlockScheduleType.FIXED_DATETIME,
    fixedAt: fixedAt ?? undefined,
    questions: {
      create: block.questions.map((question, questionIndex) =>
        mapQuestionToPrisma(question, questionIndex),
      ),
    },
  }
}

export async function createSurvey(data: SurveyDraft) {
  try {
    const validationResult = SurveySchema.safeParse(data)
    if (!validationResult.success) {
      return { ok: false, message: 'Validation failed', errors: validationResult.error.flatten }
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { ok: false, message: 'Unauthorized' }
    }

    const validData = validationResult.data

    const surveyData = {
      title: validData.title,
      shortLabel: validData.shortLabel,
      emoji: validData.emoji,
      description: validData.description,
      tags: validData.tags,
      targetParticipants: validData.targetParticipants,
      audience: validData.audience,
      type: validData.type === 'short' ? SurveyType.SHORT : SurveyType.LONG,
      creatorId: userId,
      questions:
        validData.type === 'short'
          ? {
              create: validData.questions.map((question: QuestionProps, index: number) =>
                mapQuestionToPrisma(question, index),
              ),
            }
          : undefined,
      blocks:
        validData.type === 'long'
          ? {
              create: validData.blocks.map((block: QuestionBlockProps, blockIndex: number) =>
                mapBlockToPrisma(block, blockIndex),
              ),
            }
          : undefined,
    }

    const createdSurvey = await prisma.survey.create({
      data: surveyData,
      include: {
        questions: true,
        blocks: {
          include: {
            questions: true,
          },
        },
      },
    })

    return { ok: true, message: 'Survey create successfully', data: createdSurvey }
  } catch (error) {
    return { ok: false, message: 'Error creating survey', error: (error as Error).message }
  }
}
