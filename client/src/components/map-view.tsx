import type { Skatepark } from "@/mocks/types";
import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useLocation } from "wouter";

interface MapViewProps {
  skateparks: Skatepark[];
}

export function MapView({ skateparks }: MapViewProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<tt.Map | null>(null);
  const [_, setLocation] = useLocation();
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    try {
      const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
      if (!apiKey) {
        console.error("TomTom API key is missing");
        return;
      }

      // Only create a new map instance if one doesn't exist
      if (!mapInstance.current) {
        mapInstance.current = tt.map({
          key: apiKey,
          container: mapElement.current,
          center: [13.4050, 52.5200], // Berlin center
          zoom: 6,
          style: 'https://api.tomtom.com/style/1/style/22.2.1-*?map=basic_main&key=' + apiKey
        });

        // Log successful map initialization
        mapInstance.current.on('load', () => {
          console.log('Map loaded successfully');
        });

        // Log any map errors
        mapInstance.current.on('error', (e) => {
          console.error('Map error:', e);
        });
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    try {
      // Clear existing markers
      const existingMarkers = document.getElementsByClassName('marker');
      while (existingMarkers[0]) {
        existingMarkers[0].remove();
      }

      // Add markers for each skatepark
      skateparks.forEach((park) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF5A5F"/>
        </svg>`;
        markerElement.style.cursor = 'pointer';

        const marker = new tt.Marker({ element: markerElement })
          .setLngLat([parseFloat(park.longitude), parseFloat(park.latitude)])
          .addTo(map);

        const popupContent = document.createElement('div');
        popupContent.className = 'p-4';
        popupContent.innerHTML = `
          <h3 class="font-semibold mb-2">${park.name}</h3>
          <p class="text-sm text-gray-600 mb-4">${park.address}</p>
          <button class="book-lesson-btn bg-[#FF5A5F] text-white px-4 py-2 rounded hover:bg-[#FF5A5F]/90 w-full">
            Book Lesson
          </button>
        `;

        const popup = new tt.Popup({ offset: 25 }).setDOMContent(popupContent);
        marker.setPopup(popup);

        popupContent.querySelector('.book-lesson-btn')?.addEventListener('click', () => {
          // Add base path for GitHub Pages
          setLocation(`/booking/${park.id}`);
        });
      });
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  }, [skateparks, setLocation]);

  return (
    <div 
      ref={mapElement} 
      style={{ width: "100%", height: "100%" }}
      className="rounded-lg overflow-hidden"
    />
  );
}