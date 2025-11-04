import { FaArrowRight, FaInfo } from 'react-icons/fa'
import Link from 'next/link'

type InfoCardProps = {
  title: string
  description: string
  href: string
  linkTitle: string
  icon?: React.ReactNode
  bgColor?: string
  textColor?: string
  borderColor?: string
  borderSize?: string
}

const InfoCard = ({
  title,
  description,
  href,
  linkTitle,
  icon,
  bgColor,
  textColor,
  borderColor,
  borderSize,
}: InfoCardProps) => {
  return (
    <div
      className={`col-span-1 md:col-span-2 lg:col-span-3 flex-center flex-col md:flex-row ${bgColor ? bgColor : 'bg-indigo-600'} shadow-md rounded-lg px-4 py-2 ${textColor ? textColor : 'text-white'} ${borderColor ? borderColor : 'border-indigo-400'} border-solid ${borderSize ? borderSize : ''}`}
    >
      <span
        className={`text-3xl m-4 ml-2 rounded-full p-3 border-5 ${borderColor ? borderColor : 'border-white'}`}
      >
        {icon ? icon : <FaInfo />}
      </span>
      <div
        className={`flex flex-col text-center md:text-left ${textColor ? textColor : 'text-white'}`}
      >
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm pr-5">{description}</p>
      </div>
      <Link
        href={href}
        className={`inline-flex items-center justify-center mt-5 md:mt-0 px-4 py-3 min-w-fit bg-white ${textColor ? textColor : 'text-indigo-600'} font-semibold rounded-lg ml-auto hover:bg-indigo-50 transition-colors gap-2`}
      >
        {linkTitle} <FaArrowRight />
      </Link>
    </div>
  )
}

export default InfoCard
