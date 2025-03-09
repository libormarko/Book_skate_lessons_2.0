import { mockSkateparks, mockBoardTypes, mockLessons } from "./data";
import type { Booking } from "./types";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getSkateparks: async () => {
    await delay(500);
    return mockSkateparks;
  },

  getSkateparksByCity: async (city: string) => {
    await delay(500);
    return mockSkateparks.filter(park => 
      park.city.toLowerCase().includes(city.toLowerCase())
    );
  },

  getSkateparkById: async (id: number) => {
    await delay(500);
    return mockSkateparks.find(park => park.id === id);
  },

  getBoardTypes: async () => {
    await delay(500);
    return mockBoardTypes;
  },

  getLessonsBySkateparkId: async (skateparkId: number) => {
    await delay(500);
    return mockLessons.filter(lesson => lesson.skateparkId === skateparkId);
  },

  createBooking: async (booking: Omit<Booking, "id">) => {
    await delay(1000);
    // Simulate email sending
    console.log("Booking confirmation email would be sent to:", booking.email);
    return {
      ...booking,
      id: Math.floor(Math.random() * 1000), // Generate random ID
    };
  },
};
