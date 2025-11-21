const HomeCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title: string
}) => {
  return (
    <div
      className={`border border-border/80 bg-card/80 shadow-sm rounded-lg p-6 ${className ?? ''}`}
    >
      <p className="h3-bold mb-2">{title}</p>
      {children}
    </div>
  )
}

export default HomeCard
