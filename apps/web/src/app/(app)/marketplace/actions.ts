'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../auth'
import { prisma } from '../../../../../../prisma'

export async function getSurveys() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  const surveys = prisma.survey.findMany({
    where: {
      marketplace: true,
      creatorId: {
        not: userId,
      },
    },
  })
  if (!surveys) {
    return { ok: true, message: 'No survey found' }
  }

  return { ok: true, message: 'Surveys found', surveys: surveys }
}
