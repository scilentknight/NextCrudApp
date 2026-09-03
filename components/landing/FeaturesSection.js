import {
  BarChart3,
  Boxes,
  ClipboardList,
  Package,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Package,
      title: "Product Management",
      description:
        "Create, view, update, and delete products with a clean and organized interface.",
    },
    {
      icon: Boxes,
      title: "Inventory Tracking",
      description:
        "Monitor available quantities and quickly identify products that are out of stock.",
    },
    {
      icon: BarChart3,
      title: "Dashboard Overview",
      description:
        "View important product and inventory information from one centralized dashboard.",
    },
    {
      icon: ClipboardList,
      title: "Organized Data",
      description:
        "Search, paginate, and manage your growing product catalog efficiently.",
    },
    {
      icon: TrendingUp,
      title: "Inventory Insights",
      description:
        "Keep track of your stock levels and understand the value of your inventory.",
    },
    {
      icon: ShieldCheck,
      title: "Admin Control",
      description:
        "A dedicated admin area helps keep management features organized and protected.",
    },
  ];

  return (
    <section
      id="features"
      className="border-y border-slate-200 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Everything you need
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Built for simple product management
          </h2>

          <p className="mt-4 text-slate-600">
            A focused admin experience without unnecessary complexity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white transition group-hover:bg-slate-900">
        <Icon className="h-5 w-5 text-slate-700 transition group-hover:text-white" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}