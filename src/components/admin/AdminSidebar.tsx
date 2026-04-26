"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Package,
    Layers,
    ShoppingBag,
    Image as ImageIcon,
    Users,
    Settings,
    ChevronRight,
    LogOut,
    HelpCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: Layers, label: "Categories", href: "/admin/categories" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: ImageIcon, label: "Banners", href: "/admin/banners" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: HelpCircle, label: "FAQs", href: "/admin/faqs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r flex flex-col z-50">
            <div className="p-8">
                <h1 className="text-2xl font-bold tracking-widest font-outfit">TIMBER <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full align-middle ml-1">ADMIN</span></h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent/10 text-muted-foreground hover:text-accent"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "group-hover:text-accent")} />
                                {item.label}
                            </div>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
