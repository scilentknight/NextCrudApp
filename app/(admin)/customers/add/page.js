"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserPlus, User, Mail, Phone, MapPin, Lock, Loader2 } from "lucide-react";

export default function AddCustomerPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!form.password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create customer.");
      }

      router.push("/customers");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/customers" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Link>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Add Customer</h1>
          <p className="text-slate-500 mt-1">Create a new customer account.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">Customer Information</h2>
                <p className="text-xs text-slate-500">Enter the customer's account details.</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Error */}
            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="customer@example.com" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

                <textarea name="address" value={form.address} onChange={handleChange} placeholder="Enter customer address" rows={3} className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none resize-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
              </div>

              <p className="text-xs text-slate-400 mt-2">Password should be securely hashed before production use.</p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-slate-800">Account Status</p>
                <p className="text-xs text-slate-500 mt-1">Allow this customer to use their account.</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="sr-only peer" />

                {/* Track */}
                <div className="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-slate-900 transition-colors" />

                {/* Thumb */}
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
            <Link href="/customers" className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
              Cancel
            </Link>

            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Customer
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
