import { FaBell, FaEye, FaQuestion } from 'react-icons/fa'
import InfoCard from '@/components/ui/infoCard'
import { Progress } from '@/components/ui/progress'
import { FaUserGroup } from 'react-icons/fa6'

const Home = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <p className="h1-bold text-center md:text-left mb-4">Willkommen zurueck, User!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Neue Umfrage verfuegbar"
          description='Es gibt eine neue Umfrage zum Thema "Mitarbeiterzufriedenheit". Bitte nehmen Sie sich ein paar Minuten Zeit, um daran teilzunehmen und uns Ihr Feedback zu geben.'
          href="/surveys/1"
          linkTitle="Zur Umfrage"
        />
        <InfoCard
          title="Eventsampling aktiv"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="col-span-full shadow-md rounded-lg p-6 bg-card">
          <p className="h3-bold mb-2">Ablaufplan (Naechste 7 Tage)</p>
          <div className="bg-gray-100 flex justify-start items-center gap-6 p-4 rounded-lg">
            <div className="flex-center flex-col">
              <p className="font-bold text-indigo-500">HEUTE</p>
              <p className="font-bold text-3xl ">29.</p>
              <p className="text-neutral-500">OKT</p>
            </div>
            <div className="border-l border-2 h-15 !border-indigo-500" />
            <div className="">
              <p className="font-semibold text-lg">Taegliche Befragung</p>
              <p className="text-neutral-600">Studie "Alltagsstress" - 15:00Uhr bis 16:00Uhr</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-6 p-4 rounded-lg">
            <div className="flex-center flex-col">
              <p className="font-bold text-neutral-500">FR</p>
              <p className="font-bold text-3xl ">31.</p>
              <p className="text-neutral-500">OKT</p>
            </div>
            <div className="border-l border-2 h-15 border-indigo-500" />
            <div className="">
              <p className="font-semibold text-lg text-black/70">Woechentliche Zusammenfassung</p>
              <p className="text-neutral-600">Studie "Alltagsstress" - (ca. 15 Min.)</p>
            </div>
          </div>
        </div>

        <div className="cols-span-1 shadow-md rounded-lg p-6 bg-card">
          <p className="h3-bold mb-2">Mein Fortschritt</p>
          <div className="flex-between mb-1">
            <p className="">Studie "Alltagsstress"</p>
            <p className="font-semibold">Tag 3 von 14</p>
          </div>
          <Progress value={10} bg="bg-green-500/20" fg="bg-green-500" />
        </div>
        <div className="cols-span-1 shadow-md rounded-lg p-6 bg-card">
          <p className="h3-bold mb-2">Ressourcen & Hilfe</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-indigo-200/20 rounded-lg flex-center flex-col p-4 gap-2">
              <FaQuestion className="text-indigo-500 text-2xl" />
              <p className="text-2xl">FAQ</p>
              <p className="text-neutral-600 text-semibold text-center">Häufig gestellte Fragen</p>
            </div>
            <div className="bg-indigo-200/20 rounded-lg flex-center flex-col p-4 gap-2">
              <FaUserGroup className="text-indigo-500 text-2xl" />
              <p className="text-2xl">Support</p>
              <p className="text-neutral-600 text-semibold text-center">
                Hilfe bei Problemen oder Fragen
              </p>
            </div>
            <div className="bg-indigo-200/20 rounded-lg flex-center flex-col p-4 gap-2">
              <FaUserGroup className="text-indigo-500 text-2xl" />
              <p className="text-2xl">Feedback</p>
              <p className="text-neutral-600 text-semibold text-center">
                Ihre Meinung ist uns wichtig
              </p>
            </div>
            <div className="bg-indigo-200/20 rounded-lg flex-center flex-col p-4 gap-2">
              <FaEye className="text-indigo-500 text-2xl" />
              <p className="text-2xl">Bugs</p>
              <p className="text-neutral-600 text-semibold text-center">Melde ein Problem</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
