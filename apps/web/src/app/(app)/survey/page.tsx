import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { FaClockRotateLeft } from 'react-icons/fa6'
import Link from 'next/link'

const SurveyPage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md">
        <div className="h1-bold">Umfragen</div>
        <p className="mt-1 text-primary-foreground/90">
          Beantworte aktuelle Umfragen und behalte den Überblick.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col">
            <div className="h2-bold">Umfrage</div>
            <span className="text-sm text-muted-foreground">Umfragen sind zeitlich begrenzt</span>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-6 text-center">
            <p className="h3-bold">„Mitarbeiterzufriedenheit“</p>
            <div className="mt-2 flex-center flex-col gap-1">
              <div className="flex-center gap-2">
                <p className="text-sm text-muted-foreground">Verfuegbar:</p>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  <FaCalendarAlt aria-hidden />
                  01.01.2023 – 31.01.2023
                </span>
              </div>
              <div className="flex-center gap-2">
                <p className="text-sm text-muted-foreground">Geschätzte Dauer:</p>
                <span className="flex-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  <FaClockRotateLeft aria-hidden />
                  15min
                </span>
              </div>
            </div>
            <Link
              href="/survey/mitarbeiterzufriedenheit"
              aria-label="Umfrage starten"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Umfrage starten
              <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card p-6 text-center">
            <p className="h3-bold">„Gedaechnis im Alltag“</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 mt-2 text-sm font-medium text-muted-foreground">
              <FaCalendarAlt aria-hidden />
              01.01.2023 – 31.01.2023
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Die Umfrage ist im oben genannten Zeitraum verfügbar.
            </p>
            <Link
              href="/survey/gedaechtnis-im-alltag"
              aria-label="Umfrage starten"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Umfrage starten
              <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
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
          <div className="mt-4 rounded-xl border border-border bg-card p-6 text-center">
            <p className="h3-bold">„Ablenkung durch Handy Nutzung“</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 mt-2 text-sm font-medium text-muted-foreground">
              <FaClock aria-hidden />
              15:00 – 15:30 Uhr
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Die selbst Umfrage ist im oben genannten Zeitraum verfügbar.
            </p>
            <Link
              href="/survey/ablenkung-durch-handy-nutzung"
              aria-label="Umfrage starten"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Umfrage starten
              <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card p-6 text-center">
            <p className="h3-bold">„Stress durch die Arbeit“</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 mt-2 text-sm font-medium text-muted-foreground">
              <FaClock aria-hidden />
              15:00 – 15:30 Uhr
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Die selbst Umfrage ist im oben genannten Zeitraum verfügbar.
            </p>
            <Link
              href="/survey/stress-durch-die-arbeit"
              aria-label="Umfrage starten"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Umfrage starten
              <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyPage
