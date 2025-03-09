import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full flex flex-col items-center justify-center px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Find Your Perfect Skate Spot in Germany
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Book skateboarding lessons at the best parks across Germany.
                  Learn from pros and connect with the skating community.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/search">
                  <Button className="bg-[#FF5A5F] hover:bg-[#FF5A5F]/90">
                    Find Lessons
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}