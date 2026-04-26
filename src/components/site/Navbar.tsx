"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/hooks/useCartStore";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "premium-blur shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-[0.2em] font-outfit">
                    TIMBER
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
                    <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
                    <Link href="/categories" className="hover:text-accent transition-colors">Collections</Link>
                    <Link href="/about" className="hover:text-accent transition-colors">Journal</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-5">
                    <button className="hidden sm:block p-2 hover:text-accent transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                    <Link href="/wishlist" className="hidden sm:block p-2 hover:text-accent transition-colors">
                        <Heart className="h-5 w-5" />
                    </Link>
                    <Link href="/admin" className="p-2 hover:text-accent transition-colors">
                        <User className="h-5 w-5" />
                    </Link>
                    <Link href="/cart" className="relative p-2 hover:text-accent transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute top-0 right-0 h-4 w-4 bg-accent text-white rounded-full text-[10px] flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60]"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            className="fixed top-0 left-0 bottom-0 w-[4/5] max-w-sm bg-background z-[70] p-8 flex flex-col gap-10"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold tracking-widest">TIMBER</span>
                                <button onClick={() => setMobileMenuOpen(false)}>
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-6 text-xl font-light uppercase tracking-widest">
                                <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                                <Link href="/categories" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
                                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
