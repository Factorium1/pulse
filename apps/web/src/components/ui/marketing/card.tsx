import type { CardProps } from '@/types/props'
import CardShadow from './animation/cardShadow'

export const Card = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <CardShadow>
      <div className="h-full border rounded-lg p-6 flex flex-col gap-4 lg:min-w-md bg-card text-card-foreground">
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
    </CardShadow>
  )
}
