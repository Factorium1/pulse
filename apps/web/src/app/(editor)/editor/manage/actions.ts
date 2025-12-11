'use server'

import { auth } from '../../../../../../../auth'
import { headers } from 'next/headers'
import { prisma } from '../../../../../../../prisma'
import { SurveyStatus } from '@prisma/client'

export async function surveyState({
  id,
}: {
  id: string
}): Promise<{ ok: boolean; message: string; status?: SurveyStatus }> {
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

  if (survey.creatorId !== userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  if (survey.status === 'COMPLETED' || survey.status === 'ARCHIVED') {
    return { ok: false, message: 'Survey cannot change state' }
  }

  const nextStatus: SurveyStatus =
    survey.status === 'ACTIVE'
      ? 'PAUSED'
      : survey.status === 'PAUSED' || survey.status === 'PLANNED'
        ? 'ACTIVE'
        : survey.status

  try {
    await prisma.survey.update({
      where: {
        id,
      },
      data: {
        status: nextStatus,
      },
    })

    return {
      ok: true,
      message: 'Changed survey status',
      status: nextStatus,
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Could not change survey status',
    }
  }
}

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
