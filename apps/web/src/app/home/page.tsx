import { FaBell } from 'react-icons/fa'
import InfoCard from '@/components/ui/infoCard'

const Home = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <p className="h1-bold text-left mb-4">Willkommen zurueck, User!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Component */}
        <InfoCard
          title="Neue Umfrage verfuegbar"
          description='Es gibt eine neue Umfrage zum Thema "Mitarbeiterzufriedenheit". Bitte nehmen Sie sich ein paar Minuten Zeit, um daran teilzunehmen und uns Ihr Feedback zu geben.'
          href="/surveys/1"
          linkTitle="Zur Umfrage"
        />

        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center flex-row bg-green-100 rounded-lg px-4 py-2 border-l-4 border-green-400 shadow-sm">
          <span className="text-green-600">
            <FaBell />
          </span>
          <div className="flex flex-col text-left ml-4">
            <p className="text-lg font-semibold text-green-800">Eventsampling verfuegbar</p>
            <p className="text-sm text-green-900/90 pr-5">
              Ein neues Eventsampling steht bereit. Bitte nehmen Sie daran teil! Das Thema des
              Eventsamplings ist "Produktfeedback". Klicken Sie auf den Button rechts fuer weitere
              Informationen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
