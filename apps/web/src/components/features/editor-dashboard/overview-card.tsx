import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

type OverviewCardProps = {
  label: string
  delta: string
  value: number
  icon: React.ReactNode
}

const OverviewCard = ({ label, value, delta, icon }: OverviewCardProps) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border border-border/60 bg-muted/60 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="text-xs text-primary">{delta}</span>
        </div>
        <div className="mt-2 flex-between">
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          <Link href="#" className="text-xs text-primary h-4 w-4">
            {icon}
          </Link>
        </div>
        <Progress value={value} />
      </div>
    </div>
  )
}

export default OverviewCard
