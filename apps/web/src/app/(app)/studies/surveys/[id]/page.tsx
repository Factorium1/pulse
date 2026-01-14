import Link from 'next/link'
import { FaX } from 'react-icons/fa6'
import { getBlock, type GetBlockResult } from './actions'
import { redirect } from 'next/navigation'
import ManagePage from '@/components/features/studies/surveys/manage-page'

const Survey = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const block: GetBlockResult = await getBlock(id)

  if (!block.ok) {
    redirect('/studies')
  }

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
      <ManagePage block={block} />
    </div>
  )
}

export default Survey
