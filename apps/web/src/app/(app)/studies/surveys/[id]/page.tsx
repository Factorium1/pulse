import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { FaX } from 'react-icons/fa6'

const Survey = () => {
  return (
    <div>
      <header className="flex-between px-5 py-4 md:px-0">
        <div className="">
          <p className="h3-bold inline">Survey/</p>
          <Link href="/studies/surveys" className="inline text-primary font-semibold">
            Alltagsstress
          </Link>
        </div>
        <Link href="/studies/surveys" className="">
          <FaX className="border-2 rounded-full p-1 text-muted-foreground text-2xl font-semibold" />
        </Link>
      </header>
      <Progress value={45} className="rounded-none md:rounded-full" />
      <div className="flex-center">
        <div className="flex-start bg-card rounded-md p-6 shadow-md mt-10 flex-col gap-4 w-full mx-10">
          <p className="text-primary font-semibold text-sm">Frage 1 von 10</p>
          <div className="flex-start gap-2 flex-col">
            <h2 className="h2-bold">Wie gestresst fühlen Sie sich momentan?</h2>
            <p className="text-muted-foreground text-sm">
              Bitte wählen Sie die Option, die am besten zu Ihrer Empfindung passt, wobei 1 "sehr
              entspannt" und 5 "extrem gestresst" bedeutet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Survey
