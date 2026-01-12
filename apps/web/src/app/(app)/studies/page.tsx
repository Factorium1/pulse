import SurveyCard from '@/components/features/studies/survey-card'
import { getParticipantSurveys } from './actions'
import { BlockScheduleType } from '@prisma/client'

const StudiesPage = async () => {
  const res = await getParticipantSurveys()
  if (!res) {
    // TODO: Error handling und richtig pruefen ob response error war oder nicht
  }

  const surveys = Array.isArray(res) ? res : []

  const eventBlocks = surveys
    .flatMap((survey) => survey.blocks)
    .filter((block) => block.scheduleType === BlockScheduleType.EVENT_TRIGGERED)

  const blocks = surveys
    .flatMap((survey) => survey.blocks)
    .filter((block) => block.scheduleType !== BlockScheduleType.EVENT_TRIGGERED)

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

  function sortBlocks(survey: any) {
    const studyStart = getStudyStart(survey)

    return (survey.blocks ?? []).slice().sort((a: any, b: any) => {
      const ax = getExecuteAt(a, studyStart)
      const bx = getExecuteAt(b, studyStart)

      // Blöcke ohne berechenbare Zeit ans Ende
      if (!ax && !bx) return 0
      if (!ax) return 1
      if (!bx) return -1

      return ax.getTime() - bx.getTime()
    })
  }

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
        <p className="text-muted-foreground font-semibold col-span-full">BELIEBIG</p>
        <SurveyCard
          title="Schlafprotokoll"
          slug="schlafprotokoll"
          estimatedDuration="5min"
          badgeEmoji="😴"
          badgeName="Schlaf"
          badgeColor="violet"
          samplingLimit={1}
          sampling={true}
          Info="Starte, sobald du aufwachst"
        />

        <SurveyCard
          title="Kaffee & Energie"
          slug="kaffee-und-energie"
          estimatedDuration="5min"
          badgeEmoji="☕"
          badgeName="Koffein"
          badgeColor="emerald"
          samplingLimit={3}
          sampling={true}
          Info="Protokolliere nach jedem Kaffee-Konsum"
        />

        <p className="text-muted-foreground font-semibold col-span-full">HEUTE</p>
        <SurveyCard
          title="Mitarbeiterzufriedenheit"
          availableTo="31.01.2023"
          estimatedDuration="15min"
          slug="mitarbeiterzufriedenheit"
          badgeEmoji="💼"
          badgeName="Arbeitsalltag"
          badgeColor="amber"
        />

        <SurveyCard
          title="Gedaechtnis im Alltag"
          availableTo="31.01.2025"
          slug="gedaechtnis-im-alltag"
          estimatedDuration="10min"
          badgeEmoji="🧠"
          badgeName="Gedächtnis"
          badgeColor="indigo"
        />

        <p className="text-muted-foreground font-semibold col-span-full">MORGEN</p>
        <SurveyCard
          title="Stress im Alltag"
          availableTo="01.02.2026"
          slug="stress-im-alltag"
          estimatedDuration="15min"
          badgeEmoji="😰"
          badgeName="Stress"
          badgeColor="rose"
        />
      </div>
    </div>
  )
}

export default StudiesPage
