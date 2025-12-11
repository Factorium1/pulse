'use server'

import { auth } from '../../../../../../../auth'
import { headers } from 'next/headers'
import { prisma } from '../../../../../../../prisma'

export async function deleteSurvey({
  id,
}: {
  id: string
}): Promise<{ ok: boolean; message: string }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  const survey = await prisma.survey.findUnique({
    where: {
      id: id,
    },
  })

  if (!survey) {
    return { ok: false, message: 'Survey not found' }
  }

  console.log(survey)

  if (survey.creatorId !== userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    await prisma.survey.delete({
      where: {
        id: id,
      },
    })

    return {
      ok: true,
      message: 'Survey deleted successfully',
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Could not delete survey',
    }
  }
}
