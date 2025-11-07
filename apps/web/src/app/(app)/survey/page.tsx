import SurveyCard from '@/components/ui/survey-card'

const SurveyPage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md">
        <div className="h1-bold">Umfragen - Eingang</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col">
            <div className="h2-bold">Umfrage</div>
            <span className="text-sm text-muted-foreground">Umfragen sind zeitlich begrenzt</span>
          </div>

          <SurveyCard
            title="Mitarbeiterzufriedenheit"
            availableFrom="01.01.2023"
            availableTo="31.01.2023"
            estimatedDuration="15min"
            surveyID="mitarbeiterzufriedenheit"
          />

          <SurveyCard
            title="Gedaechnis im Alltag"
            availableFrom="01.01.2023"
            availableTo="31.01.2023"
            surveyID="gedaechtnis-im-alltag"
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col">
            <div className="h2-bold">Eventbasierte Umfrage</div>
            <span className="text-sm text-muted-foreground">
              Sie starten diese kurzen Umfragen selbst, sobald das Ereignis eintritt.
            </span>
            <div className="mt-3 rounded-lg bg-secondary border border-border p-3 text-sm text-secondary-foreground">
              Beispiel: „Nach einem Kundengespräch“ oder „wenn Sie gerade Stress empfinden“ –
              Sampling öffnen und starten.
            </div>
          </div>

          <SurveyCard
            title="Ablenkung durch Handy Nutzung"
            samplingFrom="15:00"
            samplingTo="15:30 Uhr"
            surveyID="ablenkung-durch-handy-nutzung"
          />

          <SurveyCard
            title="Stress durch die Arbeit"
            samplingFrom="15:00"
            samplingTo="15:30 Uhr"
            surveyID="stress-durch-die-arbeit"
          />
        </div>
      </div>
    </div>
  )
}

export default SurveyPage
