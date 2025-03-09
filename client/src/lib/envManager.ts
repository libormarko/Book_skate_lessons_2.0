// Environment variable manager for GitHub Pages and local development
import { IS_GITHUB_PAGES } from "./constants";

// For GitHub Pages, we don't expose .env files, so for the map 
// we'll show a fallback message when the API key is not available
export const getEnvVar = (key: string): string | undefined => {
  const envValue = import.meta.env[key];
  
  // In GitHub Pages, .env variables won't be available
  if (!envValue && IS_GITHUB_PAGES) {
    console.warn(`Environment variable ${key} not available in GitHub Pages deployment`);
    return undefined;
  }
  
  return envValue;
};

// Check if map should be enabled based on env variables
export const isMapEnabled = (): boolean => {
  const apiKey = getEnvVar('VITE_TOMTOM_API_KEY');
  return !!apiKey;
};