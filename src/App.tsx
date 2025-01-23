import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import AffiliateLogin from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import CreateNewRockTournament from "./pages/tournaments/create-new-rock-tournament";
import Layout from "./layouts/Layout";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/reactQuerClient";
import Verify2FA from "./pages/auth/verify2fa";
import ResetPassword from "./pages/auth/reset-password";
import { SidebarProvider } from "./context/SidebarContext";
import Activities from "./pages/activities/activities";
import RootRedirect from "./components/RootRedirect";
import TournamentTable from "./pages/TournamentTable";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from "./pages/auth/register";
import RegisterConfirmation from "./pages/auth/register-confirmation";
import RegisterOtpResend from "./pages/auth/resend-otp";
import CreateVIPTournament from "./pages/tournaments/create-new-vip-tournament";
import NotFound from "./pages/not-found";


const App: React.FC = () => {
  return (
    <AuthProvider> {/* Provide authentication context */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <SidebarProvider>
            <Layout>
              <Routes>

                {/* Root route that redirects based on authentication */}
                <Route path="/" element={<RootRedirect />} />

                {/* Public Routes */}
                <Route path="/login" element={<AffiliateLogin />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Registration Routes */}
                <Route path="/register" element={<Register />} /> {/* Registration page */}
                <Route path="/register-confirmation" element={<RegisterConfirmation />} /> {/* Registration confirmation page */}
                <Route path="/register-otp-resend" element={<RegisterOtpResend />} /> {/* OTP resend page */}

                {/* Protected Routes */}
                {/* <Route element={<ProtectedRoute />}> */}
                <Route path="/create-new-rock-tournament" element={<CreateNewRockTournament />} />
                <Route path="/create-new-vip-tournament" element={<CreateVIPTournament />} />
                <Route path="/tournament-list" element={<TournamentTable />} />
                {/* <Route path="/activities" element={<Activities />} /> */}
                {/* Catch-all route for non-existing paths */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} /> {/* Redirect invalid paths to 404 page */}
                {/* </Route> */}
              </Routes>
            </Layout>
          </SidebarProvider>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
