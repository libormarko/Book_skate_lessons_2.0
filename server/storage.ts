import {
  type Skatepark,
  type InsertSkatepark,
  type BoardType,
  type InsertBoardType,
  type Lesson,
  type InsertLesson,
  type Booking,
  type InsertBooking,
} from "@shared/schema";
import { sendBookingConfirmation } from "./email";

export interface IStorage {
  // Skateparks
  getSkateparks(): Promise<Skatepark[]>;
  getSkateparkById(id: number): Promise<Skatepark | undefined>;
  getSkateparksByCity(city: string): Promise<Skatepark[]>;

  // Board Types
  getBoardTypes(): Promise<BoardType[]>;
  getBoardTypeById(id: number): Promise<BoardType | undefined>;

  // Lessons
  getLessonsBySkateparkId(skateparkId: number): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private skateparks: Map<number, Skatepark>;
  private boardTypes: Map<number, BoardType>;
  private lessons: Map<number, Lesson>;
  private bookings: Map<number, Booking>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.skateparks = new Map();
    this.boardTypes = new Map();
    this.lessons = new Map();
    this.bookings = new Map();
    this.currentIds = { skateparks: 1, boardTypes: 1, lessons: 1, bookings: 1 };

    this.initializeMockData();
  }

  private initializeMockData() {
    // Add mock skateparks
    const mockSkateparks: InsertSkatepark[] = [
        {
          name: "X-Park Berlin",
          city: "Berlin",
          address: "Revaler Str. 99, 10245",
          imageUrl: "https://images.unsplash.com/photo-1502933691298-84fc14542831",
          latitude: "52.5071",
          longitude: "13.4530",
          features: ["Half-pipe", "Bowl", "Street section"],
          facilities: ["Parking", "Shop", "Restrooms"],
        },
        {
          name: "Nike SB Shelter",
          city: "Berlin",
          address: "Revaler Str. 99, 10245",
          imageUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e",
          latitude: "52.5074",
          longitude: "13.4533",
          features: ["Indoor park", "Street section", "Mini ramp"],
          facilities: ["Shop", "Rentals", "Cafe"],
        },
        {
          name: "Gleisdreieck Skatepark",
          city: "Berlin",
          address: "Möckernstraße 26, 10963",
          imageUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e",
          latitude: "52.4989",
          longitude: "13.3733",
          features: ["Bowl", "Street section", "Rails"],
          facilities: ["Parking", "Restrooms"],
        },
        {
          name: "Hamburg Bowl",
          city: "Hamburg",
          address: "Sternschanze 6, 20357",
          imageUrl: "https://images.unsplash.com/photo-1621544402532-78c290378588",
          latitude: "53.5629",
          longitude: "9.9692",
          features: ["Bowl", "Mini ramp"],
          facilities: ["Parking", "Restrooms"],
        },
        {
          name: "I-Punkt Skateland",
          city: "Hamburg",
          address: "Rüterstraße 21, 22041",
          imageUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e",
          latitude: "53.5544",
          longitude: "10.0977",
          features: ["Indoor park", "Vert ramp", "Street section"],
          facilities: ["Shop", "Cafe", "Lockers"],
        },
        {
          name: "Olympiapark Skatepark",
          city: "Munich",
          address: "Spiridon-Louis-Ring 21, 80809",
          imageUrl: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51",
          latitude: "48.1755",
          longitude: "11.5517",
          features: ["Street section", "Bowl", "Rails"],
          facilities: ["Parking", "First aid", "Restrooms"],
        },
        {
          name: "Hirschgarten Skatepark",
          city: "Munich",
          address: "De-la-Paz-Straße 4, 80639",
          imageUrl: "https://images.unsplash.com/photo-1601129626099-6a569c8c3f0b",
          latitude: "48.1471",
          longitude: "11.5147",
          features: ["Mini ramp", "Ledges", "Rails"],
          facilities: ["Parking"],
        },
        {
          name: "Kap686",
          city: "Cologne",
          address: "Kapweg 6, 51063",
          imageUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e",
          latitude: "50.9513",
          longitude: "7.0085",
          features: ["Indoor park", "Bowl", "Street section"],
          facilities: ["Shop", "Rentals", "Cafe"],
        },
        {
          name: "Utopia Skatepark",
          city: "Cologne",
          address: "Lichtstraße, 50825",
          imageUrl: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a",
          latitude: "50.9527",
          longitude: "6.9238",
          features: ["Street section", "Half-pipe", "Rails"],
          facilities: ["Parking", "Restrooms"],
        },
        {
          name: "Sankt Pauli Skatepark",
          city: "Hamburg",
          address: "Budapester Str. 45, 20359",
          imageUrl: "https://images.unsplash.com/photo-1547447134-cd3f5c716030",
          latitude: "53.5511",
          longitude: "9.9646",
          features: ["Bowl", "Street section", "Mini ramp"],
          facilities: ["Parking", "Shop"],
        }
      ];

      mockSkateparks.forEach(park => {
        const id = this.currentIds.skateparks++;
        this.skateparks.set(id, { ...park, id });
      });

    // Keep existing board types mock data
    const mockBoardTypes: InsertBoardType[] = [
      {
        name: "Street Skateboard",
        description: "Perfect for street tricks and technical skating",
        imageUrl: "https://images.unsplash.com/photo-1547447134-cd3f5c716030",
        level: "Beginner",
      },
      {
        name: "Longboard",
        description: "Ideal for cruising and downhill",
        imageUrl: "https://images.unsplash.com/photo-1585207825004-34577874756c",
        level: "Intermediate",
      }
    ];

    mockBoardTypes.forEach(board => {
      const id = this.currentIds.boardTypes++;
      this.boardTypes.set(id, { ...board, id });
    });
  }

  // Skatepark Methods
  async getSkateparks(): Promise<Skatepark[]> {
    return Array.from(this.skateparks.values());
  }

  async getSkateparkById(id: number): Promise<Skatepark | undefined> {
    return this.skateparks.get(id);
  }

  async getSkateparksByCity(city: string): Promise<Skatepark[]> {
    return Array.from(this.skateparks.values()).filter(
      park => park.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  // Board Type Methods
  async getBoardTypes(): Promise<BoardType[]> {
    return Array.from(this.boardTypes.values());
  }

  async getBoardTypeById(id: number): Promise<BoardType | undefined> {
    return this.boardTypes.get(id);
  }

  // Lesson Methods
  async getLessonsBySkateparkId(skateparkId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(
      lesson => lesson.skateparkId === skateparkId
    );
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const id = this.currentIds.lessons++;
    const newLesson = { 
      ...lesson, 
      id,
      bookedParticipants: 0  // Ensure this field is set
    };
    this.lessons.set(id, newLesson);
    return newLesson;
  }

  // Booking Methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentIds.bookings++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);

    // Update lesson's booked participants
    const lesson = this.lessons.get(booking.lessonId);
    if (lesson) {
      lesson.bookedParticipants += booking.participants;
      this.lessons.set(lesson.id, lesson);
    }

    // Send confirmation email with all booking details
    await sendBookingConfirmation({
      to: booking.email,
      name: booking.name,
      lessonId: booking.lessonId,
      participants: booking.participants,
      date: booking.date,
      time: booking.time,
      boardTypeName: booking.boardTypeName,
      skateparkName: booking.skateparkName,
      skateparkAddress: booking.skateparkAddress
    });

    return newBooking;
  }
}

export const storage = new MemStorage();