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

                {/* Protected Routes */}
                {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/create-new-rock-tournament" element={<CreateNewRockTournament />} />
                  <Route path="/tournament-list" element={<TournamentTable />} />
                  <Route path="/activities" element={<Activities />} />
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
