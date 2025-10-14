import type { CardProps } from '@/types/cardprops'

export const Card = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <div className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition flex flex-col gap-4">
      <h3 className="font-bold h3-bold flex items-center gap-2">
        {Icon && <Icon size={20} />} {title}
      </h3>
      {description && <p>{description}</p>}
    </div>
  )
}
