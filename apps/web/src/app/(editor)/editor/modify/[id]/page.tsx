import CreateSurveyPage from '@/components/features/create/create-page'
import { prisma } from '../../../../../../../../prisma'
import { auth } from '../../../../../../../../auth'
import { headers } from 'next/headers'

const EditPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return { ok: false, message: 'Unauthorized' }
  }

  const survey = await prisma.survey.findFirst({
    where: {
      id: params.id,
      creatorId: userId,
    },
  })

  const updateSurvey = async (data: any) => {
    try {
      await prisma.survey.update({
        where: {
          id: params.id,
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
