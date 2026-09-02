"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Package, Eye, Pencil, Trash2, Loader2 } from "lucide-react";

import DeleteModal from "@/components/admin/DeleteModal";
import Pagination from "@/components/admin/Pagination";
import usePagination from "@/hooks/usePagination";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load products");
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(product) {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    if (deleting) return;

    setDeleteModalOpen(false);
    setSelectedProduct(null);
  }

  async function deleteProduct() {
    if (!selectedProduct) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete product");
      }

      setProducts((current) => current.filter((product) => product.id !== selectedProduct.id));

      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  }

  // Search
  const filteredProducts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return products;
    }

    return products.filter((product) => product.name?.toLowerCase().includes(searchValue));
  }, [products, search]);

  // Pagination
  const { currentPage, itemsPerPage, paginatedItems: paginatedProducts, setCurrentPage, setItemsPerPage } = usePagination(filteredProducts, 10);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  function handleItemsPerPageChange(e) {
    setItemsPerPage(e.target.value);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Products</h1>

          <p className="text-slate-500 mt-1">Manage your product inventory.</p>
        </div>

        <Link href="/admin/products/new" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
          <Plus className="w-4 h-4" />
          Add Product
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

          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-slate-600" />

            <p className="mt-3 text-sm text-slate-500">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Product</th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Price</th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Stock</th>

                    <th className="text-right px-14 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition">
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                            <span className="text-sm font-semibold text-slate-700">{product.name?.charAt(0).toUpperCase()}</span>
                          </div>

                          <div>
                            <p className="font-medium text-slate-900">{product.name}</p>

                            <p className="text-xs text-slate-500">ID #{product.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">RS {Number(product.price).toFixed(2)}</td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${Number(product.quantity) > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{Number(product.quantity) > 0 ? `${product.quantity} in stock` : "Out of stock"}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/view`} title="View" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition">
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link href={`/admin/products/${product.id}/edit`} title="Edit" className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition">
                            <Pencil className="w-4 h-4" />
                          </Link>

                          <button type="button" onClick={() => openDeleteModal(product)} title="Delete" className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="py-16 text-center">
                  <Package className="w-10 h-10 mx-auto text-slate-300" />

                  <p className="mt-3 text-sm font-medium text-slate-700">No products found</p>

                  <p className="text-sm text-slate-500 mt-1">{search ? "Try another search." : "There are no products yet."}</p>
                </div>
              )}
            </div>

            {/* Reusable Pagination */}
            <Pagination totalItems={filteredProducts.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} onItemsPerPageChange={setItemsPerPage} />
          </>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal open={deleteModalOpen} title="Delete Product" message="Are you sure you want to delete this product? This action cannot be undone." itemName={selectedProduct?.name} loading={deleting} onConfirm={deleteProduct} onCancel={closeDeleteModal} />
    </div>
  );
}
