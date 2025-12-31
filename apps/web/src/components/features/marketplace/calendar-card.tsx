'use client'

import * as React from 'react'
import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'

export function CalendarCard({ startDate, endDate }: { startDate: Date; endDate: Date }) {
  const [from, to] = startDate <= endDate ? [startDate, endDate] : [endDate, startDate]

  const dateRange: DateRange = {
    from,
    to,
  }

  const months =
    dateRange.from && dateRange.to
      ? (dateRange.to.getFullYear() - dateRange.from.getFullYear()) * 12 +
        dateRange.to.getMonth() -
        dateRange.from.getMonth() +
        1
      : 1

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      numberOfMonths={Math.max(1, months)}
      className="rounded-lg border shadow-sm"
    />
  )
}
