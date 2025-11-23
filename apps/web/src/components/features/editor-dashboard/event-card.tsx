type EventCardProps = {
  title: string
  icon: React.ReactNode
  count: number
  statusText: string
  statusColorClass: string
}

const EventCard = ({ title, icon, count, statusText, statusColorClass }: EventCardProps) => {
  return (
    <div className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{title}</span>
        <div className={`h-4 w-4 ${statusColorClass}`}>{icon}</div>
      </div>
      <p className="mt-3 text-3xl font-bold text-foreground">{count}</p>
      <p className={`text-xs ${statusColorClass}`}>{statusText}</p>
    </div>
  )
}

export default EventCard
