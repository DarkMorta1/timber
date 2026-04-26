"use client";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useCMS } from "@/hooks/useCMS";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    const { content, loading } = useCMS("about-us");

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <h1 className="text-6xl font-bold font-outfit uppercase tracking-tighter leading-none">
                                {content?.heading || "The Art of Timber"}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {content?.content || "We believe in the beauty of simplicity and the permanence of natural materials. Our mission is to create pieces that tell a story of craftsmanship and character."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={content?.images?.[0] || "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000"}
                                alt="Craftsmanship"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Dynamic Story Sections */}
                <section className="bg-slate-50 py-24">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto space-y-12 text-center">
                            <h2 className="text-3xl font-bold font-outfit uppercase tracking-widest border-b pb-6 inline-block">Our Heritage</h2>
                            <p className="text-lg text-muted-foreground leading-loose">
                                {content?.subheading || "Founded in 2024, Timber started as a small workshop in the heart of the countryside. Today, we are a global community of artisans and homeowners who share a passion for sustainable, beautiful living."}
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
