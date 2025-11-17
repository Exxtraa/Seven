import React, { useEffect, useState } from "react";
import Analytics from "./Analytics";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Inbox from "./Inbox";

import {
  Mail,
  InboxIcon,
  Star,
  Send,
  FileText,
  Archive,
  Clock,
  AlertCircle,
  Trash2,
  Phone,
  MessageSquare,
  Settings,
  Zap,
  CheckCircle,
  Menu,
  RefreshCw,
  LogOut,
  Search,
  Building2,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const backendURL = "https://e49460d69e43.ngrok-free.app";

  const [user, setUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState("inbox");
  const [showDashboardHome, setShowDashboardHome] = useState(true);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [connectedGmail, setConnectedGmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("inbox");

  // ✅ Format email timestamps like Gmail
  const formatEmailTime = (dateString) => {
    if (!dateString) return "Now";
    try {
      const emailDate = new Date(dateString);
      const now = new Date();
      const diffMs = now - emailDate;
      const diffMins = Math.floor(diffMs / 60000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffDays === 0) {
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        const hours = emailDate.getHours();
        const minutes = emailDate.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      }
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[emailDate.getDay()];
      }
      const month = emailDate.toLocaleString("en-US", { month: "short" });
      const day = emailDate.getDate();
      return `${month} ${day}`;
    } catch {
      return "Now";
    }
  };

  // ✅ Restore Supabase session + Gmail state automatically
  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        console.log("✅ Supabase session restored:", session.user.email);
        setUser(session.user);
        localStorage.setItem("user", JSON.stringify(session.user));
        setTimeout(() => {
          checkGmailConnection(session.user.id);
        }, 600);
      } else {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          console.log("✅ Local user restored:", parsedUser.email);
          setTimeout(() => {
            checkGmailConnection(parsedUser.id);
          }, 600);
        }
      }
    };

    restoreSession();

    // Tabs stayed where it was last opened
    const savedScreen = localStorage.getItem("activeScreen");
    const savedCategory = localStorage.getItem("selectedCategory");

    if (savedScreen) {
      setActiveScreen(savedScreen);
      setShowDashboardHome(savedScreen === "dashboard");
    }

    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }

    // ✅ Re-run if auth state changes (login/logout/refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("user", JSON.stringify(session.user));
          console.log("🔄 Auth state changed: user active");
          setTimeout(() => {
            checkGmailConnection(session.user.id);
          }, 600);
        } else {
          console.log("🚪 Logged out");
          localStorage.removeItem("user");
          setUser(null);
          setGmailConnected(false);
          navigate("/");
        }
      }
    );

    // ✅ Gmail popup listener (auto fetch after connect)
    const handleMessage = async (event) => {
      if (event.data.gmailConnected) {
        console.log("📬 Gmail connection message received");
        setGmailConnected(true);
        await fetchInbox(); // 🔥 Auto-fetch inbox immediately after connecting
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      listener?.subscription.unsubscribe();
    };
  }, []);

  // ✅ Check Gmail token
  const checkGmailConnection = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("gmail_tokens")
        .select("refresh_token, gmail_email")
        .eq("user_id", user_id)
        .single();

      if (error && error.code === "PGRST116") {
        setGmailConnected(false);
        return;
      }

      if (data?.refresh_token) {
        setGmailConnected(true);
        setConnectedGmail(data.gmail_email);
        fetchInbox();
      } else setGmailConnected(false);
    } catch (err) {
      console.error("❌ Error checking Gmail:", err);
      setGmailConnected(false);
    }
  };

  // ✅ Connect Gmail (only once)
  const connectGmail = () => {
    const user_id = user?.id;
    if (!user_id) return alert("Please login first!");

    window.open(
      `${backendURL}/auth/google?user_id=${user_id}`,
      "_blank",
      "width=500,height=600"
    );

    const poll = setInterval(async () => {
      const { data } = await supabase
        .from("gmail_tokens")
        .select("refresh_token, gmail_email")
        .eq("user_id", user_id)
        .single();

      if (data?.refresh_token) {
        setGmailConnected(true);
        setConnectedGmail(data.gmail_email);
        clearInterval(poll);
        await fetchInbox(); // 🔥 Auto-load inbox when connected
      }
    }, 3000);
  };

  // ✅ Fetch Inbox — accepts optional userParam to avoid race with state
  const fetchInbox = async (userParam) => {
    const effectiveUser = userParam || user;
    if (!effectiveUser) {
      // try to restore session quickly if possible
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setUser(data.session.user);
        } else {
          const stored = localStorage.getItem("user");
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
          }
        }
      } catch (err) {
        console.error("❌ session restore failed before fetchInbox:", err);
      }
    }

    const usedUser =
      userParam || (user ?? JSON.parse(localStorage.getItem("user") || "null"));
    if (!usedUser) {
      console.warn("⚠️ fetchInbox: no user available to fetch for");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/gmail/inbox/${usedUser.id}`, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();

      if (data.success) {
        const withTime = data.emails.map((email) => ({
          ...email,
          date: email.internalDate || new Date().toISOString(),
        }));
        setEmails(withTime);
      } else console.error("⚠️ Error fetching inbox:", data.error);
    } catch (err) {
      console.error("❌ Fetch inbox failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    navigate("/");
  };

  const categories = [
    { name: "Inbox", icon: <Inbox size={20} />, count: emails.length },
    { name: "Drafts", icon: <FileText size={20} />, count: 0 },
    { name: "Sent", icon: <Send size={20} />, count: 0 },
  ];

  const managementCategories = [
    { name: "Archive", icon: <Archive size={20} /> },
    { name: "Snoozed", icon: <Clock size={20} /> },
    { name: "Spam", icon: <AlertCircle size={20} /> },
    { name: "Bin", icon: <Trash2 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-slate-800 flex flex-col">
        {/* Profile */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl ml-11 font-bold text-white flex flex-col items-center leading-none">
              <span>Seven</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white mr-1 mt-2"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <div className="flex items-center gap-3 mt-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-57 pl-10 pr-4 py-2 bg-[#1a1a1a] border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setActiveScreen("dashboard");
              setShowDashboardHome(true);
              setSelectedEmail(null);

              setSelectedCategory("dashboard");
              localStorage.setItem("activeScreen", "dashboard");
              localStorage.setItem("selectedCategory", "dashboard");
            }}
            className={`w-full mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              selectedCategory === "dashboard"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <Menu size={16} />
            <span>Dashboard</span>
          </button>

          <div className="mt-4">
            <p className="px-3 text-xs font-semibold text-slate-500 mb-2">
              Manage
            </p>

            <button
              className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === "manage connection"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
              onClick={() => setSelectedCategory("manage connection")}
            >
              <Settings size={18} />
              <span>Connections</span>
            </button>

            <button
              className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === "companies"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
              onClick={() => setSelectedCategory("companies")}
            >
              <Building2 size={18} />
              <span>Companies</span>
            </button>
          </div>

          <div className="mt-4">
            <p className="px-3 text-xs font-semibold text-slate-500 mb-2">
              Engage
            </p>

            <button
              className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === "sent"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
              onClick={() => setSelectedCategory("sent")}
            >
              <Send size={18} />
              <span>Lead Sent</span>
            </button>

            <button
              className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === "scheduled"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
              onClick={() => setSelectedCategory("scheduled")}
            >
              <Clock size={18} />
              <span>Scheduled</span>
            </button>

            <button
              className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === "inbox"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
              //This onclick is needed every button cuz without it no auto tracking and also no proper button open
              onClick={() => {
                setActiveScreen("inbox");
                setShowDashboardHome(false);
                setSelectedEmail(null);

                setSelectedCategory("inbox");
                localStorage.setItem("activeScreen", "inbox");
                localStorage.setItem("selectedCategory", "inbox");

                if (gmailConnected) fetchInbox();
              }}
            >
              <InboxIcon size={18} />
              <span>Inbox</span>
            </button>

            <button
              className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === "bin"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
              onClick={() => setSelectedCategory("bin")}
            >
              <Trash2 size={18} />
              <span>Bin</span>
            </button>
          </div>
        </nav>

        {/* Profile */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 ${
                  gmailConnected ? "bg-green-500" : "bg-slate-600"
                } rounded-full border-2 border-[#141414]`}
              ></div>
            </div>
            <div>
              <p className="text-sm font-medium">
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {connectedGmail || "No Gmail Linked"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {/* -------- MAIN CONTENT (Flexible Layout) -------- */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
          {gmailConnected && activeScreen === "inbox" && (
            <button
              onClick={fetchInbox}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          )}
        </header>

        {/* -------- DASHBOARD FULL SCREEN -------- */}
        {activeScreen === "dashboard" && (
          <div className="w-full h-full p-10 overflow-y-auto">
            <Analytics />
          </div>
        )}

        {/* -------- INBOX SCREEN (2 columns) -------- */}
        {activeScreen === "inbox" && (
          <Inbox
            gmailConnected={gmailConnected}
            loading={loading}
            emails={emails}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
            formatEmailTime={formatEmailTime}
            connectGmail={connectGmail}
          />
        )}
      </div>
    </div>
  );
}
