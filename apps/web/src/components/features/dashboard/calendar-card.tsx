type CalendarCardProps = {
  type?: 'today' | 'upcoming'
  date: Date
  time: string
  title: string
  description: string
}

const CalendarCard = ({ type, date, time, title, description }: CalendarCardProps) => {
  return (
    <>
      <div
        className={` ${type === 'today' ? 'bg-muted' : ''} flex justify-start items-center gap-6 p-4 rounded-lg`}
      >
        <div className="flex-center flex-col">
          <p className={`font-bold ${type === 'today' ? 'text-primary' : 'text-muted-foreground'}`}>
            {type === 'today'
              ? 'HEUTE'
              : new Date(date).toLocaleDateString('de-DE', { weekday: 'short' }).toUpperCase()}
          </p>
          <p className="font-bold text-3xl">{new Date(date).getDate()}.</p>
          <p className="text-muted-foreground">
            {new Date(date).toLocaleDateString('de-DE', { month: 'short' }).toUpperCase()}
          </p>
        </div>
        <div
          className={`border-l border-2 h-15 rounded-full ${type === 'today' ? '!border-primary' : 'border-border'}`}
        />
        <div className="">
          <p
            className={`font-semibold text-lg ${type === 'today' ? 'text-primary' : 'text-foreground/70'}`}
          >
            {title}
          </p>
          <p className="text-muted-foreground">{`${description} - ${time}`}</p>
        </div>
      </div>
    </>
  )
}

export default CalendarCard
