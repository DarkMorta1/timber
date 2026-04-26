"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                localStorage.setItem("redirectAfterLogin", pathname);
                router.push(adminOnly ? "/admin/login" : "/login");
            } else if (adminOnly && user.role !== "ADMIN") {
                router.push("/");
            }
        }
    }, [user, loading, router, pathname, adminOnly]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-accent" />
            </div>
        );
    }

    if (!user) return null;
    if (adminOnly && user.role !== "ADMIN") return null;

    return <>{children}</>;
};
