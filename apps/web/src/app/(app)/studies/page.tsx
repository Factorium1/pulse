import { Fragment } from 'react'
import SurveyCard from '@/components/features/studies/survey-card'
import { getParticipantSurveys } from './actions'
import { BlockScheduleType } from '@prisma/client'

const StudiesPage = async () => {
  const res = await getParticipantSurveys()
  if (!res) {
    // TODO: Error handling und richtig pruefen ob response error war oder nicht
  }

  const surveys = Array.isArray(res) ? res : []

  const eventItems = surveys.flatMap((survey) =>
    (survey.blocks ?? [])
      .filter((block) => block.scheduleType === BlockScheduleType.EVENT_TRIGGERED)
      .map((block) => ({ survey, block })),
  )

  function getStudyStart(survey: any): Date | null {
    const startedAt = survey.participants?.[0]?.startedAt
    return startedAt ? new Date(startedAt) : null
  }

  function getExecuteAt(block: any, studyStart: Date | null): Date | null {
    if (block.scheduleType === BlockScheduleType.FIXED_DATETIME && block.fixedAt) {
      return new Date(block.fixedAt)
    }

    if (
      block.scheduleType === BlockScheduleType.RELATIVE_TO_START &&
      studyStart &&
      block.dayOffset != null &&
      block.timeOfDayMinutes != null
    ) {
      const d = new Date(studyStart)
      d.setDate(d.getDate() + block.dayOffset)
      d.setHours(0, 0, 0, 0)
      d.setMinutes(block.timeOfDayMinutes)
      return d
    }

    return null
  }

  type ScheduledItem = {
    survey: any
    block: any
    executeAt: Date | null
  }

  const scheduledItems: ScheduledItem[] = surveys.flatMap((survey) => {
    const studyStart = getStudyStart(survey)

    return (survey.blocks ?? [])
      .filter((block) => block.scheduleType !== BlockScheduleType.EVENT_TRIGGERED)
      .map((block) => ({
        survey,
        block,
        executeAt: getExecuteAt(block, studyStart),
      }))
  })

  const scheduledWithTime = scheduledItems.filter((item) => item.executeAt)
  const scheduledWithoutTime = scheduledItems.filter((item) => !item.executeAt)
  const scheduledSorted = scheduledWithTime.sort(
    (a, b) => a.executeAt!.getTime() - b.executeAt!.getTime(),
  )

  const startOfDay = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const today = startOfDay(new Date())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)

  const formatDateTime = (date: Date) =>
    new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)

  const labelForDate = (date: Date) => {
    if (isSameDay(date, today)) return 'HEUTE'
    if (isSameDay(date, tomorrow)) return 'MORGEN'
    return formatDate(date)
  }

  const scheduledFutureSorted = scheduledSorted.filter((item) => item.executeAt! >= today)

  const scheduledGroups = new Map<string, ScheduledItem[]>()
  scheduledFutureSorted.forEach((item) => {
    const label = labelForDate(item.executeAt!)
    const bucket = scheduledGroups.get(label) ?? []
    bucket.push(item)
    scheduledGroups.set(label, bucket)
  })

  if (scheduledWithoutTime.length > 0) {
    scheduledGroups.set('UNGEPLANT', scheduledWithoutTime)
  }

  const badgePalette = ['indigo', 'emerald', 'amber', 'rose', 'violet'] as const
  type BadgeColor = (typeof badgePalette)[number]

  const pickBadgeColor = (seed: string): BadgeColor => {
    let hash = 0
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) % badgePalette.length
    }
    return badgePalette[Math.abs(hash) % badgePalette.length]
  }

  const getBadgeName = (survey: any) => survey.tags?.[0] || 'Studie'
  const getBadgeEmoji = (survey: any) => survey.emoji || '📝'

  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl bg-linear-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md">
        <div className="h1-bold">Eingang</div>
        {/* TODO: Filter erstellen */}
        <p className="mt-1 text-primary-foreground/90">
          Alle offenen Aufgaben aus deinen Studien — filterbar & klar gruppiert. 📬✨
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card text-foreground px-6 py-4 shadow-md">
        <div className="h1-bold">So funktioniert’s</div>
        <p className="mt-1 text-muted-foreground">
          <span>Aufgaben sind planbare Umfragen mit Start/Ende.</span>
          <span className="block">
            Ereignis-Umfragen startest du selbst, sobald das Ereignis eintritt (z. B. nach einem
            Gespräch oder wenn du Stress wahrnimmst).
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {eventItems.length > 0 && (
          <Fragment>
            <p className="text-muted-foreground font-semibold col-span-full">BELIEBIG</p>
            {eventItems.map(({ survey, block }) => {
              const badgeName = getBadgeName(survey)
              return (
                <SurveyCard
                  id={survey.id}
                  key={`${survey.id}-${block.id}`}
                  title={survey.title}
                  badgeEmoji={getBadgeEmoji(survey)}
                  badgeName={badgeName}
                  badgeColor={pickBadgeColor(badgeName)}
                  sampling={true}
                  Info={block.title || 'Ereignis-Umfrage'}
                />
              )
            })}
          </Fragment>
        )}

        {Array.from(scheduledGroups.entries()).map(([label, items]) => (
          <Fragment key={label}>
            <p className="text-muted-foreground font-semibold col-span-full">{label}</p>
            {items.map(({ survey, block, executeAt }) => {
              const badgeName = getBadgeName(survey)
              return (
                <SurveyCard
                  id={survey.id}
                  key={`${survey.id}-${block.id}`}
                  title={survey.title}
                  badgeEmoji={getBadgeEmoji(survey)}
                  badgeName={badgeName}
                  badgeColor={pickBadgeColor(badgeName)}
                  Info={executeAt ? `am ${formatDateTime(executeAt)}` : undefined}
                />
              )
            })}
          </Fragment>
        ))}

        {eventItems.length === 0 && scheduledGroups.size === 0 && (
          <p className="text-muted-foreground col-span-full">Keine offenen Aufgaben.</p>
        )}
      </div>
    </div>
  )
}

export default StudiesPage
