"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    ShoppingBag,
    Users,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

const stats = [
    { label: "Total Revenue", value: "$12,845.00", icon: TrendingUp, trend: "+12.5%", positive: true },
    { label: "Total Orders", value: "156", icon: ShoppingBag, trend: "+8.2%", positive: true },
    { label: "Active Customers", value: "842", icon: Users, trend: "+3.1%", positive: true },
    { label: "Low Stock Items", value: "4", icon: AlertTriangle, trend: "-2.4%", positive: false },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-outfit mb-2">Overview</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-xl">
                                <stat.icon className="h-6 w-6 text-accent" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                                {stat.trend}
                                {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table Placeholder */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-6">Recent Orders</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((order) => (
                            <div key={order} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-slate-50 transition-colors rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center font-bold"># {1000 + order}</div>
                                    <div>
                                        <p className="text-sm font-medium">John Doe</p>
                                        <p className="text-xs text-muted-foreground">2 items • $129.00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] uppercase font-bold rounded-full">Pending</span>
                                    <p className="text-xs text-muted-foreground">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        Low Stock Alerts
                        <span className="h-5 w-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">4</span>
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center gap-4 p-3 border rounded-xl bg-red-50/50">
                                <div className="h-12 w-12 rounded-lg bg-slate-200" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Leather Wallet</p>
                                    <p className="text-xs text-red-600 font-bold">Only {item} left</p>
                                </div>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Restock</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
