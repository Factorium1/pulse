import CreateSurveyPage from '@/components/features/create/create-page'
import { prisma } from '../../../../../../../../prisma'
import { auth } from '../../../../../../../../auth'
import { headers } from 'next/headers'
import { SurveyForm } from '@/types/props'

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

  const updateSurvey = async (data: SurveyForm) => {
    try {
      await prisma.survey.update({
        where: {
          id,
        },
        data: {
          title: data.title,
          shortLabel: data.shortLabel,
          emoji: data.emoji,
          description: data.description,
          tags: data.tags,
          targetParticipants: data.targetParticipants,
          audience: data.audience,
        },
      })
      return { ok: true, message: 'Survey updated successfully' }
    } catch (error) {
      return { ok: false, message: 'Error updating survey' }
    }
  }

  return <CreateSurveyPage survey={survey} />
}

export default EditPage
