'use client'

import * as React from 'react'
import { type DateRange } from 'react-day-picker'
import { useEffect } from 'react'

import { Calendar } from '@/components/ui/calendar'

export function CalendarCard({ startDate, endDate }: { startDate: Date; endDate: Date }) {
  const [numberOfMonths, setNumberOfMonths] = React.useState(1)
  const [from, to] = startDate <= endDate ? [startDate, endDate] : [endDate, startDate]

  const dateRange: DateRange = {
    from,
    to,
  }

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
