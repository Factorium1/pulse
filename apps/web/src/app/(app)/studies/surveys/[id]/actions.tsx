'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../../auth'
import { prisma } from '../../../../../../../../prisma'
import { SurveyBlock } from '@prisma/client'

export type GetBlockResult =
  | { ok: true; block: SurveyBlock }
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
    })

    if (!block) {
      return { ok: false, message: 'Unauthorized' }
    }

    return { ok: true, block: block }
  } catch (err) {
    return { ok: false, message: 'Network Error', error: String(err) }
  }
}
