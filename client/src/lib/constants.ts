// GitHub Pages configuration
export const IS_GITHUB_PAGES = window.location.hostname === 'libormarko.github.io';
export const BASE_PATH = IS_GITHUB_PAGES ? '/Book_skate_lessons_2.0' : '';

export const CITIES = [
  "Berlin",
  "Hamburg",
  "Munich",
  "Cologne",
  "Frankfurt",
  "Stuttgart",
  "Düsseldorf",
  "Leipzig",
  "Dortmund",
  "Essen"
];

export const FEATURES = [
  "Half-pipe",
  "Bowl",
  "Street section",
  "Mini ramp",
  "Vert ramp",
  "Rails",
  "Stairs",
  "Ledges"
];

export const FACILITIES = [
  "Parking",
  "Shop",
  "Restrooms",
  "Lockers",
  "Rentals",
  "Cafe",
  "First aid"
];

export const BOARD_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert"
];
