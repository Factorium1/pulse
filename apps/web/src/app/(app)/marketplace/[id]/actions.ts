'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../auth'
import { prisma } from '../../../../../../../prisma'

export async function getSurvey(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    const survey = await prisma.survey.findFirst({
      where: {
        id,
        marketplace: true,
      },
      select: {
        title: true,
        shortLabel: true,
        emoji: true,
        description: true,
        tags: true,
      },
    })

    if (!survey) {
      return { ok: false, message: 'No survey found' }
    }

    return { ok: true, survey }
  } catch (err) {
    return { ok: false, message: 'Network Error', error: String(err) }
  }
}
