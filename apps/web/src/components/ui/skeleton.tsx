import { cn } from '@/lib/utils'
import '@/assets/styles/shadcn.css'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('shadcn bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
