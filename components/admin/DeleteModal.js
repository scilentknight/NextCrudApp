"use client";

import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

export default function DeleteModal({
  open,
  title = "Delete Product",
  message = "Are you sure you want to delete this product? This action cannot be undone.",
  itemName,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          {/* Content */}
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {message}
          </p>

          {itemName && (
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">
                Product
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900 truncate">
                {itemName}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}