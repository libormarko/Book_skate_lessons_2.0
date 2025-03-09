import { useQuery } from "@tanstack/react-query";
import { SearchFilters } from "@/components/search-filters";
import { SkateparkCard } from "@/components/skatepark-card";
import { MapView } from "@/components/map-view";
import type { Skatepark } from "@/mocks/types";
import { useState } from "react";
import { api } from "@/mocks/api";

export default function Search() {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { data: skateparks = [] } = useQuery<Skatepark[]>({
    queryKey: ["skateparks", selectedCity],
    queryFn: () => selectedCity ? api.getSkateparksByCity(selectedCity) : api.getSkateparks(),
  });

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <div className="w-full md:w-[400px] p-4 overflow-y-auto border-r">
        <SearchFilters onSearch={setSelectedCity} />
        <div className="mt-6 space-y-4">
          {skateparks.map((park) => (
            <SkateparkCard key={park.id} park={park} />
          ))}
        </div>
      </div>
      <div className="hidden md:block flex-1">
        <MapView skateparks={skateparks} />
      </div>
    </div>
  );
}