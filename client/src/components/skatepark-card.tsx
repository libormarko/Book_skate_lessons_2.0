import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import type { Skatepark } from "@shared/schema";
import { Link } from "wouter";

interface SkateparkCardProps {
  park: Skatepark;
}

export function SkateparkCard({ park }: SkateparkCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{park.name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{park.city}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {park.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
        <Link href={`/booking/${park.id}`}>
          <Button className="w-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90">
            Book Lesson
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}