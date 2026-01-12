'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../auth'
import { prisma } from '../../../../../../prisma'
import { SurveyType } from '@prisma/client'

export async function getParticipantSurveys() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return 'Unauthorized'
  }

  try {
    const surveys = await prisma.survey.findMany({
      where: {
        type: SurveyType.LONG,
        participants: {
          some: {
            userId,
            status: 'ACTIVE',
          },
        },
      },
      select: {
        title: true,
        shortLabel: true,
        emoji: true,
        surveyBlock: true,
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
