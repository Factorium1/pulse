import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { FaClockRotateLeft } from 'react-icons/fa6'
import Link from 'next/link'

type SurveyCardProps = {
  survey: string
  title: string
  availableTo?: string
  estimatedDuration?: string
  surveyID: string
  samplingFrom?: string
  samplingTo?: string
  samplingAmount?: number
}

const SurveyCard = ({
  title,
  availableTo,
  estimatedDuration,
  surveyID,
  samplingFrom,
  samplingTo,
  samplingAmount,
}: SurveyCardProps) => {
  return (
    <div className="mt-4 rounded-xl border border-border bg-card p-6 text-center">
      <p className="h3-bold">„{title}“</p>
      <div className="mt-2 flex-center flex-col gap-1">
        {availableTo && (
          <div className="flex-center gap-2">
            <p className="text-sm text-muted-foreground">Verfuegbar:</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              <FaCalendarAlt aria-hidden />
              {availableTo}
            </span>
          </div>
        )}
        {estimatedDuration && (
          <div className="flex-center gap-2">
            <p className="text-sm text-muted-foreground">Geschätzte Dauer:</p>
            <span className="flex-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              <FaClockRotateLeft aria-hidden />
              {estimatedDuration}
            </span>
          </div>
        )}
        {samplingFrom && samplingTo && (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 mt-2 text-sm font-medium text-muted-foreground">
              <FaClock aria-hidden />
              {samplingFrom} – {samplingTo}
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Die selbst Umfrage ist im oben genannten Zeitraum verfügbar.
            </p>
          </>
        )}
      </div>
      <Link
        href={`/survey/${surveyID}`}
        aria-label="Umfrage starten"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
      >
        Umfrage starten
        <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

export default SurveyCard
