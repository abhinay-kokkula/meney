
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TaxAssistant from "./pages/TaxAssistant";
import ScamDetector from "./pages/ScamDetector";
import FinancialQuiz from "./pages/FinancialQuiz";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tax-assistant" element={<TaxAssistant />} />
              <Route path="/scam-detector" element={<ScamDetector />} />
              <Route path="/quiz" element={<FinancialQuiz />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
