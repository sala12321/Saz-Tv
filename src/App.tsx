
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import StreamPage from "./pages/StreamPage";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Schedule from "./pages/Schedule";
import Channels from "./pages/Channels";
import ChannelStream from "./pages/ChannelStream";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Dmca from "./pages/Dmca";
import Contact from "./pages/Contact";
import LocalStreamPage from "./pages/LocalStreamPage";
import StreamSourcesList from "./pages/StreamSourcesList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/stream/:slug" element={<StreamPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/channel/:slug" element={<ChannelStream />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/dmca" element={<Dmca />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stream-sources/:id" element={<StreamSourcesList />} />
          <Route path="/local-stream/:slug" element={<LocalStreamPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
