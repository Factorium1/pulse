import LeaveSurveyCard from '@/components/features/studies/manage/survey-card'
import { getSurveys } from './actions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ManageStudiesPage = async () => {
  const res = await getSurveys()
  if (!res) {
    //TODO: richtiges error handling
  }

  const surveys = Array.isArray(res) ? res : []

  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <Link href="/studies" className="flex items-center text-muted-foreground gap-2">
        <ArrowLeft className="h-4 w-4" /> Zurueck zur Uebersicht
      </Link>
      <div className="rounded-2xl bg-linear-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md">
        <div className="flex-col">
          <div className="h1-bold">Verwaltung</div>
          <p className="mt-1 text-primary-foreground/90">
            Verwalte deine Studien und verlasse Studien bei bedarf. 📁
          </p>
        </div>
      </div>
      {surveys && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {surveys.map((participation) => {
            const survey = participation.survey
            return (
              <LeaveSurveyCard
                key={participation.id}
                badgeName={survey.shortLabel ?? survey.title}
                badgeEmoji={survey.emoji}
                title={survey.title}
                info="Example Info"
                estimatedDuration={12}
                availableTo="12"
                participationId={participation.id}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ManageStudiesPage
