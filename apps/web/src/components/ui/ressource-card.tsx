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
    <Link href={link} className="bg-indigo-200/20 rounded-lg flex-center flex-col p-4 gap-2">
      <Icon className="text-indigo-500 text-2xl" />
      <p className="text-2xl">{title}</p>
      <p className="text-neutral-600 text-semibold text-center">{description}</p>
    </Link>
  )
}

export default RessourceCard
