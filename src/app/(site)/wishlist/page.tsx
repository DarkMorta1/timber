"use client";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useWishlistStore } from "@/hooks/useWishlistStore";
import { useCartStore } from "@/hooks/useCartStore";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function WishlistPage() {
    const { items, removeItem } = useWishlistStore();
    const { addItem } = useCartStore();
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleMoveToCart = (item: any) => {
        if (!user) {
            localStorage.setItem("redirectAfterLogin", pathname);
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }

        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            variantId: "base",
            variantName: "Standard",
        });
        removeItem(item.id);
        toast.success("Moved to cart!");
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold font-outfit uppercase tracking-tighter">Your Wishlist</h1>
                        <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs font-bold font-outfit">Items you love and saved for later</p>
                    </div>

                    {items.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 rounded-[2.5rem] p-16 text-center space-y-8 border-2 border-dashed border-slate-200"
                        >
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                                <Heart className="h-12 w-12 text-slate-300" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold font-outfit uppercase">Your list is empty</h2>
                                <p className="text-muted-foreground text-lg italic">Explore our collection and find your next favorite piece.</p>
                            </div>
                            <Link href="/shop" className="btn-premium inline-flex items-center gap-3 h-14 px-10">
                                Start Shopping <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                        className="glass-card p-6 rounded-3xl flex items-center gap-8 group"
                                    >
                                        <div className="relative h-32 w-32 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <Link href={`/product/${item.slug}`} className="block">
                                                <h3 className="text-xl font-bold font-outfit uppercase tracking-wider hover:text-accent transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-lg font-bold text-accent">${item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleMoveToCart(item)}
                                                className="btn-premium px-6 py-3 flex items-center gap-2"
                                            >
                                                <ShoppingBag className="h-4 w-4" /> Move to Cart
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-3 hover:bg-red-50 text-red-600 rounded-full transition-colors"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
