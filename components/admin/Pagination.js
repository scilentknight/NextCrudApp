"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalItems, currentPage, itemsPerPage, onPageChange, onItemsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems === 0) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t border-slate-200">
      {/* Left */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-slate-500 whitespace-nowrap">
          Showing <span className="font-medium text-slate-700">{startItem}</span> to <span className="font-medium text-slate-700">{endItem}</span> of <span className="font-medium text-slate-700">{totalItems}</span>
        </p>
      </div>

      {/* Right */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button type="button" disabled={currentPage === 1} onClick={() => onPageChange(Math.max(currentPage - 1, 1))} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} type="button" onClick={() => onPageChange(page)} className={`min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition ${currentPage === page ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
              {page}
            </button>
          ))}

          {/* Next */}
          <button type="button" disabled={currentPage === totalPages} onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
