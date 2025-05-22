import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TradingBotDetails from "./components/projects/TradingBotDetails";
import ClothingStoreDetails from "./components/projects/ClothingStoreDetails";
import DigitalVisionDetails from "./components/projects/DigitalVisionDetails";
import VatCalculatorDetails from "./components/projects/VatCalculatorDetails";
import Chatbot from './components/Chatbot'
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/trading-bot" element={<TradingBotDetails />} />
            <Route path="/projects/clothing-store" element={<ClothingStoreDetails />} />
            <Route path="/projects/digital-vision" element={<DigitalVisionDetails />} />
            <Route path="/projects/vat-calculator" element={<VatCalculatorDetails />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Chatbot />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
