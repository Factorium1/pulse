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

  const surveys = await prisma.survey.findMany({
    where: {
      marketplace: true,
      creatorId: { not: userId },
    },
    select: {
      id: true,
      title: true,
      description: true,
      targetParticipants: true,
      _count: { select: { participants: true } },
    },
  })

  if (surveys.length === 0) {
    return { ok: true, message: 'No surveys found', surveys: [] }
  }

  return { ok: true, message: 'Surveys found', surveys }
}
