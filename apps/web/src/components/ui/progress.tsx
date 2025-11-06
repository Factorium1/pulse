'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  bg?: string
  fg?: string
}

function Progress({ className, value, bg, fg, ...props }: ProgressProps) {
  const bgBar = bg ?? 'bg-primary/20'
  const fgBar = fg ?? 'bg-primary'

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(`${bgBar} relative h-2 w-full overflow-hidden rounded-full`, className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${fgBar} h-full w-full flex-1 transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
