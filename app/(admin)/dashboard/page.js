"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Boxes,
  DollarSign,
  ArrowUpRight,
  Plus,
  Loader2,
} from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0,
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price || 0) * Number(product.quantity || 0),
    0,
  );

  const RsIcon = ({ size = 16, className = "" }) => (
    <span className={`font-bold ${className}`} style={{ fontSize: size }}>
      RS
    </span>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Overview of your product inventory.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-7 h-7 animate-spin text-slate-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Products */}
            <StatCard
              title="Total Products"
              value={totalProducts}
              icon={Package}
              description="Products in catalog"
            />

            {/* Stock */}
            <StatCard
              title="Total Stock"
              value={totalStock}
              icon={Boxes}
              description="Items currently available"
            />

            {/* Value */}
            <StatCard
              title="Inventory Value"
              value={`RS ${inventoryValue.toFixed(2)}`}
              icon={RsIcon}
              description="Total stock value"
            />
          </div>

          {/* Recent products */}
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="font-semibold text-slate-900">Products</h2>

                <p className="text-sm text-slate-500 mt-1">
                  Recently available products
                </p>
              </div>

              <Link
                href="/admin/products"
                className="text-sm font-medium text-slate-700 hover:text-slate-950"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {products.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-600" />
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        {product.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {product.quantity} items
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-medium text-slate-900">
                      ${Number(product.price).toFixed(2)}
                    </span>

                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Link>
              ))}

              {products.length === 0 && (
                <div className="py-12 text-center text-sm text-slate-500">
                  No products found.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>

          <p className="text-xs text-slate-500 mt-2">{description}</p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-slate-700" />
        </div>
      </div>
    </div>
  );
}
