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

import { Home, PenSquare, ClipboardList, ClipboardType, Store } from 'lucide-react'
import { useCallback } from 'react'

const SidebarItems = () => {
  const items = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Surveys',
      url: '/studies',
      icon: ClipboardType,
      sub: [
        {
          title: 'Survey',
          url: '/studies/surveys',
          icon: ClipboardList,
        },
        {
          title: 'Event Based',
          url: '/studies/events',
          icon: PenSquare,
        },
      ],
    },
    {
      title: 'Marketplace',
      url: '/marketplace',
      icon: Store,
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
          {item.sub && (
            <SidebarMenuSub>
              {item.sub.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link href={subItem.url} onClick={handleNav}>
                      <subItem.icon />
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </>
  )
}

export default SidebarItems
