import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


// --- Import all your pages ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// --- Import your layout components ---
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import CollectionPage from "./pages/CollectionPage"; // 👈 Add this line
import ProtectedRoute from './components/auth/ProtectedRoute'; // 👈 1. Import the new component



// --- Import your context providers ---
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

// This helper component determines which layout to render
const AppLayout = () => {
  const location = useLocation();
  const noLayoutRoutes = ['/admin', '/login', '/register'];

  // If the current path is one of the no-layout routes, render only the page content
  if (noLayoutRoutes.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
 <Route element={<ProtectedRoute />}>
    <Route path="/admin" element={<AdminDashboard />} />
    {/* You can add more admin-only routes here in the future */}
  </Route>
      </Routes>
    );
  }

  // Otherwise, render the standard layout with Header, content, and Footer
  return (
    <div className="flex  flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/collection" element={<CollectionPage />} /> {/* 👈 Add this line */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
