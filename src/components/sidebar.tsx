"use client";

import { Sidebar, SidebarContent, SidebarHeader, } from "./ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        {/* <NavUser user={user} /> */}
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
    </Sidebar>
  )
}
