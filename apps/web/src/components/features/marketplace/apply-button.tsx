'use client'

import { Button } from '@/components/ui/button'
import { ApplicationType } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import { applicationSurvey } from '@/app/(app)/marketplace/[id]/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const ApplyButton = ({
  targetParticipants,
  participants,
  application,
  id,
}: {
  targetParticipants: number
  participants: number
  application: ApplicationType
  id: string
}) => {
  const router = useRouter()

  async function handleApplication() {
    try {
      const res = await applicationSurvey(id)
      handleRes(res)
    } catch {
      handleRes({ ok: false, message: 'Network Error' })
    }
  }

  function handleRes(res: { ok: boolean; message: string; error?: string }) {
    if (!res.ok) {
      toast.error(res.message)
      if (res.error) toast.error(res.error)
      return
    }
    toast.success(res.message)
    router.push('/marketplace')
  }

  return (
    <Button
      variant="ghost"
      size="default"
      className={`${targetParticipants - participants <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={() => handleApplication()}
    >
      {application === 'DIRECT' ? 'Direkt Teilnehmen' : 'Jetzt Bewerben'}{' '}
      <ArrowRight className="h-4 w-4" />
      {/* TODO: Bewerben moeglich machen ueber message system */}
    </Button>
  )
}

export default ApplyButton
