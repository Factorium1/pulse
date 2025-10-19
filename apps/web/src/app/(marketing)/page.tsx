import { Card } from '@/components/marketing/card'
import { PricingCard } from '@/components/marketing/pricingCard'
import { FaBook, FaGlobe, FaMobile, FaPen, FaShare } from 'react-icons/fa'
import { FaDiagramSuccessor } from 'react-icons/fa6'
import Image from 'next/image'
import Link from 'next/link'
import SelectOS from '@/components/marketing/selectOS'

export const metadata = {
  title: 'Home',
}

const Homepage = () => {
  return (
    <>
      <section id="home" className="section-vh flex-center px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center text-white/80">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to Pulse
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80">
            Craft powerful, beautiful surveys that capture authentic responses — then transform raw
            feedback into real-time analytics, actionable insights, and data-driven decisions to
            grow your product, engage your audience, and guide your roadmap.
          </p>
        </div>
      </section>
      <section id="features" className="section-vh">
        <div className="max-w-3xl mx-auto flex-center flex-col text-center gap-3 text-foreground px-6 pt-30 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold">Funktionen</h2>
          <p className="text-base md:text-lg max-w-2xl">
            Alles, was Sie für aufschlussreiche Umfragen benötigen, in einer intuitiven App.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto px-6 pb-20">
          <Card
            icon={FaPen}
            title="Einfacher Editor"
            description="Erstellen sie ansprechende Umfragen in Minuten. Nutzen Sie unsere Drag-and-Drop-Oberfläche, um Ihre Umfragen anzupassen."
          />
          <Card
            icon={FaShare}
            title="Nahtlos Teilen"
            description="Verteilen Sie Ihre Umfragen über Links, E-Mails oder soziale Medien mit nur einem Klick."
          />
          <Card
            icon={FaDiagramSuccessor}
            title="Echtzeit Analyse"
            description="Beobachten Sie, wie die Ergebnisse eintreffen, und gewinnen Sie sofort wertvolle Einblicke."
          />
          <Card
            icon={FaMobile}
            title="Mobile-freundlich"
            description="Unsere Umfragen sind vollständig mobiloptimiert, sodass Ihre Teilnehmer auf jedem Gerät eine nahtlose Erfahrung haben."
          />
          <Card
            icon={FaBook}
            title="Vorlagen & Bibliothek"
            description="Starten Sie schnell mit anpassbaren Vorlagen und einer umfangreichen Fragenbibliothek – perfekte Ausgangspunkte für jede Umfrage."
          />
          <Card
            icon={FaGlobe}
            title="Integrationen"
            description="Verbinden Sie Pulse mit Tools wie Slack, Zapier und Ihrem CRM, um Antworten automatisch zu teilen und Workflows zu automatisieren."
          />
        </div>
      </section>
      <section id="price" className="section-vh">
        <div className="max-w-3xl mx-auto flex-center flex-col text-center gap-3 text-foreground px-6 pt-30 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold">Preise</h2>
          <p className="text-base md:text-lg max-w-2xl">
            The whole project is licensed under the MIT License. You can use it for free for both
            personal and commercial projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto px-6 pb-20">
          <PricingCard
            icon={FaBook}
            title="Free Plan"
            description="For Personal Use"
            price="0.00"
            features={[
              'Unbegrenzte Umfragen',
              'Unbegrenzte Antworten',
              'Grundlegende Berichtsfunktionen',
              'E-Mail-Support',
            ]}
            button="Register Now"
          />
          <PricingCard
            icon={FaBook}
            title="Free Plan"
            description="For Personal Use"
            price="0.00"
            features={[
              'Unbegrenzte Umfragen',
              'Unbegrenzte Antworten',
              'Grundlegende Berichtsfunktionen',
              'E-Mail-Support',
            ]}
            button="Register Now"
          />
          <PricingCard
            icon={FaBook}
            title="Free Plan"
            description="For Personal Use"
            price="0.00"
            features={[
              'Unbegrenzte Umfragen',
              'Unbegrenzte Antworten',
              'Grundlegende Berichtsfunktionen',
              'E-Mail-Support',
            ]}
            button="Register Now"
          />
        </div>
      </section>
      <section id="download" className="min-h-[110dvh] md:min-h-[100vh]">
        <div className="max-w-3xl mx-auto flex-center flex-col text-center gap-3 text-foreground px-6 pt-30 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold">Download</h2>
          <p className="text-base md:text-lg max-w-2xl">
            Laden Sie Pulse herunter und beantworten Sie Umfragen mobil — Teilnehmende können
            Antworten außerdem bequem direkt im Browser abgeben.
          </p>
          <div className="flex-center">
            <Link href="#">
              <Image
                alt="AppStore Download"
                width="160"
                height="60"
                src="./download/AppStore_Download_dark.svg"
              />
            </Link>
            <Link href="#">
              <Image
                alt="Google Play Download"
                width="200"
                height="60"
                src="./download/GetItOnGooglePlay_Badge_Web_color_English.svg"
              />
            </Link>
          </div>
          <SelectOS />
        </div>
      </section>
    </>
  )
}

export default Homepage
