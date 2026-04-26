"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminLogin = pathname === "/admin/login";

    if (isAdminLogin) {
        return <>{children}</>;
    }

    return (
        <ProtectedRoute adminOnly>
            <div className="min-h-screen bg-slate-50 flex">
                <AdminSidebar />
                <main className="flex-1 ml-64 p-12">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
