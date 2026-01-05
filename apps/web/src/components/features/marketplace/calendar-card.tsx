'use client'

import * as React from 'react'
import { type DateRange } from 'react-day-picker'
import { useEffect } from 'react'

import { Calendar } from '@/components/ui/calendar'

type CalendarCardProps = {
  startDate: Date | string
  endDate: Date | string
}

const parseDate = (value: Date | string) => {
  const parsed = value instanceof Date ? value : new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

export function CalendarCard({ startDate, endDate }: CalendarCardProps) {
  const [numberOfMonths, setNumberOfMonths] = React.useState(1)
  const parsedStart = parseDate(startDate)
  const parsedEnd = parseDate(endDate)
  const [from, to] =
    parsedStart && parsedEnd
      ? parsedStart <= parsedEnd
        ? [parsedStart, parsedEnd]
        : [parsedEnd, parsedStart]
      : [undefined, undefined]

  const dateRange: DateRange | undefined = from && to ? { from, to } : undefined

  useEffect(() => {
    const getMonthsForWidth = (width: number) => {
      if (width >= 1270) return 3
      if (width >= 930) return 2
      return 1
    }

    const updateMonths = () => setNumberOfMonths(getMonthsForWidth(window.innerWidth))
    updateMonths()
    window.addEventListener('resize', updateMonths)
    return () => window.removeEventListener('resize', updateMonths)
  }, [])

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      numberOfMonths={numberOfMonths}
      className="rounded-lg border shadow-sm"
    />
  )
}
