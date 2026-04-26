"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ShieldAlert, ShieldCheck, UserMinus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminCustomersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/users`);
            // Simulating data
            setUsers(res.data.length ? res.data : [
                { id: "1", name: "John Doe", email: "john@example.com", role: "USER", isBlocked: false, createdAt: "2024-10-01" },
                { id: "2", name: "Jane Smith", email: "jane@example.com", role: "USER", isBlocked: true, createdAt: "2024-10-05" },
            ]);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const toggleBlock = async (id: string, currentStatus: boolean) => {
        try {
            // await axios.put(`${API_URL}/users/${id}/block`, { isBlocked: !currentStatus });
            toast.success(currentStatus ? "User unblocked" : "User blocked");
            setUsers(users.map(u => u.id === id ? { ...u, isBlocked: !currentStatus } : u));
        } catch (error) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-outfit">Customers</h1>
                <p className="text-muted-foreground">Manage user accounts and access permissions.</p>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-20 flex justify-center"><Loader2 className="animate-spin" /></div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">User</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Joined</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4"><span className="text-xs font-mono uppercase font-bold text-muted-foreground">{user.role}</span></td>
                                        <td className="px-6 py-4 text-sm">{user.createdAt}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleBlock(user.id, user.isBlocked)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${user.isBlocked ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-50 text-red-600 hover:bg-red-100"
                                                    }`}
                                            >
                                                {user.isBlocked ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                                                {user.isBlocked ? "Unblock" : "Block User"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
