"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <AdminHeader setMobileOpen={setMobileOpen} />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
