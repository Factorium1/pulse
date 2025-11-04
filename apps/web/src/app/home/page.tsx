import Link from 'next/link'
import { FaArrowRight, FaBell, FaInfo } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <p className="h1-bold text-left mb-4">Willkommen zurueck, User!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Component */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex-center flex-row bg-indigo-600 shadow-md rounded-lg px-4 py-2 ">
          <span className="text-white text-3xl m-4 ml-2 rounded-full p-3 border-5">
            <FaInfo />
          </span>
          <div className="flex flex-col text-left text-white">
            <p className="text-lg font-semibold">Umfrage verfuegbar</p>
            <p className="text-sm text-white/90 pr-5">
              Es ist eine neue Umfrage verfuegbar. Bitte nehmen Sie daran teil! Das Thema der
              Umfrage ist "Kundenzufriedenheit". Fuer weitere details klicken Sie bitte auf den
              Button rechts.
            </p>
          </div>
          <Link
            href="#"
            aria-label="Zur Umfrage"
            className="inline-flex items-center justify-center px-4 py-3 min-w-fit bg-white text-indigo-600 font-semibold rounded-lg ml-auto hover:bg-indigo-50 transition-colors gap-2"
          >
            Zur Umfrage <FaArrowRight />
          </Link>
        </div>
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
