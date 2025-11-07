import Link from 'next/link'

const RessourceCard = ({
  title,
  description,
  icon: Icon,
  link,
}: {
  title: string
  description: string
  icon: React.ElementType
  link: string
}) => {
  return (
    <Link
      href={link}
      className="bg-accent rounded-lg flex justify-start items-center flex-col p-4 gap-2"
    >
      <Icon className="text-primary text-2xl" />
      <p className="text-xl font-bold">{title}</p>
      <div className="border-b border-2 w-full !border-primary/20 rounded-full"></div>
      <p className="text-foreground/80 text-semibold text-center text-md">{description}</p>
    </Link>
  )
}

export default RessourceCard
