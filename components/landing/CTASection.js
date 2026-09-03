import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-slate-950 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Boxes className="h-7 w-7 text-white" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to manage your inventory?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Access your dashboard and take complete control of your products
          and inventory.
        </p>

        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Open Admin Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}