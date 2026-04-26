"use client";

import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [orderId, setOrderId] = useState("");

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 15;
    const total = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate order processing
        setTimeout(() => {
            const id = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
            setOrderId(id);
            setSubmitted(true);
            clearCart();
            setLoading(false);
            toast.success("Order Placed Successfully!");
        }, 2500);
    };

    if (items.length === 0 && !submitted) {
        router.push("/cart");
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-6">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="checkout"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                        >
                            {/* Checkout Form */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-colors">
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <h1 className="text-4xl font-bold font-outfit uppercase tracking-tight">Checkout</h1>
                                </div>

                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
                                    <section className="space-y-6">
                                        <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-2">Customer Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                                                <input required type="text" className="w-full px-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-accent outline-none" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">Email Address</label>
                                                <input required type="email" className="w-full px-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-accent outline-none" placeholder="john@example.com" />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">Phone Number</label>
                                                <input required type="tel" className="w-full px-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-accent outline-none" placeholder="+1 234 567 890" />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-6">
                                        <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-2">Shipping Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">Street Address</label>
                                                <input required type="text" className="w-full px-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-accent outline-none" placeholder="123 Artisan Street" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">City</label>
                                                <input required type="text" className="w-full px-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-accent outline-none" placeholder="New York" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">Postal Code</label>
                                                <input required type="text" className="w-full px-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-accent outline-none" placeholder="10001" />
                                            </div>
                                        </div>
                                    </section>
                                </form>
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="lg:sticky lg:top-32 h-fit">
                                <div className="glass-card rounded-3xl p-8 space-y-8">
                                    <h3 className="text-xl font-bold font-outfit uppercase">Order Items</h3>

                                    <div className="space-y-4 max-h-60 overflow-auto pr-2 custom-scrollbar">
                                        {items.map((item) => (
                                            <div key={`${item.id}-${item.variantId}`} className="flex justify-between items-center text-sm">
                                                <div className="flex gap-4">
                                                    <div className="h-14 w-14 bg-muted rounded-lg overflow-hidden relative flex-shrink-0">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={item.image} alt="" className="object-cover h-full w-full" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity} • {item.variantName}</p>
                                                    </div>
                                                </div>
                                                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-bold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="font-bold">${shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t text-xl font-bold">
                                            <span>Total Due</span>
                                            <span className="text-accent">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        form="checkout-form"
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn-premium py-5 flex items-center justify-center gap-3 text-lg"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Complete Order"
                                        )}
                                    </button>
                                    <p className="text-[10px] text-center text-muted-foreground uppercase font-bold tracking-widest">
                                        Secure checkout powered by timber
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto text-center py-20 space-y-8"
                        >
                            <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8">
                                <CheckCircle2 className="h-12 w-12" />
                            </div>
                            <h1 className="text-5xl font-bold font-outfit uppercase">Thank You</h1>
                            <p className="text-lg text-muted-foreground">
                                Your order <span className="text-foreground font-bold font-mono">{orderId}</span> has been placed successfully.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                We've received your request. Our team will contact you shortly via email or phone to confirm shipping details and finalize payment arrangements.
                            </p>
                            <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/shop" className="btn-premium px-12 py-4">
                                    Shop More
                                </Link>
                                <Link href="/" className="px-12 py-4 border-2 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                    Back to Home
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
