# SkateSpot - Skateboarding Lesson Booking Platform

A modern frontend skateboarding lesson booking platform for German skateparks, focusing on user-friendly experience and skill-level matching.

**Live Demo:** [https://libormarko.github.io/Book_skate_lessons_2.0](https://libormarko.github.io/Book_skate_lessons_2.0)

## Features

- 🛹 Browse skateparks across Germany
- 🗺️ Interactive map view with TomTom Maps integration
- 📅 Book skateboarding lessons (demo only)
- 📱 Responsive design for mobile and desktop

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (v18 or higher)
- npm (comes with Node.js)
- TomTom Maps API key (for the map to work)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/libormarko/Book_skate_lessons_2.0.git
cd Book_skate_lessons_2.0
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and also in the `client` directory with the following variable:
```
VITE_TOMTOM_API_KEY=your_tomtom_api_key
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

## Building for Production

To create a production build:

```bash
npm run build
```

## Deployment to GitHub Pages

To deploy to GitHub Pages:

```bash
npm run deploy
```

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable React components
  - `/src/pages` - Page components
  - `/src/lib` - Utility functions and configurations
  - `/src/mocks` - Mock data and API implementations
- `/shared` - Shared types and schemas

## Technologies Used

- React + TypeScript
- TanStack Query for data fetching
- TomTom Maps SDK
- Tailwind CSS + shadcn/ui
- Wouter for routing
- Vite for build tooling

## Environment Variables

- `VITE_TOMTOM_API_KEY`: Your TomTom Maps API key (get it from [TomTom Developer Portal](https://developer.tomtom.com/))

## Development Guidelines

- Run `npm run dev` for development
- All data is mocked, so no database or server connection is required
