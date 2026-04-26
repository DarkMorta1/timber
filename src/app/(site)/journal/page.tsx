"use client";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function JournalPage() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/blog`);
                setPosts(res.data);
            } catch (error) {
                setPosts([
                    {
                        title: "The Beauty of Solid Oak",
                        slug: "beauty-of-solid-oak",
                        excerpt: "Discover why oak has been the craftsman's choice for centuries...",
                        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
                        date: "Oct 24, 2024"
                    },
                    {
                        title: "Minimalist Living in 2024",
                        slug: "minimalist-living",
                        excerpt: "How to curate your home for peace and productivity...",
                        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1000",
                        date: "Oct 20, 2024"
                    }
                ]);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-6">
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-bold font-outfit uppercase tracking-tighter mb-6">Journal</h1>
                    <p className="text-muted-foreground uppercase tracking-widest font-bold">Stories, Guides & Inspiration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Link href={`/journal/${post.slug}`}>
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                </div>
                                <div className="space-y-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-accent">{post.date}</span>
                                    <h2 className="text-3xl font-bold font-outfit uppercase leading-tight group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-2">
                                        <span className="text-sm font-bold uppercase tracking-widest border-b-2 border-accent pb-1">Read Story</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
