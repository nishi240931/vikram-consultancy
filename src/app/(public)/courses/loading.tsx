import React from "react";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <div className="h-6 w-36 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-10 w-96 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-4 w-80 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-2xl bg-white border border-slate-200 p-4 flex flex-col gap-4 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-16 bg-slate-100 rounded-xl w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
