'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../../auth'
import { prisma } from '../../../../../../../../prisma'
import { Prisma } from '@prisma/client'

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
