import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "wouter";
import { BASE_PATH } from "@/lib/constants";

export function MobileNav({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4 mt-8">
          <Link href="/search">
            <Button variant="ghost" className="w-full justify-start">
              Find Lessons
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}