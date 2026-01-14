'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../../auth'
import { prisma } from '../../../../../../../../prisma'

export async function getBlock(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    const block = await prisma.surveyblock.findFirst({
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

    if (block.survey?.participants?.length < 0 || block === null) {
      return { ok: false, message: 'Unauthorized' }
    }

    return { ok: true, block: block }
  } catch (err) {
    return { ok: false, message: 'Network Error', error: String(err) }
  }
}
