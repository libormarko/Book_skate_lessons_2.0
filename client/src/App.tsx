import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Search from "@/pages/search";
import Booking from "@/pages/booking";
import { IS_GITHUB_PAGES, BASE_PATH } from "@/lib/constants";

// Simple way to get basename for GitHub Pages
const getBasename = () => IS_GITHUB_PAGES ? BASE_PATH : "";

function AppRouter() {
  return (
    <Router base={getBasename()}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/booking/:id" component={Booking} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <AppRouter />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;