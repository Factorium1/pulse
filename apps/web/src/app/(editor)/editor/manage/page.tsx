import { prisma } from '../../../../../../../prisma'
import { auth } from '../../../../../../../auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ManageClient from '@/components/features/manage/manage-client'

const ManagePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/login')
  }

  const surveys = await prisma.survey.findMany({
    where: {
      creatorId: session.user.id,
    },
  })

  return <ManageClient data={surveys} />
}

export default ManagePage
