import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import AffiliateLogin from "./pages/affiliate-login";
import ForgotPassword from "./pages/forgot-password";
import CreateAffiliateTournament from "./pages/create-affiliate-tournament";
import CreateNewRockTournament from "./pages/create-new-rock-tournament";
import CreateNewAffiliateTournament from "./pages/create-new-affiliate-tournament";
import TournamentPage from "./pages/tournament-history";
import Layout from "./components/layout/Layout";
import LoginContainer from "./pages/login-container";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<AffiliateLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-affiliate-tournament" element={<CreateAffiliateTournament />} />
          <Route path="/create-new-rock-tournament" element={<CreateNewRockTournament />} />
          <Route path="/create-new-affiliate-tournament" element={<CreateNewAffiliateTournament />} />
          <Route path="/login-container" element={<LoginContainer />} />
          <Route path="/login-new" element={<Login />} />
          <Route path="/tournament-history" element={<TournamentPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
