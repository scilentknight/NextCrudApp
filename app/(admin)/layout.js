import AdminAuth from "@/components/auth/AdminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Layout({ children }) {
  return (
    <AdminAuth>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuth>
  );
}
