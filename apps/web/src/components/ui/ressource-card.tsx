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
      className="bg-indigo-200/20 rounded-lg flex justify-start items-center flex-col p-4 gap-2"
    >
      <Icon className="text-indigo-500 text-2xl" />
      <p className="text-xl font-bold">{title}</p>
      <div className="border-b border-2 w-full !border-indigo-500/40 rounded-full"></div>
      <p className="text-neutral-600 text-semibold text-center text-md">{description}</p>
    </Link>
  )
}

export default RessourceCard
