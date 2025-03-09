import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { BASE_PATH } from "@/lib/constants";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Button variant="link" className="text-2xl font-bold text-[#FF5A5F]">
              SkateSpot
            </Button>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search">
              <Button variant="ghost">Find Lessons</Button>
            </Link>
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