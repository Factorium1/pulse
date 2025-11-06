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
    <div className={`shadow-md rounded-lg p-6 bg-card ${className ?? ''}`}>
      <p className="h3-bold mb-2">{title}</p>
      {children}
    </div>
  )
}

export default HomeCard
