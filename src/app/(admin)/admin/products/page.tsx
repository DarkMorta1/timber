"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Eye } from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const products = [
    { id: "1", name: "Classic Oak Chair", category: "Furniture", price: 299, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000" },
    { id: "2", name: "Minimalist Desk Lamp", category: "Lighting", price: 159, stock: 5, status: "Low Stock", image: "https://images.unsplash.com/photo-1507473884658-c7a364d2b453?auto=format&fit=crop&q=80&w=1000" },
    { id: "3", name: "Premium Wool Throw", category: "Home", price: 89, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=1000" },
];

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-outfit mb-2">Products</h1>
                    <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
                </div>
                <Link href="/admin/products/new" className="btn-premium flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Link>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 transition-colors">
                            <Filter className="h-4 w-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Product</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Price</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-slate-200 overflow-hidden relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={product.image} alt="" className="object-cover h-full w-full" />
                                            </div>
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">{product.category}</td>
                                    <td className="px-6 py-4 text-sm font-bold">${product.price}</td>
                                    <td className="px-6 py-4 text-sm">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${product.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors" title="View">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Delete">
                                                <Trash2 className="h-4 w-4" />
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
