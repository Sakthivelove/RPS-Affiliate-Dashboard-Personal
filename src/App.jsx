import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AffiliateSignup from "./components/Affiliate/Signup";
import AdminLogin from "./components/Admin/login";
import ForgotPassword from "./components/Admin/forgotPassword";
import Popup from "./components/Affiliate/PopUp";
import CreateTournament from "./components/Affiliate/CreateTournament";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AffiliateSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/tournament" element={<CreateTournament />} />
      </Routes>
    </Router>
  );
}

export default App;
