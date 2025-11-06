import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import {
  ArrowRight,
  Mail,
  Zap,
  Users,
  Search,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/Exxtraa/Seven");
        const data = await res.json();
        document.getElementById("starCount").textContent =
          data.stargazers_count;
      } catch (err) {
        console.error("Error fetching GitHub stars:", err);
      }
    };

    fetchStars();
    // refresh every 10 mins
    const interval = setInterval(fetchStars, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-7 z-50 px-6">
        <div className="max-w-fit mx-auto bg-slate-800/30 border border-slate-700/50 rounded-full backdrop-blur-xl shadow-lg">
          <div className="px-6 py-3 flex justify-between items-center gap-90">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              Seven
            </div>
            <div className="hidden md:flex gap-6 items-center text-sm">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                Company
              </a>

              {/* GitHub Star Button */}
              <a
                href="https://github.com/Exxtraa/Seven"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full text-slate-300 hover:text-white transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="font-medium">GitHub</span>
                <svg
                  className="w-3.5 h-3.5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                {/* Live Star Count */}
                <span id="starCount" className="font-semibold">
                  ...
                </span>
              </a>

              <button
                type="button"
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: `${window.location.origin}/dashboard`,
                      },
                    });
                    if (error) throw error;
                  } catch (err) {
                    console.error("Google Auth Error:", err.message);
                  }
                }}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full transition-all duration-200 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium">
              <Sparkles size={14} />
              <span>Trusted by 100+ professionals</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Send Cold Emails that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Actually Lands Inbox
              </span>
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Reach hundreds of recruiters instantly. Choose from pre-built
              templates or create your own and retouch with AI. Personalized
              outreach,{" "}
              <span className="text-white font-semibold">zero effort</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: `${window.location.origin}/dashboard`,
                      },
                    });
                    if (error) throw error;
                  } catch (err) {
                    console.error("Google Auth Error:", err.message);
                  }
                }}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold transition-all duration-200 text-sm inline-flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="px-6 py-3 border border-slate-600 hover:border-slate-400 hover:bg-slate-800/50 text-white rounded-full font-semibold transition-all duration-200 backdrop-blur text-sm">
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-500" />
                70+ happy users
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Enhanced Hero Image with animated elements */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-800/40 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-xl shadow-2xl">
              <div className="space-y-3">
                {/* Email Preview Card */}
                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">
                      recruiter@company.com
                    </p>
                    <p className="text-blue-400 text-xs flex items-center gap-1">
                      Ready to send <ArrowRight size={12} />
                    </p>
                  </div>
                </div>

                {/* Email Content Preview */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 space-y-2">
                  <p className="text-slate-200 font-medium text-sm">
                    Subject: Let's Connect - Exciting Opportunity
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-slate-400 text-xs">Hi [Name],</p>
                    <p className="text-slate-400 text-xs">
                      I came across your work at [Company] and was impressed by
                      your expertise in [Field]...
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-700/50">
                    <span className="text-[10px] text-slate-500">
                      Personalized • High conversion
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 p-2.5 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                      <span>Campaign Progress</span>
                      <span>250/500 sent</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <TrendingUp className="text-green-500" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Y Combinator Badge Section */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur">
            <span className="text-slate-400 text-xs font-medium">
              Not Backed by
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center font-bold text-white text-[10px]">
                Y
              </div>
              <span className="text-slate-400 text-xs font-semibold">
                Combinator
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-slate-500 text-xl max-w-2xl mx-auto">
            *Companies of all sizes trust SEVEN to deliver their most important emails.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="space-y-12">
            {/* First Row */}
            <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap">
              {/* Warner Bros */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <svg className="h-8 md:h-10" viewBox="0 0 200 40" fill="white">
                  <text
                    x="10"
                    y="30"
                    fontFamily="serif"
                    fontSize="24"
                    fontWeight="bold"
                  >
                    OVERLAYED
                  </text>
                </svg>
              </div>

              {/* Max */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <svg className="h-8 md:h-10" viewBox="0 0 100 40" fill="white">
                  <text
                    x="5"
                    y="30"
                    fontFamily="Arial Black"
                    fontSize="28"
                    fontWeight="900"
                  >
                    max
                  </text>
                </svg>
              </div>

              {/* Raycast */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-md transform rotate-45"></div>
                <span className="text-white text-xl font-semibold">
                  Raycast
                </span>
              </div>

              {/* Mistral AI */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex gap-0.5">
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                  </div>
                  <div className="flex gap-0.5">
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                  </div>
                </div>
                <span className="text-white text-xl font-semibold">
                  MISTRAL AI
                </span>
              </div>

              {/* Ont+ */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <svg className="h-8 md:h-10" viewBox="0 0 100 40" fill="white">
                  <text
                    x="5"
                    y="30"
                    fontFamily="Arial"
                    fontSize="32"
                    fontWeight="300"
                  >
                    ont+
                  </text>
                </svg>
              </div>

              {/* Anghami */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-white text-xl font-medium">anghami</span>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap">
              {/* Gumroad */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <svg className="h-8 md:h-10" viewBox="0 0 150 40" fill="white">
                  <text
                    x="5"
                    y="30"
                    fontFamily="Arial Rounded"
                    fontSize="28"
                    fontWeight="bold"
                  >
                    GUMROAD
                  </text>
                </svg>
              </div>

              {/* Fal */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-white text-2xl font-bold">fal</span>
              </div>

              {/* Decathlon */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <svg className="h-8 md:h-10" viewBox="0 0 150 40" fill="white">
                  <text
                    x="5"
                    y="30"
                    fontFamily="Arial"
                    fontSize="24"
                    fontWeight="bold"
                    fontStyle="italic"
                  >
                    SOFT TECH
                  </text>
                </svg>
              </div>

              {/* Supabase */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 12h10l-1 10 10-10H11l1-10z" />
                </svg>
                <span className="text-white text-xl font-bold">supabase</span>
              </div>

              {/* Leap */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-white rounded-md transform rotate-45"></div>
                <span className="text-white text-xl font-bold">Leap</span>
              </div>

              {/* Payload */}
              <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                </svg>
                <span className="text-white text-xl font-bold">Payload</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Divider Line */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-16 relative mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Reach humans,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              not spam folders
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Enterprise-grade email infrastructure designed for maximum
            deliverability and compliance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "Proactive blocklist tracking",
              desc: "Be the first to know if your domain is added to a DNSBLs such as those offered by Spamhaus with removal requests generated by Resend.",
              gradient: "from-blue-500/10 to-blue-600/5",
              iconColor: "text-blue-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Faster Time to Inbox",
              desc: "Send emails from the region closest to your users. Reduce delivery latency with North American, South American, European, and Asian regions.",
              gradient: "from-purple-500/10 to-purple-600/5",
              iconColor: "text-purple-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
              title: "Build confidence with BIMI",
              desc: "Showcase your logo and company branding with BIMI. Receive guidance on how to obtain a VMC - the email equivalent of a checkmark on social media.",
              gradient: "from-green-500/10 to-green-600/5",
              iconColor: "text-green-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              ),
              title: "Prospects who are ready",
              desc: "With one click, built-in waterfall enrichment pulls their verified emails and phone numbers from the market’s top providers.",
              gradient: "from-orange-500/10 to-orange-600/5",
              iconColor: "text-orange-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ),
              title: "Run sequence for multiple prospects",
              desc: "Automate email follow-ups, LinkedIn actions, WhatsApp messages, and calls from 1 sequence.",
              gradient: "from-red-500/10 to-red-600/5",
              iconColor: "text-red-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
              title: "IP and domain monitoring",
              desc: "Monitor your DNS configuration for any errors or regressions. Be notified of any changes that could hinder your deliverability.",
              gradient: "from-cyan-500/10 to-cyan-600/5",
              iconColor: "text-cyan-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Don’t land in the spam folder, ever again",
              desc: "It automates warm-up emails and gives you actionable tips to ensure your messaging always gets through.",
              gradient: "from-indigo-500/10 to-indigo-600/5",
              iconColor: "text-indigo-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              title: "Scale with AI",
              desc: "Use dynamic variables to automatically adapt message text, images, and landing pages with new insights to each lead.",
              gradient: "from-yellow-500/10 to-yellow-600/5",
              iconColor: "text-yellow-500",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
              title: "Prevent spoofing with DMARC",
              desc: "Avoid impersonation by creating DMARC policies and instructing inbox providers on how to treat unauthenticated email.",
              gradient: "from-pink-500/10 to-pink-600/5",
              iconColor: "text-pink-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-gradient-to-b from-slate-800/50 to-slate-800/20 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${item.iconColor}`}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-b from-slate-800/50 to-slate-800/20 border border-slate-700/50 rounded-3xl p-10 backdrop-blur">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: "100+",
                label: "Emails Sent Daily",
                icon: <Mail size={20} />,
              },
              {
                num: "2.5x",
                label: "Avg Response Rate",
                icon: <TrendingUp size={20} />,
              },
              { num: "70+", label: "Active Users", icon: <Users size={20} /> },
              { num: "99.9%", label: "Uptime", icon: <Zap size={20} /> },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <div className="text-blue-500">{stat.icon}</div>
                </div>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1.5">
                  {stat.num}
                </p>
                <p className="text-slate-400 font-medium text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials - Auto-scrolling Carousel */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-6 py-16 overflow-hidden"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Beyond expectations
          </h2>
          <p className="text-slate-400 text-sm max-w-3xl mx-auto">
            Resend is driving remarkable developer experiences that enable
            success stories, empower businesses, and fuel growth across
            industries and individuals.
          </p>
        </div>

        {/* Auto-scrolling Container */}
        <div className="relative">
          {/* Scrolling Testimonials */}
          <div className="flex gap-5 animate-scroll hover:pause-animation">
            {[
              {
                name: "Brek Gon",
                role: "Founder of Hammr",
                content:
                  "Resend is super easy to set up. Loving the modern approach. The team is taking messaging. Amazing! Never been a fan of other clunky tools.",
                avatar: "bg-gradient-to-br from-red-500 to-orange-500",
              },
              {
                name: "Vlad Matsiiako",
                role: "Co-founder of Infisical",
                content:
                  "Our team loves Resend. It makes email sending so easy and reliable. After we switched to Docusend, our deliverability improved tremendously and we don't hear complaints about emails anymore.",
                avatar: "bg-gradient-to-br from-yellow-500 to-yellow-600",
              },
              {
                name: "Brandon Strittmatter",
                role: "Co-founder of Outerbase",
                content:
                  "I've used Mailgun, Sendgrid, and Mandrill and they don't come close to providing the quality of developer experience you get with Resend.",
                avatar: "bg-gradient-to-br from-gray-500 to-gray-600",
              },
              {
                name: "Sharise Kabir",
                role: "Founder at Ruby Card",
                content:
                  "Resend is an amazing product. It was so easy to switch over. I feel confident knowing that all our transactional emails are in good hands with Resend. Everyone should be using this.",
                avatar: "bg-gradient-to-br from-blue-500 to-cyan-500",
              },
              // Duplicate for seamless loop
              {
                name: "Brek Gon",
                role: "Founder of Hammr",
                content:
                  "Resend is super easy to set up. Loving the modern approach. The team is taking messaging. Amazing! Never been a fan of other clunky tools.",
                avatar: "bg-gradient-to-br from-red-500 to-orange-500",
              },
              {
                name: "Vlad Matsiiako",
                role: "Co-founder of Infisical",
                content:
                  "Our team loves Resend. It makes email sending so easy and reliable. After we switched to Docusend, our deliverability improved tremendously and we don't hear complaints about emails anymore.",
                avatar: "bg-gradient-to-br from-yellow-500 to-yellow-600",
              },
              {
                name: "Brandon Strittmatter",
                role: "Co-founder of Outerbase",
                content:
                  "I've used Mailgun, Sendgrid, and Mandrill and they don't come close to providing the quality of developer experience you get with Resend.",
                avatar: "bg-gradient-to-br from-gray-500 to-gray-600",
              },
              {
                name: "Sharise Kabir",
                role: "Founder at Ruby Card",
                content:
                  "Resend is an amazing product. It was so easy to switch over. I feel confident knowing that all our transactional emails are in good hands with Resend. Everyone should be using this.",
                avatar: "bg-gradient-to-br from-blue-500 to-cyan-500",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[400px] bg-gradient-to-b from-slate-800/50 to-slate-800/20 border border-slate-700/50 rounded-2xl p-6 backdrop-blur"
              >
                <p className="text-slate-300 mb-5 leading-relaxed text-sm line-clamp-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                  <div className="flex -space-x-2">
                    <div
                      className={`w-10 h-10 ${testimonial.avatar} rounded-full border-2 border-slate-800`}
                    ></div>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full border-2 border-slate-800"></div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 40s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* CTA Section */}
      <section className="max-w-9xl mx-auto px-8 py-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>

        <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-800/40 border border-slate-700/50 rounded-3xl p-10 md:p-12 backdrop-blur-xl">
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Transform
            </span>{" "}
            Your Outreach?
          </h2>
          <p className="text-base text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals already using Seven to land their
            dream opportunities.
          </p>

          <button
            type="button"
            onClick={async () => {
              try {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                  },
                });
                if (error) throw error;
              } catch (err) {
                console.error("Google Auth Error:", err.message);
              }
            }}
            className="group inline-flex px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold transition-all duration-200 text-sm items-center gap-2 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            Get Started Free
          </button>

          <p className="text-slate-400 text-xs mt-5">
            No credit card required • 14-day free trial
          </p>

          {/* White Divider Line */}
          <div className="max-w-7xl mx-auto px-6 mt-30 ">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>

          <footer className="border-t border-slate-800/50 mt-35">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid md:grid-cols-4 gap-10 mb-10">
                <div>
                  <div className="text-xl font-bold text-white mb-3 ml-7 flex items-center gap-2">
                    Seven
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                   Send cold emails at scaleee . Get more opportunity, land more
                    opportunities .
                  </p>
                </div>

                <div>
                  <p className="text-white font-semibold mb-3 text-sm">
                    Product
                  </p>
                  <ul className="space-y-2 text-slate-400 text-xs">
                    <li>
                      <a
                        href="#features"
                        className="hover:text-white transition-colors"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#pricing"
                        className="hover:text-white transition-colors"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Changelog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Roadmap
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-white font-semibold mb-3 text-sm">
                    Company
                  </p>
                  <ul className="space-y-2 text-slate-400 text-xs">
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-white font-semibold mb-3 text-sm">Legal</p>
                  <ul className="space-y-2 text-slate-400 text-xs">
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Compliance
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-400/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-xs">
                  &copy; 2025 Seven. All rights reserved.
                </p>
                <div className="flex gap-5">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/Exxtraa/Seven"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* Footer
      <footer className="border-t border-slate-800/50 bg-slate-950/50 backdrop-blur mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                Seven
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Send cold emails at scale. Get more conversations, land more
                opportunities.
              </p>
            </div>

            <div>
              <p className="text-white font-semibold mb-3 text-sm">Product</p>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold mb-3 text-sm">Company</p>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold mb-3 text-sm">Legal</p>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs">
              &copy; 2025 Seven. All rights reserved.
            </p>
            <div className="flex gap-5">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://github.com/Exxtraa/Seven"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
