'use client'
import Link from 'next/link'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

import { Home, Pen, Plus } from 'lucide-react'

const SidebarItems = () => {
  const items = [
    {
      title: 'Home',
      url: '/editor/dashboard',
      icon: Home,
    },
    {
      title: 'Erstellen',
      url: '/editor/create',
      icon: Plus,
    },
    {
      title: 'Aendern',
      url: '/editor/modify',
      icon: Pen,
    },
  ]

  const { isMobile, setOpenMobile } = useSidebar()

  const handleNav = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url || '#'} onClick={handleNav}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  )
}

export default SidebarItems
