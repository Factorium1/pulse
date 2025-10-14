import type { CardProps } from '@/types/cardprops'

export const Card = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <div className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition flex flex-col gap-4 lg:min-w-md">
      <h3 className="font-bold h3-bold flex items-center gap-2">
        {Icon && (
          <span className="bg-indigo-200 p-4 rounded-full flex-center">
            <Icon className="text-indigo-600" />
          </span>
        )}
        <span>{title}</span>
      </h3>
      {description && <p>{description}</p>}
    </div>
  )
}
