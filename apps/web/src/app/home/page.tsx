import Link from 'next/link'
import { FaBook, FaArrowRight } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <p className="h1-bold text-left mb-4">Willkommen zurueck, User!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Component */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex-center flex-row bg-card shadow-md rounded-lg p-4 ">
          <span className="text-accent-foreground text-3xl m-4">
            <FaBook />
          </span>
          <div className="flex flex-col text-left">
            <p className="text-lg font-semibold">Umfrage verfuegbar</p>
            <p className="text-sm text-muted-foreground">
              Es ist eine neue Umfrage verfuegbar. Bitte nehmen Sie daran teil! Das Thema der
              Umfrage ist "Kundenzufriedenheit". Fuer weitere details klicken Sie bitte auf den
              Button rechts.
            </p>
          </div>
          <Link
            href="#"
            aria-label="Zur Umfrage"
            className="flex-center gap-2 rounded-md px-3 py-3 w-3xs bg-accent text-md font-semibold text-accent-foreground ml-5 cursor-pointer hover:opacity-80"
          >
            Zur Umfrage <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
