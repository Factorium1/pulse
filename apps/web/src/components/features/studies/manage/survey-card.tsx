'use client'

import { LogOut } from 'lucide-react'
import { StudyBadge } from '../study-badge'
import { removeParticipation } from '@/app/(app)/studies/manage/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LeaveSurveyCard = ({
  badgeName,
  badgeEmoji,
  title,
  info,
  estimatedDuration,
  availableTo,
  participationId,
}: {
  badgeName: string
  badgeEmoji: 'info' | 'brain' | 'grow' | 'energy' | 'passion' | 'idea'
  title: string
  info: string
  estimatedDuration: number
  availableTo: string
  participationId: string
}) => {
  const router = useRouter()

  async function handleLeave() {
    const res = await removeParticipation(participationId)

    if (res.ok) {
      toast.success('Studie verlassen')
    } else {
      toast.error(res.message ?? 'Konnte Studie nicht verlassen')
    }

    router.push('/studies')
  }

  const Items = [
    info && <div>{info}</div>,
    estimatedDuration && (
      <div>
        <span className="">ca. </span> {estimatedDuration} Min
      </div>
    ),
    availableTo && (
      <div>
        <span className="">bis: </span> {availableTo}
      </div>
    ),
  ].filter(Boolean)
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm text-start">
      <div className="flex items-center justify-between">
        <StudyBadge name={badgeName} preset={badgeEmoji} />
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-all hover:bg-red-100 hover:border-red-300 cursor-pointer"
          onClick={() => handleLeave()}
        >
          <LogOut className="h-4 w-4" />
          Studie verlassen
        </button>
      </div>
      <p className="h3-bold">{title}</p>
      <div className="flex justify-start flex-row text-sm text-muted-foreground flex-wrap">
        {Items.map((item, index) => (
          <div key={index} className="flex-center flex-row">
            {item}
            {index < Items.length - 1 && <div className="mx-2 flex-center">•</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaveSurveyCard
