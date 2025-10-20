import type { CardProps } from '@/types/props'

export const Card = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <div className="border rounded-lg p-6 shadow-lg hover:shadow-xl flex flex-col gap-4 lg:min-w-md bg-card text-card-foreground">
      <h3 className="font-bold h3-bold flex items-center gap-2">
        {Icon && (
          <span className="bg-accent p-4 rounded-full flex-center">
            <Icon className="text-accent-foreground" />
          </span>
        )}
        <span>{title}</span>
      </h3>
      {description && <p>{description}</p>}
    </div>
  )
}
