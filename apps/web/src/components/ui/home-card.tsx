const HomeCard = ({
  children,
  colSpan,
  className,
  title,
}: {
  children: React.ReactNode
  colSpan: string
  className?: string
  title: string
}) => {
  return (
    <div className={`col-span-${colSpan} shadow-md rounded-lg p-6 bg-card ${className}`}>
      <p className="h3-bold mb-2">{title}</p>
      {children}
    </div>
  )
}

export default HomeCard
