
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { initGA, pageview } from "./lib/analytics";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// RouteTracker component to handle route changes
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change
    pageview(location.pathname + location.search);
  }, [location]);
  
  return null;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Initialize GA when the app loads
if (typeof window !== 'undefined') {
  initGA();
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route 
      path="/quiz" 
      element={
        <PrivateRoute>
          <Quiz />
        </PrivateRoute>
      } 
    />
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route 
      path="/profile" 
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } 
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteTracker />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
