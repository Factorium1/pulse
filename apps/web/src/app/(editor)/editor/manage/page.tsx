import { prisma } from '../../../../../../../prisma'
import { auth } from '../../../../../../../auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ManageClient from '@/components/features/manage/manage-client'
import type { SurveyWithParticipants } from '@/types/props'

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

  const surveys: SurveyWithParticipants[] = surveysRaw.map(({ _count, ...survey }) => ({
    ...survey,
    participants: _count.participants,
  }))

  return <ManageClient data={surveys} />
}

export default ManagePage
