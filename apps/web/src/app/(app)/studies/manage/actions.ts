import { headers } from 'next/headers'
import { auth } from '../../../../../../../auth'
import { prisma } from '../../../../../../../prisma'

export async function getSurveys() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = session?.user?.id
  if (!userId) {
    return 'Unauthorized'
  }

  try {
    const surveys = await prisma.survey.findMany({
      where: {
        participants: {
          some: {
            userId,
            status: 'ACTIVE',
          },
        },
      },
      select: {
        id: true,
        title: true,
        shortLabel: true,
        emoji: true,
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
