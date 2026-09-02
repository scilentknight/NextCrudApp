"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Pencil, User, Mail, Phone, MapPin, Calendar, ShieldCheck, Loader2 } from "lucide-react";

export default function ViewCustomerPage() {
  const params = useParams();
  const id = params.id;

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  async function fetchCustomer() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load customer.");
      }

      setCustomer(data);
    } catch (err) {
      setError(err.message || "Failed to load customer.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
        <p className="mt-3 text-sm text-slate-500">Loading customer...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="p-8">
        <div className="max-w-xl mx-auto text-center py-16">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
            <User className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">Customer not found</h2>

          <p className="mt-2 text-sm text-slate-500">{error || "The requested customer does not exist."}</p>

          <Link href="/customers" className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4" />
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link href="/customers" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Customers
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Customer Details</h1>

          <p className="text-slate-500 mt-1">View customer account information.</p>
        </div>

        <Link href={`/customers/${customer.id}/edit`} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
          <Pencil className="w-4 h-4" />
          Edit Customer
        </Link>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-700">{customer.name?.trim()?.charAt(0)?.toUpperCase() || "U"}</span>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900">{customer.name}</h2>

              <p className="text-sm text-slate-500 mt-1">Customer ID #{customer.id}</p>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium capitalize">{customer.role || "Customer"}</span>

                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${customer.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{customer.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Contact Information</h2>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem icon={Mail} label="Email" value={customer.email} />

            <InfoItem icon={Phone} label="Phone" value={customer.phone || "Not provided"} />

            <InfoItem icon={MapPin} label="Address" value={customer.address || "Not provided"} />

            <InfoItem icon={ShieldCheck} label="Role" value={customer.role || "customer"} />
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Account Information</h2>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem icon={Calendar} label="Joined" value={formatDate(customer.createdAt)} />

            <InfoItem icon={Calendar} label="Last Updated" value={formatDate(customer.updatedAt)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>

        <p className="text-sm font-medium text-slate-800 mt-1 break-words">{value}</p>
      </div>
    </div>
  );
}
