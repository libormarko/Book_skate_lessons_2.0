# SkateSpot - Skateboarding Lesson Booking Platform

A modern frontend skateboarding lesson booking platform for German skateparks, focusing on user-friendly experience and skill-level matching.

**Live Demo:** [https://libormarko.github.io/Book_skate_lessons_2.0](https://libormarko.github.io/Book_skate_lessons_2.0)

## Features

- 🛹 Browse skateparks across Germany
- 🗺️ Interactive map view with TomTom Maps integration
- 📅 Book skateboarding lessons
- 📱 Responsive design for mobile and desktop
- 📧 Email notifications for booking confirmations

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Required API keys:
  - TomTom Maps API key
  - Gmail account credentials (for sending booking confirmations)

## Installation

1. Unzip the project:
```bash
unzip skatespot.zip
cd skatespot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_TOMTOM_API_KEY=your_tomtom_api_key
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable React components
  - `/src/pages` - Page components
  - `/src/lib` - Utility functions and configurations
  - `/src/mocks` - Mock data and API implementations
- `/server` - Backend Express server
  - `/routes.ts` - API route definitions
  - `/storage.ts` - Data storage implementation
  - `/email.ts` - Email service implementation
- `/shared` - Shared types and schemas

## Technologies Used

- React + TypeScript
- TanStack Query for data fetching
- TomTom Maps SDK
- Tailwind CSS + shadcn/ui
- Express.js backend
- Node.js email service

## Environment Variables

- `VITE_TOMTOM_API_KEY`: Your TomTom Maps API key (get it from [TomTom Developer Portal](https://developer.tomtom.com/))
- `GMAIL_USER`: Gmail address used for sending booking confirmations
- `GMAIL_APP_PASSWORD`: Gmail app password (Generate from Google Account settings)

## Development Guidelines

- Run `npm run dev` for development
- The server runs on port 5000 and serves both the API and the client
- Use the mock data in development or connect to your own database
