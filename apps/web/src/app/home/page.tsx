import { FaBell } from 'react-icons/fa'
import InfoCard from '@/components/ui/infoCard'
import { Progress } from '@/components/ui/progress'

const Home = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <p className="h1-bold text-left mb-4">Willkommen zurueck, User!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Neue Umfrage verfuegbar"
          description='Es gibt eine neue Umfrage zum Thema "Mitarbeiterzufriedenheit". Bitte nehmen Sie sich ein paar Minuten Zeit, um daran teilzunehmen und uns Ihr Feedback zu geben.'
          href="/surveys/1"
          linkTitle="Zur Umfrage"
        />
        <InfoCard
          title="Eventsampling verfuegbar"
          description='Ein neues Eventsampling steht bereit. Bitte nehmen Sie daran teil! Das Thema des Eventsamplings ist "Produktfeedback". Klicken Sie auf den Button rechts fuer weitere Informationen.'
          href="/samplings/1"
          linkTitle="Zum Eventsampling"
          icon={<FaBell />}
          bgColor="bg-green-100"
          textColor="text-green-600"
          borderColor="!border-green-400"
          borderSize="border-l-4"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="cols-span-1 shadow-md rounded-lg p-6 bg-card">
          <p className="h3-bold mb-2">Mein Fortschritt</p>
          <div className="flex-between mb-1">
            <p className="">Studie "Alltagsstress"</p>
            <p className="font-semibold">Tag 3 von 14</p>
          </div>
          <Progress value={80} bg="green-500" />
        </div>
      </div>
    </div>
  )
}

export default Home
