
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserProfilePage from "./pages/dashboard/UserProfilePage";
import SearchEarningsPage from "./pages/dashboard/SearchEarningsPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEarningsPage from "./pages/admin/AdminEarningsPage";
import AdminBulkUploadPage from "./pages/admin/AdminBulkUploadPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FloatingContactButton from "./components/ui/FloatingContactButton";

// Settings and reports pages
import DashboardSettingsPage from "./pages/dashboard/DashboardSettingsPage";
import DashboardReportsPage from "./pages/dashboard/DashboardReportsPage";

// Create a new QueryClient with settings for refetching and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 300000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
              <Route index element={<SearchEarningsPage />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="search" element={<SearchEarningsPage />} />
              <Route path="reports" element={<DashboardReportsPage />} />
              <Route path="settings" element={<DashboardSettingsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>}>
              <Route index element={<AdminUsersPage />} />
              <Route path="earnings" element={<AdminEarningsPage />} />
              <Route path="upload" element={<AdminBulkUploadPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingContactButton email="helloworld.113077@gmail.com" />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
