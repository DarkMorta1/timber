"use client";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchFaqs() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/faqs`);
                setFaqs(res.data);
            } catch (error) {
                // Fallback or handle error
                setFaqs([
                    { question: "What is your return policy?", answer: "We offer a 30-day return policy on all our items. Please contact us for more info." },
                    { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location." },
                ]);
            }
        }
        fetchFaqs();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
                <h1 className="text-5xl font-bold font-outfit uppercase tracking-tighter mb-16 text-center">Frequently Asked Questions</h1>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b last:border-0">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center py-8 text-left group"
                            >
                                <span className="text-xl font-bold font-outfit uppercase tracking-widest group-hover:text-accent transition-colors">
                                    {faq.question}
                                </span>
                                {openIndex === i ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-8 text-muted-foreground leading-relaxed text-lg">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
