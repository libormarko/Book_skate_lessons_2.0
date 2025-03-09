import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { BASE_PATH, IS_GITHUB_PAGES } from "@/lib/constants";

export function Layout({ children }: { children: React.ReactNode }) {
  const [_, navigate] = useLocation();
  
  // Simple navigation - wouter's Router base prop will handle the base path
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <button 
            onClick={() => handleNavigate('/')}
            className="text-2xl font-bold text-[#FF5A5F] bg-transparent border-none px-4 py-2 cursor-pointer"
          >
            SkateSpot
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavigate('/search')}
              className="rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm font-medium"
            >
              Find Lessons
            </button>
          </nav>

          <MobileNav className="md:hidden" />
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t py-6 md:py-0">
        <div className="flex h-16 items-center">
          <p className="w-full text-center text-sm leading-loose text-muted-foreground">
            Built with ❤️ for skaters
          </p>
        </div>
      </footer>
    </div>
  );
}