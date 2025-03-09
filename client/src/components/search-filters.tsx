import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/lib/constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { Skatepark } from "@shared/schema";

interface SearchFiltersProps {
  onSearch: (city: string) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Fetch all skateparks to determine available cities
  const { data: skateparks = [] } = useQuery<Skatepark[]>({
    queryKey: ["/api/skateparks"],
  });

  useEffect(() => {
    if (skateparks && skateparks.length > 0) {
      // Get unique cities that have skateparks
      const cities = [...new Set(skateparks.map(park => park.city))];
      setAvailableCities(cities);
    }
  }, [skateparks]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Location</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? availableCities.find((city) => city.toLowerCase() === value.toLowerCase())
                  : "Select city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {availableCities.map((city) => (
                    <CommandItem
                      key={city}
                      value={city}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                        onSearch(currentValue);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.toLowerCase() ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          className="w-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90"
          onClick={() => onSearch(value)}
        >
          Search
        </Button>
      </div>
    </div>
  );
}