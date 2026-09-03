"use client";

export default function LoadingScreen({
  title = "Checking authorization",
  message = "Please wait a moment...",
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative mx-auto w-14 h-14 mb-5">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />

          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-sm">I</span>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>

        <p className="text-sm text-slate-500 mt-1">{message}</p>

        {/* Loading dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
