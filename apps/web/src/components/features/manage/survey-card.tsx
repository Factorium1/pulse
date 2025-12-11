'use client'

import { Button } from '@/components/ui/button'
import StatusPill from '../editor-dashboard/status-pill'
import {
  ArrowUpRight,
  Bell,
  ChartColumnIncreasing,
  Download,
  Pause,
  PenBox,
  Play,
  Trash,
  Trash2,
  AlertTriangle,
  Share,
  Link,
} from 'lucide-react'
import type { SurveyStatus, SurveyWithParticipants } from '@/types/props'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type SurveyCardProps = {
  data: SurveyWithParticipants
  onDeleteSurvey: (input: { id: string }) => Promise<{ ok: boolean; message: string }>
  onSurveyState: (input: {
    id: string
  }) => Promise<{ ok: boolean; message: string; status?: SurveyStatus }>
}

const SurveyCard = ({ data: survey, onDeleteSurvey, onSurveyState }: SurveyCardProps) => {
  const [showDeleteInfo, setShowDeleteInfo] = useState<boolean>(false)
  const [showShareInfo, setShowShareInfo] = useState<boolean>(false)

  const isCompletedOrArchived = () => {
    return survey.status === 'COMPLETED' || survey.status === 'ARCHIVED'
  }

  const updatedDate = new Date(survey.updatedAt).toLocaleString('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${survey.id}`
  const router = useRouter()

  return (
    <div className="relative rounded-2xl border border-border/60 bg-muted/80 p-5 text-sm shadow-xs w-full flex flex-col gap-4 overflow-hidden">
      {showDeleteInfo && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/90 backdrop-blur-sm border border-destructive/40 rounded-2xl">
          <div className="flex flex-col items-center gap-2 px-6 text-center">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-wide">Studie löschen</p>
            </div>
            <p className="text-base text-foreground">
              Bist du sicher, dass du die Studie{' '}
              <span className="font-semibold">{survey.title}</span> löschen möchtest?
            </p>
            <p className="text-xs text-muted-foreground">
              Diese Aktion kann in der aktuellen Version nicht rückgängig gemacht werden.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/60 backdrop-blur cursor-pointer"
              onClick={() => setShowDeleteInfo(false)}
            >
              Abbrechen
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                onDeleteSurvey({ id: survey.id })
              }}
            >
              <Trash2 className="h-4 w-4" />
              Endgültig löschen
            </Button>
          </div>
        </div>
      )}
      {showShareInfo && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/90 backdrop-blur-sm border border-destructive/40 rounded-2xl">
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <div className="flex flex-row flex-center gap-2">
              <Share className="h-4 w-4" />
              <p className="text-sm font-semibold tracking-wide">Studie fuer Teilnehmer teilen</p>
            </div>
            <div
              className="flex flex-row gap-2 items-center justify-center cursor-pointer"
              onClick={async () => {
                await navigator.clipboard.writeText(url)
                toast.success('Link kopiert!')
              }}
            >
              <span>{url}</span>
              <Link className="h-4 w-4" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/60 backdrop-blur cursor-pointer"
              onClick={() => setShowShareInfo(false)}
            >
              Abbrechen
            </Button>
          </div>
        </div>
      )}

      <div className="flex-center">
        <div className="flex justify-center align-center flex-col gap-2 lg:flex-row lg:justify-between w-full items-center sm:items-start">
          <div className="flex-center gap-2">
            <StatusPill status={survey.status} />
            <p className="text-base font-semibold text-foreground">{survey.title}</p>
            <p
              className="rounded-full px-3 py-1 border border-border/60 bg-background/80 font-medium text-xs cursor-pointer"
              onClick={async () => {
                await navigator.clipboard.writeText(url)
                toast.success('Link kopiert!')
              }}
            >
              {survey.id}
            </p>
          </div>
          <div className="flex items-center justify-start md:items-center md:justify-center flex-wrap gap-2">
            {/* TODO: Implement Logic for Buttons */}
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <ChartColumnIncreasing className="h-4 w-4" />
              Stats
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/60 backdrop-blur cursor-pointer"
              onClick={() => {
                router.push(`/editor/modify/${survey.id}`)
              }}
            >
              <PenBox className="h-4 w-4" />
              Editieren
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Teilnehmende</p>
          <p className="text-lg font-semibold text-foreground">{survey.participants}</p>
          <p className="text-xs text-muted-foreground">Ziel {survey.targetParticipants}</p>
        </div>
        {/* TODO: implement Beantwortungszeit */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Ø Beantwortungszeit</p>
          <p className="text-lg font-semibold text-foreground">3min 12s</p>
          <p className="text-xs text-muted-foreground">Letzte Woche: 2min 50s</p>
        </div>
        {/* TODO: implement Reminder Erfolgsquote */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Reminder Erfolgsquote</p>
          <p className="text-lg font-semibold text-foreground">52%</p>
          <p className="text-xs text-muted-foreground">Letzte Woche: 47%</p>
        </div>
        {/* TODO: implement Abschlussquote */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <p className="text-xs text-muted-foreground">Abschlussquote</p>
          <p className="text-lg font-semibold text-foreground">64%</p>
          <p className="text-xs text-muted-foreground">Gesamte Studie</p>
        </div>
      </div>

      <div className="flex items-start flex-col gap-2 md:flex-row md:gap-0 md:items-center md:justify-between">
        <div className="flex-start flex-col">
          <p className="font-semibold text-foreground">{`Letzte Aktivität: ${updatedDate} `}</p>
          <p className="text-xs text-muted-foreground">Letzte Änderung am Studiendesign</p>
        </div>
        <div className="flex-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs cursor-pointer ${isCompletedOrArchived() ? 'hidden' : ''}`}
            onClick={() => onSurveyState({ id: survey.id })}
          >
            {survey.status === 'ACTIVE' ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={survey.status !== 'ACTIVE'}
            className="text-xs cursor-pointer"
            onClick={() => setShowShareInfo(true)}
          >
            Freigeben
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs cursor-pointer"
            onClick={() => setShowDeleteInfo(true)}
          >
            Loeschen <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SurveyCard
