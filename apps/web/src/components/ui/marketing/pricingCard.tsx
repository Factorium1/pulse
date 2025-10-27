import type { PricingCardProps } from '@/types/props'
import { FaCheckCircle } from 'react-icons/fa'
import CardShadow from './animation/cardShadow'

export const PricingCard = ({
  icon: Icon,
  title,
  description,
  price,
  features,
  button,
}: PricingCardProps) => {
  const formatPrice = (price: string) => {
    const [whole, decimal] = price.split('.')
    return { whole, decimal }
  }

  return (
    <CardShadow>
      <div className="border rounded-lg p-6 flex flex-col gap-4 bg-card text-card-foreground lg:min-w-sm border-t-5 border-t-accent">
        <div className="flex items-center gap-2">
          {Icon && (
            <span className="bg-accent p-4 rounded-full flex-center">
              <Icon className="text-accent-foreground size-6" />
            </span>
          )}
          <h3 className="font-bold h3-bold">{title}</h3>
        </div>
        {price && (
          <div className="mt-1">
            <span className="h1-bold">${formatPrice(price).whole}</span>
          </div>
        )}
        {description && <p className="text-md text-muted-foreground">{description}</p>}
        {features && (
          <ul className="items-start flex justify-start flex-col gap-4 mt-2 border-t-2 pt-5 border-gray-300">
            {features.map((feature, index) => (
              <li key={index} className="text-md flex-center font-semibold">
                <FaCheckCircle className="inline-block mr-2 size-6 text-accent-foreground" />
                {feature}
              </li>
            ))}
          </ul>
        )}
        {button && (
          <div className="inline-flex flex-center px-4 py-2 mt-5 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition focus:outline-none cursor-pointer">
            {button}
          </div>
        )}
      </div>
    </CardShadow>
  )
}
