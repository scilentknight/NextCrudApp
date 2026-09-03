import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-slate-700" />
            Simple. Powerful. Organized.
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Manage your products
            <span className="block text-slate-500">
              with confidence.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            AdminCrud is a clean and modern product management system
            designed to help you organize inventory, manage stock, and
            track your products from one powerful dashboard.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/admin"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/admin/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              <Package className="h-4 w-4" />
              Manage Products
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-slate-700" />
              Product Management
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-slate-700" />
              Inventory Tracking
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-slate-700" />
              Admin Dashboard
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}