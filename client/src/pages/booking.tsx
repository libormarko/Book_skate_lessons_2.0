import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoardSelector } from "@/components/board-selector";
import { useState } from "react";
import { api } from "@/mocks/api";
import type { Skatepark, BoardType } from "@shared/schema";

// Available time slots
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  participants: z.number().min(1).max(5),
  date: z.date(),
  time: z.string().min(1, "Please select a time"),
});

export default function Booking() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedBoard, setSelectedBoard] = useState<number>();
  const [_, setLocation] = useLocation();

  const { data: skatepark, isLoading } = useQuery<Skatepark | null>({
    queryKey: ["/api/skateparks", id],
    queryFn: async () => {
      const park = await api.getSkateparkById(parseInt(id!));
      return park || null;
    },
  });

  const { data: boardTypes = [] } = useQuery<BoardType[]>({
    queryKey: ["/api/boardTypes"],
    queryFn: () => api.getBoardTypes(),
  });

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: 1,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (values: z.infer<typeof bookingSchema>) => {
      if (!selectedBoard) {
        throw new Error("Please select a board type");
      }

      if (!skatepark) {
        throw new Error("Skatepark not found");
      }

      const selectedBoardType = boardTypes.find(b => b.id === selectedBoard);
      if (!selectedBoardType) {
        throw new Error("Invalid board type selected");
      }

      const booking = {
        name: values.name,
        email: values.email,
        participants: values.participants,
        lessonId: 1, // Using mock lesson ID
        date: values.date.toISOString(),
        time: values.time,
        boardTypeId: selectedBoard,
        boardTypeName: selectedBoardType.name,
        skateparkName: skatepark.name,
        skateparkAddress: skatepark.address,
      };

      return api.createBooking(booking);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "We've sent you a confirmation email with the lesson details.",
      });
      form.reset();
      setSelectedBoard(undefined);
      setLocation("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!skatepark) {
    return (
      <div className="container py-8">
        <div className="text-center">Skatepark not found</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book a lesson at {skatepark.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    bookingMutation.mutate(values)
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={5}
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Date</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-md border"
                            disabled={(date) =>
                              date < new Date() ||
                              date > new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                            }
                            initialFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIME_SLOTS.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Booking..." : "Book Now"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Board</CardTitle>
            </CardHeader>
            <CardContent>
              <BoardSelector
                boards={boardTypes}
                selectedId={selectedBoard}
                onSelect={setSelectedBoard}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">{skatepark?.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {skatepark?.address}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="text-sm space-y-1">
                    {skatepark?.features.map((feature: string) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Facilities</h4>
                  <ul className="text-sm space-y-1">
                    {skatepark?.facilities.map((facility: string) => (
                      <li key={facility}>{facility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}