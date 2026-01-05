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

  const surveysRaw = await prisma.survey.findMany({
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
      application: true,
      participants: {
        where: { userId },
        select: { userId: true },
        take: 1,
      },
    },
  })

  // TODO: add types
  const surveys = surveysRaw
    .map((s) => ({
      ...s,
      participated: s.participants.length > 0,
      remaining: s.targetParticipants - s._count.participants,
    }))
    .sort((a, b) => {
      // User is participant
      if (a.participated !== b.participated) {
        return Number(a.participated) - Number(b.participated)
      }

      // Survey is full
      if (a.remaining <= 0 && b.remaining > 0) return 1
      if (a.remaining > 0 && b.remaining <= 0) return -1

      return 0
    })
    .map(({ participants, ...rest }) => rest)

  if (surveys.length === 0) {
    return { ok: true, message: 'No surveys found', surveys: [] }
  }

  return { ok: true, message: 'Surveys found', surveys }
}
