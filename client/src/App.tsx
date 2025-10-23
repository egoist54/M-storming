import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "@/pages/HomePage";
import QuizPage from "@/pages/QuizPage";
import ResultPage from "@/pages/ResultPage";
import ImageCheckPage from "@/pages/ImageCheckPage";
import ResultsGalleryPage from "@/pages/ResultsGalleryPage";
import NotFound from "@/pages/not-found";

function Router() {
  const base = import.meta.env.BASE_URL;
  
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/quiz/:id" component={QuizPage} />
        <Route path="/result/:id" component={ResultPage} />
        <Route path="/image-check" component={ImageCheckPage} />
        <Route path="/results-gallery" component={ResultsGalleryPage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
