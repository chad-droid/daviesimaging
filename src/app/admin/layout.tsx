import type { Metadata } from "next";
import { AdminAuth } from "@/components/AdminAuth";

export const metadata: Metadata = {
  title: "Admin | Davies Imaging Group",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminAuth>{children}</AdminAuth>
    </div>
  );
}
