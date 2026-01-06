'use server'

import { headers } from 'next/headers'
import { auth } from '../../../../../../../auth'
import { prisma } from '../../../../../../../prisma'
import { ApplicationType } from '@/types/props'
import { ParticipationStatus, SurveyStatus, SurveyType } from '@prisma/client'

export async function getSurvey(id: string) {
  if (!id) {
    return { ok: false, message: 'Missing survey id' }
  }

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
        status: {
          in: [SurveyStatus.ACTIVE, SurveyStatus.PLANNED, SurveyStatus.PAUSED],
        },
      },
      select: {
        title: true,
        shortLabel: true,
        emoji: true,
        description: true,
        tags: true,
        targetParticipants: true,
        _count: { select: { participants: true } },
        application: true,
        status: true,
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

export async function applicationSurvey(id: string) {
  if (!id) {
    return { ok: false, message: 'Missing survey id' }
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const survey = await tx.survey.findUnique({
        where: { id },
        select: {
          id: true,
          marketplace: true,
          application: true,
          targetParticipants: true,
          _count: { select: { participants: true } },
        },
      })

      if (!survey || !survey.marketplace) return { ok: false, message: 'Survey not available' }
      if (survey.application !== ApplicationType.DIRECT) {
        return { ok: false, message: 'Application required' }
      }

      if (survey.type === SurveyType.LONG) {
        const activeLongCount = await tx.surveyParticipation.count({
          where: {
            userId,
            status: ParticipationStatus.ACTIVE,
            survey: { type: SurveyType.LONG },
          },
        })

        if (activeLongCount >= 5) {
          return { ok: false, message: 'You already participate in 5 active long surveys' }
        }
      }

      const existingParticipation = await tx.surveyParticipation.findFirst({
        where: { surveyId: id, userId },
        select: { id: true },
      })

      if (existingParticipation) {
        return { ok: false, message: 'Already participating' }
      }

      const target = survey.targetParticipants ?? 0
      const current = survey._count.participants

      if (target > 0 && current >= target) {
        return { ok: false, message: 'Survey is full' }
      }

      await tx.surveyParticipation.create({
        data: {
          surveyId: id,
          userId,
        },
      })

      return { ok: true, message: 'Joined survey' }
    })

    return result
  } catch (err) {
    return { ok: false, message: 'Network Error', error: String(err) }
  }
}

export async function checkParticipation(surveyId: string) {
  if (!surveyId) return { ok: false, message: 'Missing surveyId' }

  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id
  if (!userId) return { ok: false, message: 'Unauthorized' }

  const existing = await prisma.surveyParticipation.findFirst({
    where: { surveyId, userId },
    select: { id: true },
  })

  if (existing) return { ok: false, message: 'Already participating' }

  return { ok: true, message: 'Not participating yet' }
}

//Survey side muss geprueft werden ob studie voll ist wenn man teilnehmen will und muss dann verhindert werden
