"use client"
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar as AppSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Home,
  PenSquare,
  BookCopy,
  ShieldCheck,
  CreditCard,
  Sparkles,
  HelpCircle,
  Globe,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || (pathname?.startsWith(href + "/") ?? false)
  const navLinkClass = (href: string) =>
    isActive(href)
      ? "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
      : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
  return (
    <SidebarProvider>
      <AppSidebar className="border-r bg-gradient-to-b from-sidebar-background to-sidebar-background/95">
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg">
              <span className="text-xl font-bold">Writoma</span>
            </div>
           
       
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="mb-2">
                <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
         
            
            <Separator className="my-4" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Tools
              </SidebarGroupLabel>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-1">
                  <Link href="/humanizer" className={navLinkClass("/humanizer")}>
                    <PenSquare className="h-4 w-4" />
                    <span>Humanizer</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-1">
                  <Link href="/aidetector" className={navLinkClass("/aidetector")}>
                    <ShieldCheck className="h-4 w-4" />
                    <span>AI Detector</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-1">
                  <Link href="/writinggenerator" className={navLinkClass("/writinggenerator")}>
                    <BookCopy className="h-4 w-4" />
                    <span>Writing Generator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
              <SidebarMenuButton asChild className="mb-1">
                <Link href="/pricing" className={navLinkClass("/pricing")}>
                  <Sparkles className="h-4 w-4" />
                  <span>Pricing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-3 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="mb-1">
                <Link href="/pricing" className={navLinkClass("/pricing")}>
                  <Sparkles className="h-4 w-4" />
                  <span>Upgrade Plan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild className="mb-1">
                <Link href="/auth/signout" className={navLinkClass("/auth/signout")}>
                  <Sparkles className="h-4 w-4" />
                  <span>Signout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
       
            
          
          </SidebarMenu>
          
      
        </SidebarFooter>
      </AppSidebar>
      
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
          <SidebarTrigger className="h-8 w-8" />
        </header>
        
        <div className="flex-1 py-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}