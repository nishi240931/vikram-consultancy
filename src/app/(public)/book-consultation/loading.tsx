import React from "react";

export default function BookConsultationLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-2xl w-3/4 mx-auto" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
        <div className="h-64 bg-white border border-slate-200 rounded-3xl p-6" />
      </div>
    </div>
  );
}
