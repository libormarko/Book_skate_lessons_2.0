export interface Skatepark {
  id: number;
  name: string;
  city: string;
  address: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  features: string[];
  facilities: string[];
}

export interface BoardType {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  level: string;
}

export interface Lesson {
  id: number;
  skateparkId: number;
  boardTypeId: number;
  date: string;
  startTime: string;
  duration: number;
  price: number;
  maxParticipants: number;
  bookedParticipants: number;
}

export interface Booking {
  id: number;
  lessonId: number;
  name: string;
  email: string;
  participants: number;
  date: string;
  time: string;
  boardTypeId: number;
  boardTypeName: string;
  skateparkName: string;
  skateparkAddress: string;
}
