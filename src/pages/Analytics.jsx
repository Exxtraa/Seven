import React from "react";

export default function Analytics() {
  return (
    <div className="w-full h-full flex flex-col p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-5">
        <div className="p-6 bg-[#1a1a1a] border border-slate-800 rounded-xl">
          <p className="text-xl font-semibold">Total Leads</p>
          <p className="text-4xl font-bold mt-2">128</p>
        </div>

        <div className="p-6 bg-[#1a1a1a] border border-slate-800 rounded-xl">
          <p className="text-xl font-semibold">Emails Sent</p>
          <p className="text-4xl font-bold mt-2">53</p>
        </div>

        <div className="p-6 bg-[#1a1a1a] border border-slate-800 rounded-xl">
          <p className="text-xl font-semibold">Scheduled</p>
          <p className="text-4xl font-bold mt-2">12</p>
        </div>
      </div>
    </div>
  );
}
