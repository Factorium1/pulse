'use server'

import CreateSurveyPage from '@/components/features/create/create-page'
import { prisma } from '../../../../../../../../prisma'
import { auth } from '../../../../../../../../auth'
import { headers } from 'next/headers'
import { SurveyBlock } from '@prisma/client'

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  const survey = await prisma.survey.findFirst({
    where: {
      id,
      creatorId: userId,
    },
  })

  if (survey.type === 'SHORT') {
    const questions = await prisma.question.findMany({
      where: {
        surveyId: id,
      },
    })

    return <CreateSurveyPage survey={survey} questionsData={questions} />
  } else {
    const blocks = await prisma.surveyBlock.findMany({
      where: {
        surveyId: id,
      },
      include: {
        questions: true,
      },
    })

    return <CreateSurveyPage survey={survey} blocks={blocks} />
  }
}

export default EditPage
