import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        checkGmailConnection(data.user.id);
      }
    };
    fetchUser();

    // ✅ Listen for popup message from backend
    const handleMessage = (event) => {
      if (event.data.gmailConnected) {
        setGmailConnected(true);
        console.log("✅ Gmail connected (received from popup)");
        fetchInbox();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ✅ Check if user already has a Gmail token
  const checkGmailConnection = async (user_id) => {
    const { data } = await supabase
      .from("gmail_tokens")
      .select("refresh_token")
      .eq("user_id", user_id)
      .single();

    if (data && data.refresh_token) {
      setGmailConnected(true);
      console.log("✅ Gmail connected");
      fetchInbox(); // auto fetch inbox when already connected
    } else {
      console.log("⚠️ Gmail not connected");
    }
  };

  // ✅ Open Gmail connect popup
  const connectGmail = () => {
    const backendURL = "https://e49460d69e43.ngrok-free.app";
    const user_id = user?.id;
    if (!user_id) return alert("User not logged in!");
    window.open(
      `${backendURL}/auth/google?user_id=${user_id}`,
      "_blank",
      "width=500,height=600"
    );

    // Optional: Poll for changes after popup closes
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from("gmail_tokens")
        .select("refresh_token")
        .eq("user_id", user_id)
        .single();
      if (data && data.refresh_token) {
        setGmailConnected(true);
        clearInterval(poll);
        fetchInbox();
      }
    }, 3000);
  };

  // ✅ Fetch inbox emails
  const fetchInbox = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://e49460d69e43.ngrok-free.app/gmail/inbox/${user.id}`
      );

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data.success) {
          setEmails(data.emails);
          console.log("📩 Emails fetched:", data.emails);
        } else {
          console.error("⚠️ Backend error:", data.error || data);
        }
      } catch (parseErr) {
        console.error("❌ Backend returned non-JSON response:", text);
      }
    } catch (err) {
      console.error("Fetch inbox failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-950 text-white flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">📨 Dashboard</h1>
          {user && (
            <div className="text-sm text-slate-400">
              Logged in as <span className="text-blue-400">{user.email}</span>
            </div>
          )}
        </div>

        {/* Connect or Fetch Buttons */}
        {!gmailConnected ? (
          <div className="text-center mt-10">
            <button
              onClick={connectGmail}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium text-lg shadow-lg shadow-blue-500/25 transition-all"
            >
              🔗 Connect Gmail
            </button>
            <p className="text-slate-400 text-sm mt-3">
              Connect your Gmail to start fetching inbox emails.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={fetchInbox}
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-medium text-white transition-all ${
                loading
                  ? "bg-slate-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/25"
              }`}
            >
              {loading ? "Fetching Inbox..." : "📬 Fetch My Inbox"}
            </button>
          </div>
        )}

        {/* Loading Message */}
        {loading && (
          <p className="text-slate-400 mt-6 text-center animate-pulse">
            Fetching your latest emails...
          </p>
        )}

        {/* Inbox Section */}
        {emails.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">
              Your Latest Emails
            </h2>
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <p className="font-semibold text-blue-400">{email.subject}</p>
                  <p className="text-sm text-slate-300 mt-1">{email.from}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {email.snippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {gmailConnected && !loading && emails.length === 0 && (
          <p className="text-slate-500 text-center mt-10">
            No recent emails found in your inbox.
          </p>
        )}
      </div>
    </div>
  );
}
