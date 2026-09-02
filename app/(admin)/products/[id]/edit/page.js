"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Save, Loader2 } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

        setForm({
          name: data.name ?? "",
          price: data.price ?? "",
          quantity: data.quantity ?? "",
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (form.price === "" || Number(form.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (form.quantity === "" || Number(form.quantity) < 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update product.");
      }

      router.push(`/products`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

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

  if (error && !form.name) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-800">Unable to load product</h2>

            <p className="text-sm text-red-600 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/products`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-5">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>

              <p className="text-sm text-slate-500 mt-1">Update product information and inventory.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="p-6 sm:p-8 space-y-6">
              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-800 mb-2">
                  Product Name
                </label>

                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-gray-600 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-800 mb-2">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">RS </span>

                  <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-sm text-gray-600 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-800 mb-2">
                  Quantity
                </label>

                <input id="quantity" name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-gray-600 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 sm:px-8 py-5 rounded-b-2xl">
              <Link href={`/products`} className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                Cancel
              </Link>

              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
