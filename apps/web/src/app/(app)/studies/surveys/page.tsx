import SurveyCard from '@/components/ui/survey-card'

const SurveyPage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md">
        <div className="h1-bold">Eingang</div>
        {/* TODO: Filter erstellen */}
        <p className="mt-1 text-primary-foreground/90">
          Alle offenen Aufgaben aus deinen Studien — filterbar & klar gruppiert. 📬✨
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card text-foreground px-6 py-4 shadow-md">
        <div className="h1-bold">So funktioniert’s</div>
        <p className="mt-1 text-muted-foreground">
          <span>Beantworte jeden Tag die fuer den Tag anstehenden Umfragen</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

export default SurveyPage
