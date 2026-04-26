"use client";

import { useCartStore } from "@/hooks/useCartStore";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCartStore();

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 15;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-12 uppercase">Your Bag</h1>

                {items.length === 0 ? (
                    <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold font-outfit uppercase">Your bag is empty</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Looks like you haven't added anything to your cart yet. Let's find something special.
                            </p>
                        </div>
                        <Link href="/shop" className="btn-premium inline-block px-12 py-4">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-8">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={`${item.id}-${item.variantId}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex gap-6 pb-8 border-b items-start"
                                    >
                                        <div className="relative h-40 w-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <Link href={`/product/${item.id}`} className="text-lg font-bold uppercase hover:text-accent transition-colors">
                                                        {item.name}
                                                    </Link>
                                                    {item.variantName && (
                                                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-1">
                                                            Variant: {item.variantName}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="text-lg font-bold">${item.price}</p>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variantId)}
                                                        className="p-1 hover:text-accent transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                                                        className="p-1 hover:text-accent transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id, item.variantId)}
                                                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-xs font-bold uppercase"
                                                >
                                                    <Trash2 className="h-4 w-4" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        <div className="lg:static relative">
                            <div className="glass-card rounded-2xl p-8 sticky top-24 space-y-8">
                                <h3 className="text-xl font-bold font-outfit uppercase">Order Summary</h3>

                                <div className="space-y-4 text-sm font-medium">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t text-lg font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Link
                                        href="/checkout"
                                        className="w-full btn-premium py-4 flex items-center justify-center gap-2 group"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                                        Complimentary gift wrapping on all orders
                                    </p>
                                </div>

                                <div className="pt-8 border-t space-y-4">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Accepted Payments</p>
                                    <div className="flex gap-2">
                                        <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center font-bold text-[8px]">VISA</div>
                                        <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center font-bold text-[8px]">MC</div>
                                        <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center font-bold text-[8px]">AMEX</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
