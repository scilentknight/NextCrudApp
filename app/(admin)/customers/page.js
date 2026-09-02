"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Users, Eye, Pencil, Trash2, Loader2, UserPlus } from "lucide-react";

import DeleteModal from "@/components/admin/DeleteModal";
import Pagination from "@/components/admin/Pagination";
import usePagination from "@/hooks/usePagination";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);

      const response = await fetch("/api/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load customers");
      }

      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(customer) {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    if (deleting) return;

    setDeleteModalOpen(false);
    setSelectedCustomer(null);
  }

  async function deleteCustomer() {
    if (!selectedCustomer) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/users/${selectedCustomer.id}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete customer");
      }

      setCustomers((current) => current.filter((customer) => customer.id !== selectedCustomer.id));

      setDeleteModalOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to delete customer");
    } finally {
      setDeleting(false);
    }
  }

  // Search
  const filteredCustomers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return customers;
    }

    return customers.filter((customer) => customer.name?.toLowerCase().includes(searchValue) || customer.email?.toLowerCase().includes(searchValue) || customer.phone?.toLowerCase().includes(searchValue));
  }, [customers, search]);

  // Pagination
  const { currentPage, itemsPerPage, paginatedItems: paginatedCustomers, setCurrentPage, setItemsPerPage } = usePagination(filteredCustomers, 10);

  function handleItemsPerPageChange(e) {
    setItemsPerPage(e.target.value);
  }

  function getInitial(name) {
    return name?.trim()?.charAt(0)?.toUpperCase() || "U";
  }

  function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Customers</h1>

          <p className="text-slate-500 mt-1">Manage your customers and their accounts.</p>
        </div>

        <Link href="/customers/add" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
          <UserPlus className="w-4 h-4" />
          Add Customer
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        {/* Items Per Page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Show</span>

          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:ring-2 focus:ring-slate-200">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span className="text-sm text-slate-500">entries</span>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-slate-600" />

            <p className="mt-3 text-sm text-slate-500">Loading customers...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Role</th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Joined</th>

                    <th className="text-right px-14 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50 transition">
                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                            <span className="text-sm font-semibold text-slate-700">{getInitial(customer.name)}</span>
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">{customer.name || "Unnamed Customer"}</p>

                            <p className="text-xs text-slate-500">ID #{customer.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-slate-700">{customer.email || "—"}</p>

                          <p className="text-xs text-slate-500">{customer.phone || "No phone"}</p>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium capitalize">{customer.role || "Customer"}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${customer.isActive !== false ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{customer.isActive !== false ? "Active" : "Inactive"}</span>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{formatDate(customer.createdAt)}</td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/customers/${customer.id}/view`} title="View" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition">
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link href={`/customers/${customer.id}/edit`} title="Edit" className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition">
                            <Pencil className="w-4 h-4" />
                          </Link>

                          <button type="button" onClick={() => openDeleteModal(customer)} title="Delete" className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredCustomers.length === 0 && (
                <div className="py-16 text-center">
                  <Users className="w-10 h-10 mx-auto text-slate-300" />

                  <p className="mt-3 text-sm font-medium text-slate-700">No customers found</p>

                  <p className="text-sm text-slate-500 mt-1">{search ? "Try another search." : "There are no customers yet."}</p>
                </div>
              )}
            </div>

            {/* Reusable Pagination */}
            <Pagination totalItems={filteredCustomers.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} onItemsPerPageChange={setItemsPerPage} />
          </>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal open={deleteModalOpen} title="Delete Customer" message="Are you sure you want to delete this customer? This action cannot be undone." itemName={selectedCustomer?.name} loading={deleting} onConfirm={deleteCustomer} onCancel={closeDeleteModal} />
    </div>
  );
}
