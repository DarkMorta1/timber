"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const initialCategories = [
    { id: "1", name: "Furniture", slug: "furniture", productCount: 24, image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=100" },
    { id: "2", name: "Lighting", slug: "lighting", productCount: 15, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=100" },
    { id: "3", name: "Decor", slug: "decor", productCount: 38, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=100" },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState(initialCategories);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-outfit mb-2">Categories</h1>
                    <p className="text-muted-foreground">Organize your products into collections.</p>
                </div>
                <button className="btn-premium flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Category
                </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Slug</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Count</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-slate-200 overflow-hidden relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={cat.image} alt="" className="object-cover h-full w-full" />
                                            </div>
                                            <span className="font-bold">{cat.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{cat.slug}</td>
                                    <td className="px-6 py-4 text-sm">{cat.productCount} Products</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><Edit className="h-4 w-4" /></button>
                                            <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
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
