'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../auth'
import { prisma } from '../../../../../../../prisma'

export async function getSurveys() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return 'Unauthorized'
  }

  try {
    const surveys = await prisma.surveyParticipation.findMany({
      where: {
        userId,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        survey: {
          select: {
            id: true,
            title: true,
            shortLabel: true,
            emoji: true,
          },
        },
      },
    })

    if (!surveys) {
      return 'No Surveys found'
    }

    return surveys
  } catch (err) {
    return String(err)
  }
}

export async function removeParticipation(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    const result = await prisma.surveyParticipation.updateMany({
      where: {
        id,
        userId,
        status: 'ACTIVE',
      },
      data: {
        status: 'DROPPED',
      },
    })

    if (!result || result.count === 0) {
      return { ok: false, message: 'Participation not found' }
    }

    return { ok: true }
  } catch (err) {
    return { ok: false, message: String(err) }
  }
}
