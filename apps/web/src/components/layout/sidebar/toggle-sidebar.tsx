'use client'
import { PanelLeftIcon } from 'lucide-react'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'

const ToggleSidebar = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarMenuButton asChild>
      <div
        className="cursor-pointer"
        onClick={() => {
          toggleSidebar()
        }}
      >
        <PanelLeftIcon />
        <span>Collapse Sidebar</span>
      </div>
    </SidebarMenuButton>
  )
}

export default ToggleSidebar
