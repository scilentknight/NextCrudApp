"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Pencil, DollarSign, Boxes, Calculator, Loader2, AlertCircle } from "lucide-react";

export default function ViewProductPage() {
  const params = useParams();

  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/products/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load product.");
        }

        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-slate-700 animate-spin" />

          <p className="text-sm text-slate-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />

            <div>
              <h2 className="font-semibold text-red-800">Product not found</h2>

              <p className="text-sm text-red-600 mt-1">{error || "The requested product does not exist."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const price = Number(product.price) || 0;
  const quantity = Number(product.quantity) || 0;
  const inventoryValue = price * quantity;

  const isInStock = quantity > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-5">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>

                <p className="text-sm text-slate-500 mt-1">Product ID: #{product.id}</p>
              </div>
            </div>
          </div>

          <Link href={`/products/${product.id}/edit`} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
            <Pencil className="w-4 h-4" />
            Edit Product
          </Link>
        </div>

        {/* Product Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Price */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Unit Price</p>

                <p className="text-2xl font-bold text-slate-900 mt-2">RS {price.toFixed(2)}</p>
              </div>

              <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-700">RS</span>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Stock Quantity</p>

                <p className="text-2xl font-bold text-slate-900 mt-2">{quantity}</p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                <Boxes className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Inventory Value */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Inventory Value</p>

                <p className="text-2xl font-bold text-slate-900 mt-2">RS {inventoryValue.toFixed(2)}</p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Product Information</h2>

            <p className="text-sm text-slate-500 mt-1">Detailed information about this product.</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400">Product ID</p>

                <p className="text-sm font-medium text-slate-900 mt-2">#{product.id}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400">Product Name</p>

                <p className="text-sm font-medium text-slate-900 mt-2">{product.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400">Price</p>

                <p className="text-sm font-medium text-slate-900 mt-2">RS {price.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400">Quantity</p>

                <p className="text-sm font-medium text-slate-900 mt-2">{quantity}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400">Stock Status</p>

                <div className="mt-2">{isInStock ? <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">In Stock</span> : <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Out of Stock</span>}</div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400">Total Inventory Value</p>

                <p className="text-sm font-medium text-slate-900 mt-2">RS {inventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}
