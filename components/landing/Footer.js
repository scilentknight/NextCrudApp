import { Boxes } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Boxes className="h-4 w-4 text-slate-600" />

          <span className="font-semibold text-slate-800">
            AdminCrud
          </span>
        </div>

        <p className="text-slate-500">
          © {new Date().getFullYear()} AdminCrud. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}