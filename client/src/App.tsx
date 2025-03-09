import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Search from "@/pages/search";
import Booking from "@/pages/booking";
import { BASE_PATH, IS_GITHUB_PAGES } from "@/lib/constants";

// Custom hook for handling GitHub Pages routing
const useBasePath = () => {
  const [location, setLocation] = useLocation();
  
  // Only strip base path in GitHub Pages environment
  const strippedLocation = IS_GITHUB_PAGES && location.startsWith(BASE_PATH) 
    ? location.slice(BASE_PATH.length) || '/' 
    : location;
  
  // Rewrite setLocation to add base path in GitHub Pages environment
  const newSetLocation = (to: string, options?: { replace?: boolean }) => {
    if (IS_GITHUB_PAGES && !to.match(/^(https?:)?\/\//)) {
      const newLocation = `${BASE_PATH}${to.startsWith('/') ? to : `/${to}`}`;
      setLocation(newLocation, options);
      return;
    }
    setLocation(to, options);
  };
  
  return [strippedLocation, newSetLocation] as const;
};

function Router() {
  // Use custom routing for GitHub Pages
  if (IS_GITHUB_PAGES) {
    return (
      <WouterRouter hook={useBasePath}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/booking/:id" component={Booking} />
          <Route component={NotFound} />
        </Switch>
      </WouterRouter>
    );
  }
  
  // Use standard routing for local development
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/booking/:id" component={Booking} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;