import { prisma } from '../../../../../../../prisma'
import { auth } from '../../../../../../../auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ManageClient from '@/components/features/manage/manage-client'
import { SurveyType } from '@prisma/client'

const ManagePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/login')
  }

  const surveysRaw = await prisma.survey.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      _count: {
        select: {
          participants: true,
        },
      },
    },
  })

  const surveys = surveysRaw.map((survey: { _count: { participants: number } }) => ({
    ...survey,
    participants: survey._count.participants,
  }))

  return <ManageClient data={surveys} />
}

export default ManagePage
