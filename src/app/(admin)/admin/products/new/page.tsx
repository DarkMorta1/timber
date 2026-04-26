"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [variants, setVariants] = useState<{ name: string; stock: number; price?: number }[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // In a real app, this would upload to Cloudinary
        // Mocking image upload
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImages((prev) => [...prev, e.target?.result as string]);
                    toast.success("Image uploaded (mock)");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const addVariant = () => {
        setVariants((prev) => [...prev, { name: "", stock: 0 }]);
    };

    const removeVariant = (index: number) => {
        setVariants((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Product created successfully");
            router.push("/admin/products");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="space-y-8 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-outfit">Add New Product</h1>
                    <p className="text-muted-foreground">Fill in the details for your new crafted piece.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 rounded-2xl space-y-6">
                        <h3 className="text-lg font-bold">General Information</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                    placeholder="e.g. Classic Oak Chair"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                    placeholder="Describe the product, its materials, and craftsmanship..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-2xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Variants</h3>
                            <button type="button" onClick={addVariant} className="text-sm font-bold text-accent flex items-center gap-1 hover:underline">
                                <Plus className="h-4 w-4" /> Add Variant
                            </button>
                        </div>

                        {variants.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic text-center py-4">No variants added. Base pricing will be used.</p>
                        ) : (
                            <div className="space-y-4">
                                {variants.map((variant, i) => (
                                    <div key={i} className="flex gap-4 items-end animate-in slide-in-from-top-2">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-xs font-bold uppercase text-muted-foreground">Name</label>
                                            <input type="text" placeholder="Size: M, Color: Black" className="w-full px-4 py-2 border rounded-lg" />
                                        </div>
                                        <div className="w-32 space-y-2">
                                            <label className="text-xs font-bold uppercase text-muted-foreground">Stock</label>
                                            <input type="number" placeholder="0" className="w-full px-4 py-2 border rounded-lg" />
                                        </div>
                                        <div className="w-32 space-y-2">
                                            <label className="text-xs font-bold uppercase text-muted-foreground">Price</label>
                                            <input type="number" placeholder="$" className="w-full px-4 py-2 border rounded-lg" />
                                        </div>
                                        <button type="button" onClick={() => removeVariant(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg h-10">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="glass-card p-8 rounded-2xl space-y-6">
                        <h3 className="text-lg font-bold">Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label className="aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-slate-50 transition-all group">
                                <Upload className="h-8 w-8 text-muted-foreground group-hover:text-accent " />
                                <span className="text-xs font-medium">Upload Image</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>

                            {images.map((img, i) => (
                                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt="" className="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="glass-card p-8 rounded-2xl space-y-6">
                        <h3 className="text-lg font-bold">Metadata</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none bg-white">
                                    <option>Select Category</option>
                                    <option>Furniture</option>
                                    <option>Lighting</option>
                                    <option>Decor</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Base Price</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <input type="number" step="0.01" className="w-full pl-8 pr-4 py-2 border rounded-lg" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Discount Price (Optional)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <input type="number" step="0.01" className="w-full pl-8 pr-4 py-2 border rounded-lg" placeholder="0.00" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-2xl space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="h-5 w-5 accent-accent" />
                            <span className="text-sm font-medium">Featured Product</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="h-5 w-5 accent-accent" defaultChecked />
                            <span className="text-sm font-medium">Active on Site</span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-4"
                        >
                            {loading ? "Creating..." : "Create Product"}
                        </button>
                        <Link href="/admin/products" className="w-full py-4 text-center text-sm font-bold uppercase tracking-widest hover:bg-slate-100 rounded-full transition-colors">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
