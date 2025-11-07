import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate("/"); // if not logged in, go back to landing
      }
    }
    getUser();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Seven 🚀</h1>
      {user ? (
        <>
          <p className="text-slate-400 mb-6">
            Logged in as: <span className="font-semibold">{user.email}</span>
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
