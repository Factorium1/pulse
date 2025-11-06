type CalenderCardProps = {
  type?: 'today' | 'upcoming'
  date: Date
  time: string
  title: string
  description: string
}

const CalenderCard = ({ type, date, time, title, description }: CalenderCardProps) => {
  return (
    <>
      <div
        className={` ${type === 'today' ? 'bg-gray-100' : ''} flex justify-start items-center gap-6 p-4 rounded-lg`}
      >
        <div className="flex-center flex-col">
          <p className={`font-bold ${type === 'today' ? 'text-indigo-500' : 'text-neutral-500'}`}>
            {type === 'today'
              ? 'HEUTE'
              : new Date(date).toLocaleDateString('de-DE', { weekday: 'short' }).toUpperCase()}
          </p>
          <p className="font-bold text-3xl">{new Date(date).getDate()}.</p>
          <p className="text-neutral-500">
            {new Date(date).toLocaleDateString('de-DE', { month: 'short' }).toUpperCase()}
          </p>
        </div>
        <div
          className={`border-l border-2 h-15 rounded-full ${type === 'today' ? '!border-indigo-500' : ''}`}
        />
        <div className="">
          <p
            className={`font-semibold text-lg ${type === 'today' ? 'text-indigo-500' : 'text-black/70'}`}
          >
            {title}
          </p>
          <p className="text-neutral-600">{`${description} - ${time}`}</p>
        </div>
      </div>
    </>
  )
}

export default CalenderCard
