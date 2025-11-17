import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LandingPage from "./pages/LandingPage";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";

function App() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
