import { FaBell, FaEye, FaQuestion } from 'react-icons/fa'
import InfoCard from '@/components/features/dashboard/info-card'
import { Progress } from '@/components/ui/progress'
import { FaClock, FaRocket, FaUserGroup } from 'react-icons/fa6'
import CalendarCard from '@/components/features/dashboard/calendar-card'
import ResourceCard from '@/components/features/dashboard/resource-card'
import HomeCard from '@/components/features/dashboard/home-card'

const DashboardPage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground px-6 py-8 shadow-md flex-between flex-col lg:flex-row gap-6">
        <div className="flex align-middle justify-center flex-col max-w-3xl gap-2">
          <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/80 mb-2">
            Dashboard
          </p>
          <p className="h1-bold">Willkommen zurück, User!</p>
          <p className="text-primary-foreground/80">
            Schneller Blick auf laufende Studien, naechste Schritte und deine Ressourcen. Bleib
            fokussiert mit klaren Prioritaeten und kurzen Wegen.
          </p>
          <div className="flex flex-row align-middle justify-start mt-4 gap-4 flex-wrap">
            <span className="rounded-full bg-primary-foreground/10 px-3 py-2 text-sm font-semibold text-primary-foreground min-w-fit">
              3 offene Aufgaben
            </span>
            <span className="rounded-full bg-primary-foreground/10 px-3 py-2 text-sm font-semibold text-primary-foreground w-fit">
              Naechster Slot: heute 10:00
            </span>
            <span className="rounded-full bg-primary-foreground/10 px-3 py-2 text-sm font-semibold text-primary-foreground min-w-fit">
              Letztes Update vor 2 Std.
            </span>
          </div>
        </div>
        <div className="w-full max-w-md space-y-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 shadow-inner">
          <div className="flex-between gap-2">
            <p className="text-sm text-primary-foreground/85">Wochenziel</p>
            <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground">
              Fokus
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-semibold leading-none">10%</div>
            <div className="flex-1 space-y-2">
              <Progress value={10} bg="bg-primary/30" fg="bg-primary-foreground" />
              <div className="flex-between text-[12px] text-primary-foreground/80">
                <span>2 von 14 erledigt</span>
                <span>+1 heute</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/75">
            Bleib dran: kleine Schritte sichern den groessten Effekt.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HomeCard
          className="homecard border-border-border/80 bg-card/80 shadow-sm backdrop-blur"
          title="Aktive Studien"
        >
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground">Alltagsstress</p>
            <div className="flex-between gap-5">
              <span className="text-sm font-semibold text-foreground/80">Tag 3 / 14</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                10% abgeschlossen
              </span>
            </div>
          </div>
        </HomeCard>
        <HomeCard
          className="border border-border/80 bg-card/80 shadow-sm backdrop-blur"
          title="Naechster Termin"
        >
          <p className="text-muted-foreground">Woechentliche Zusammenfassung</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <FaClock className="text-primary" />
            <span>Heute, 10:00 - 11:00</span>
          </div>
        </HomeCard>
        <HomeCard
          className="border border-border/80 bg-card/80 shadow-sm backdrop-blur"
          title="Eventsampling"
        >
          <p className="text-muted-foreground">Produktfeedback</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <FaBell className="text-primary" />
            <span>Jetzt offen</span>
          </div>
        </HomeCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <HomeCard className="col-span-full" title="Ablaufplan (Naechste 7 Tage)">
          <CalendarCard
            type="today"
            date={new Date()}
            time="10:00 - 11:00"
            title="Wöchentliche Zusammenfassung"
            description="Studie 'Alltagsstress' - (ca. 15 Min.)"
          />
          <CalendarCard
            date={new Date(new Date().setDate(new Date().getDate() + 2))}
            time="14:00 - 15:00"
            title="Eventsampling Erinnerung"
            description="Studie 'Produktfeedback' - (ca. 5 Min.)"
          />
          <CalendarCard
            date={new Date(new Date().setDate(new Date().getDate() + 5))}
            time="09:00 - 10:00"
            title="Monatliche Umfrage"
            description="Studie 'Mitarbeiterzufriedenheit' - (ca. 10 Min.)"
          />
        </HomeCard>
        <HomeCard className="col-span-1" title="Mein Fortschritt">
          <div className="flex-between mb-1">
            <p className="">Studie "Alltagsstress"</p>
            <p className="font-semibold">Tag 3 von 14</p>
          </div>
          <Progress value={10} bg="bg-primary/20" fg="bg-primary" />
        </HomeCard>
        <HomeCard className="col-span-1" title="Ressourcen & Hilfe">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResourceCard
              title="FAQ"
              description="Häufig gestellte Fragen"
              icon={FaQuestion}
              link="/faq"
            />
            <ResourceCard
              title="Feedback"
              description="Ihre Meinung ist uns wichtig"
              icon={FaUserGroup}
              link="/feedback"
            />
            <ResourceCard title="Bugs" description="Melde ein Problem" icon={FaEye} link="/bugs" />
          </div>
        </HomeCard>
      </div>
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
          bgColor="bg-secondary"
          textColor="text-secondary-foreground"
          borderColor="border-primary"
          borderSize="border-l-4"
        />
      </div>
    </div>
  )
}

export default DashboardPage
