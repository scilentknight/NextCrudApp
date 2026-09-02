"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function AdminHeader({ setMobileOpen }) {
  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
        <Link href="/admin" className="font-bold text-xl text-slate-900">
          AdminPanel
        </Link>

        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8">
        {/* Left */}
        <div>
          <p className="text-sm text-slate-500">Administration</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">A</div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Admin</p>

            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </header>
    </>
  );
}
