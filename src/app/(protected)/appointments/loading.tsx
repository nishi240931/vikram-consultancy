import React from "react";

export default function StudentAppointmentsLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-slate-200 rounded-xl w-64 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-60 bg-white rounded-2xl p-6 border border-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
