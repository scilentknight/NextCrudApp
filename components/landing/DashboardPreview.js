import { Boxes, Package } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section
      id="overview"
      className="bg-slate-50 pb-20 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/60 sm:p-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-slate-900" />

                <div>
                  <div className="h-3 w-24 rounded bg-slate-200" />
                  <div className="mt-2 h-2.5 w-16 rounded bg-slate-100" />
                </div>
              </div>

              <div className="h-9 w-24 rounded-lg bg-slate-900" />
            </div>

            {/* Stats */}
            <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
              <PreviewCard
                title="Total Products"
                value="24"
                icon={Package}
              />

              <PreviewCard
                title="Total Stock"
                value="186"
                icon={Boxes}
              />

              <PreviewCard
                title="Inventory Value"
                value="RS 45,800"
                isRs
              />
            </div>

            {/* Products */}
            <div className="mx-4 mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white sm:mx-6 sm:mb-6">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    Recent Products
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Overview of your inventory
                  </p>
                </div>

                <div className="h-8 w-20 rounded-lg bg-slate-100" />
              </div>

              <div className="divide-y divide-slate-100">
                <PreviewProduct
                  name="Wireless Headphones"
                  stock="18 in stock"
                  price="RS 3,500"
                />

                <PreviewProduct
                  name="Smart Watch"
                  stock="12 in stock"
                  price="RS 5,200"
                />

                <PreviewProduct
                  name="Mechanical Keyboard"
                  stock="Out of stock"
                  price="RS 7,800"
                  outOfStock
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ title, value, icon: Icon, isRs = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          {isRs ? (
            <span className="font-bold text-slate-700">RS</span>
          ) : (
            <Icon className="h-5 w-5 text-slate-700" />
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewProduct({
  name,
  stock,
  price,
  outOfStock = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
          <Package className="h-4 w-4 text-slate-600" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            {name}
          </p>

          <p
            className={`mt-1 text-xs ${
              outOfStock ? "text-red-600" : "text-slate-500"
            }`}
          >
            {stock}
          </p>
        </div>
      </div>

      <p className="text-sm font-semibold text-slate-900">
        {price}
      </p>
    </div>
  );
}