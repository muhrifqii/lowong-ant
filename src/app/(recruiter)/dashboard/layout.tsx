import { DashboardNav } from "@/components/dashboard/nav";
import { AppSidebar } from "@/components/sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <DashboardNav />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
