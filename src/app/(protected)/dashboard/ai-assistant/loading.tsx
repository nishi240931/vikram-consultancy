import React from "react";

export default function AIAssistantLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-xl w-64 mx-auto" />
        <div className="h-[500px] bg-white rounded-3xl border border-slate-200 p-6" />
      </div>
    </div>
  );
}
