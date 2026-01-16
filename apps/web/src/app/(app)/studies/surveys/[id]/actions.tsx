'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../../auth'
import { prisma } from '../../../../../../../../prisma'
import { Prisma } from '@prisma/client'
import { AnswerValue } from '@/components/features/studies/surveys/manage-page'
import { CheckQuestionWithAnswers } from '@/types/rules'

type SurveyBlockWithQuestions = Prisma.SurveyBlockGetPayload<{
  include: { questions: true; survey: { select: { title: true } } }
}>

export type GetBlockResult =
  | { ok: true; block: SurveyBlockWithQuestions }
  | { ok: false; message: string; error?: string }

export async function getBlock(id: string): Promise<GetBlockResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    const block = await prisma.surveyBlock.findFirst({
      where: {
        id,
        questions: {
          none: {
            answers: {
              some: {
                participation: {
                  userId,
                  status: 'ACTIVE',
                },
              },
            },
          },
        },
        survey: {
          participants: {
            some: {
              userId,
              status: 'ACTIVE',
            },
          },
        },
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        survey: {
          select: {
            title: true,
          },
        },
      },
    })

    if (!block) {
      return { ok: false, message: 'Unauthorized' }
    }

    const now = new Date()
    const fixed = new Date(block.fixedAt)

    const sameDay: boolean =
      fixed.getFullYear() === now.getFullYear() &&
      fixed.getMonth() === now.getMonth() &&
      fixed.getDate() === now.getDate()

    if (!sameDay || fixed > now) {
      return { ok: false, message: 'Unauthorized' }
    }

    return { ok: true, block: block }
  } catch (err) {
    return { ok: false, message: 'Network Error', error: String(err) }
  }
}

export async function sendAnswer(id: string, answers: AnswerValue[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    const blockResult = await getBlock(id)
    if (!blockResult.ok) {
      return { ok: false, message: blockResult.message }
    }

    const { block } = blockResult
    const valid = CheckQuestionWithAnswers(block.questions, answers)
    if (!valid) {
      return { ok: false, message: 'Invalid answers' }
    }

    const participation = await prisma.surveyParticipation.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        surveyId: block.surveyId,
      },
      select: {
        id: true,
      },
    })

    if (!participation) {
      return { ok: false, message: 'Unauthorized' }
    }

    const questionIds = block.questions.map((question) => question.id)
    const existingAnswer = await prisma.answer.findFirst({
      where: {
        participationId: participation.id,
        questionId: {
          in: questionIds,
        },
      },
      select: {
        id: true,
      },
    })

    if (existingAnswer) {
      return { ok: false, message: 'Answers already submitted' }
    }

    await prisma.answer.createMany({
      data: block.questions.map((question, index) => {
        const answer = answers[index]
        const value = typeof answer === 'string' ? answer : JSON.stringify(answer)
        return {
          participationId: participation.id,
          questionId: question.id,
          value,
        }
      }),
    })

    return { ok: true, message: 'Answers submitted' }
  } catch (err) {
    return { ok: false, message: 'Network Error', error: String(err) }
  }

  return { ok: false, message: 'Server error occured' }
}
