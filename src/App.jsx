import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./components/admin";
import AffiliateSignup from "./components/Affiliate/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/signup" element={<AffiliateSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
