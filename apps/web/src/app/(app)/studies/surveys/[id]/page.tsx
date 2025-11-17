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
      <h1>Survey Page</h1>
      <p>This is the survey page content.</p>
    </div>
  )
}

export default Survey
