import SideNav from "@/app/dashboard/components/side-nav";
import TopNav from "@/app/dashboard/components/top-nav";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <TopNav />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
