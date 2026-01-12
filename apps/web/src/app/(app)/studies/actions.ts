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
    const surveys = prisma.survey.findMany({
      where: {
        surveyParticipations: {
          userId,
          status: 'ACTIVE',
          type: SurveyType.LONG,
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
