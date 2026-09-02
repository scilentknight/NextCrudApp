export default function AdminFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} AdminPanel. All rights reserved.</p>

        <p className="text-xs text-slate-400">Admin Dashboard</p>
      </div>
    </footer>
  );
}
