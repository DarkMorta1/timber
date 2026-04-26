"use client";

import { useState } from "react";
import { Search, Eye, Download, MoreVertical, Filter, ChevronRight } from "lucide-react";

const orders = [
    { id: "ORD-K283J9L", date: "Oct 24, 2024", customer: "John Doe", email: "john@example.com", total: 314.00, status: "Pending", items: 2 },
    { id: "ORD-M912P4X", date: "Oct 23, 2024", customer: "Sarah Smith", email: "sarah@example.com", total: 159.00, status: "Shipped", items: 1 },
    { id: "ORD-B059A1W", date: "Oct 22, 2024", customer: "Mike Johnson", email: "mike@example.com", total: 850.00, status: "Delivered", items: 3 },
    { id: "ORD-H741C5Q", date: "Oct 21, 2024", customer: "Emma Wilson", email: "emma@example.com", total: 45.00, status: "Cancelled", items: 1 },
];

const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-outfit mb-2">Orders</h1>
                <p className="text-muted-foreground">Monitor and manage all customer purchases.</p>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 transition-colors">
                            <Filter className="h-4 w-4" /> Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 transition-colors">
                            <Download className="h-4 w-4" /> Export
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Total</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-sm font-bold">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">{order.items} Items</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${(statusStyles as any)[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-accent hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest border border-slate-200">
                                                View Details <ChevronRight className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
