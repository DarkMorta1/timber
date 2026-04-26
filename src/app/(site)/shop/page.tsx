"use client";

import { useState } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import { Filter, SlidersHorizontal, Grid2X2, LayoutList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
const products = [
    { id: "1", name: "Classic Oak Chair", slug: "classic-oak-chair", price: 299, category: "Furniture", images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000"] },
    { id: "2", name: "Minimalist Desk Lamp", slug: "minimalist-desk-lamp", price: 159, category: "Lighting", images: ["https://images.unsplash.com/photo-1507473884658-c7a364d2b453?auto=format&fit=crop&q=80&w=1000"] },
    { id: "3", name: "Premium Wool Throw", slug: "premium-wool-throw", price: 89, discountPrice: 69, category: "Home", images: ["https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=1000"] },
    { id: "4", name: "Stone Coffee Table", slug: "stone-coffee-table", price: 850, category: "Furniture", images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000"] },
    { id: "5", name: "Ceramic Vase Set", slug: "ceramic-vase-set", price: 45, category: "Decor", images: ["https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=1000"] },
    { id: "6", name: "Velvet Cushion", slug: "velvet-cushion", price: 35, category: "Home", images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000"] },
];

const categories = ["All", "Furniture", "Lighting", "Decor", "Home"];

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("newest");

    const filteredProducts = products.filter(p =>
        selectedCategory === "All" || p.category === selectedCategory
    );

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-20 bg-secondary">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6">Our Collection</h1>
                        <p className="max-w-2xl mx-auto text-muted-foreground">
                            Discover our carefully curated selection of premium home essentials, designed for timeless style and ultimate comfort.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar (Desktop) */}
                    <aside className="hidden lg:block w-64 space-y-12">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">Category</h3>
                            <div className="flex flex-col gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-sm text-left transition-colors ${selectedCategory === cat ? "text-accent font-bold" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">Price Range</h3>
                            <div className="space-y-4">
                                <input type="range" min="0" max="1000" className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent" />
                                <div className="flex justify-between text-xs font-medium">
                                    <span>$0</span>
                                    <span>$1000+</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">Sort By</h3>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-white border-none text-sm outline-none cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="featured">Featured First</option>
                            </select>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b">
                            <span className="text-sm text-muted-foreground font-medium">
                                Showing <span className="text-foreground">{filteredProducts.length}</span> products
                            </span>

                            <div className="flex items-center gap-4 lg:hidden">
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                                >
                                    <Filter className="h-4 w-4" /> Filters
                                </button>
                            </div>

                            <div className="hidden sm:flex items-center gap-4">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Grid2X2 className="h-5 w-5" /></button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-muted-foreground"><LayoutList className="h-5 w-5" /></button>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product as any} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <p className="text-xl text-muted-foreground italic">No products found for this selection.</p>
                                <button onClick={() => setSelectedCategory("All")} className="mt-6 text-accent font-bold hover:underline">Clear all filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
