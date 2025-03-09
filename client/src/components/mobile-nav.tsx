import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useLocation } from "wouter";
import { BASE_PATH, IS_GITHUB_PAGES } from "@/lib/constants";

export function MobileNav({ className }: { className?: string }) {
  const [_, navigate] = useLocation();
  
  // Simple navigation - wouter's Router base prop will handle the base path
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4 mt-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleNavigate('/search')}
          >
            Find Lessons
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}