
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { adminDashboardConfig } from '@/configs/dashboard';
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
 


  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader
        isAdminLayout={true}
      />
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <aside className='fixed top-14  -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
          <ScrollArea className='py-6 pr-6 lg:py-8 '>
            <SidebarNav
              items={adminDashboardConfig.sidebarNav}
              className='p-1'
            />
          </ScrollArea>
        </aside>
        <main className='flex w-full flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
