import React from "react";
import DOMPurify from "dompurify";
import { Mail } from "lucide-react";

export default function Inbox({
  gmailConnected,
  loading,
  emails,
  selectedEmail,
  setSelectedEmail,
  formatEmailTime,
  connectGmail,
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* LEFT SIDE — Email List */}
      <div className="w-96 border-r border-slate-800 overflow-y-auto h-full bg-[#0a0a0a]">
        {!gmailConnected ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Mail size={36} className="text-slate-500 mb-4" />
            <h3 className="text-lg font-semibold">Connect Gmail</h3>
            <p className="text-sm text-slate-400 mb-6">
              Connect Gmail to manage your inbox
            </p>
            <button
              onClick={connectGmail}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            >
              Connect Gmail
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-12 w-12 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Email Count */}
            <div className="px-4 py-3 border-b border-slate-800">
              <p className="text-sm text-slate-400">
                {emails.length} {emails.length === 1 ? "email" : "emails"}
              </p>
            </div>

            {/* All Emails */}
            {emails.map((email, i) => (
              <button
                key={email.id || i}
                onClick={() => setSelectedEmail(email)}
                className={`w-full p-4 border-b border-slate-800 hover:bg-slate-900/50 text-left ${
                  selectedEmail?.id === email.id ? "bg-slate-900/50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {email.from?.charAt(0)?.toUpperCase() || "?"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold truncate">{email.from}</p>
                      <span className="text-xs text-slate-500">
                        {formatEmailTime(email.date)}
                      </span>
                    </div>

                    <p className="truncate text-slate-300">
                      {email.subject || "(No Subject)"}
                    </p>

                    <p className="text-xs text-slate-500 truncate">
                      {email.snippet || "No preview available"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </>
        )}
      </div>

      {/* RIGHT SIDE — Email Details */}
      <div className="flex-1 overflow-y-auto">
        {!selectedEmail ? (
          <div className="text-center flex items-center justify-center h-full">
            <Mail size={48} className="text-slate-600 " />
            <p className="mr-17 text-slate-400 text-1xl ml-2">
              Select an email to view details
            </p>
          </div>
        ) : (
          <div className="max-w-3xl p-8 text-sm">
            <h2 className="text-lg font-semibold mb-2">
              {selectedEmail.subject}
            </h2>

            <p className="text-slate-400 mb-3">
              From: {selectedEmail.from} | {formatEmailTime(selectedEmail.date)}
            </p>

            <div className="border-t border-slate-800 pt-3 text-slate-300 leading-relaxed">
              {selectedEmail.htmlBody ? (
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.htmlBody }}
                ></div>
              ) : (
                <p>{selectedEmail.textBody || "No content available"}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
