"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
        title: "Timeless Quality",
        subtitle: "New Collection out now",
        cta: "Shop Now",
        link: "/shop"
    },
    {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
        title: "Minimal Design",
        subtitle: "Crafted for the modern home",
        cta: "Explore",
        link: "/categories"
    },
    {
        image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80&w=2070",
        title: "Leather Essentials",
        subtitle: "Premium Italian leather",
        cta: "Discover",
        link: "/shop?category=accessories"
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    >
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start text-white">
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm uppercase tracking-[0.4em] mb-4 text-accent font-medium"
                        >
                            {slides[current].subtitle}
                        </motion.p>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-8xl font-bold font-outfit mb-8 max-w-2xl leading-tight"
                        >
                            {slides[current].title}
                        </motion.h1>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link href={slides[current].link} className="btn-premium px-12 py-4">
                                {slides[current].cta}
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-10 right-10 flex gap-4 z-10">
                <button
                    onClick={prevSlide}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/10 transition-colors"
                >
                    <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/10 transition-colors"
                >
                    <ChevronRight className="h-6 w-6 text-white" />
                </button>
            </div>

            <div className="absolute bottom-10 left-10 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-[2px] w-12 transition-all duration-300 ${i === current ? "bg-accent" : "bg-white/30"}`}
                    />
                ))}
            </div>
        </section>
    );
}
