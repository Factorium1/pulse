'use client'

import { Button } from '@/components/ui/button'
import { ApplicationType } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import { applicationSurvey, checkParticipation } from '@/app/(app)/marketplace/[id]/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  const [alreadyParticipating, setAlreadyParticipating] = useState<boolean | null>(null)

  const isFull = targetParticipants - participants <= 0

  const disabled = isFull || alreadyParticipating === true || alreadyParticipating === null

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await checkParticipation(id)
        if (cancelled) return
        setAlreadyParticipating(res.ok === false)
      } catch {
        if (cancelled) return
        setAlreadyParticipating(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [id])

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
      disabled={disabled}
      className={disabled ? 'cursor-not-allowed opacity-50' : ''}
      onClick={handleApplication}
    >
      {application === 'DIRECT' ? 'Direkt Teilnehmen' : 'Jetzt Bewerben'}{' '}
      <ArrowRight className="h-4 w-4" />
      {/* TODO: Bewerben moeglich machen ueber message system */}
    </Button>
  )
}

export default ApplyButton
