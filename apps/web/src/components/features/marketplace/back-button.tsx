'use client'

import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const BackToMarketplaceButton = () => {
  return (
    <Link href="/marketplace">
      <p className="text-muted-foreground flex-center gap-2 text-sm cursor-pointer">
        <ArrowLeftIcon className="h-4 w-4 inline-flex" /> Zurueck zum Marketplace
      </p>
    </Link>
  )
}

export default BackToMarketplaceButton
