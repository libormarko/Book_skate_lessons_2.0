import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { BoardType } from "@shared/schema";

interface BoardSelectorProps {
  boards: BoardType[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

export function BoardSelector({ boards, selectedId, onSelect }: BoardSelectorProps) {
  return (
    <RadioGroup
      defaultValue={selectedId?.toString()}
      onValueChange={(value) => onSelect(parseInt(value))}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {boards.map((board) => (
        <Card
          key={board.id}
          className={`cursor-pointer transition-all ${
            selectedId === board.id ? "ring-2 ring-[#FF5A5F]" : ""
          }`}
        >
          <CardContent className="p-6">
            <RadioGroupItem
              value={board.id.toString()}
              id={`board-${board.id}`}
              className="sr-only"
            />
            <Label htmlFor={`board-${board.id}`} className="cursor-pointer">
              <h3 className="font-semibold mb-2">{board.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {board.description}
              </p>
              <Badge variant="secondary">{board.level}</Badge>
            </Label>
          </CardContent>
        </Card>
      ))}
    </RadioGroup>
  );
}