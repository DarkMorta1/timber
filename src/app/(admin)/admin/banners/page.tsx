"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminBannersPage() {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const res = await axios.get(`${API_URL}/banners`);
            // Simulating data if API not ready
            setBanners(res.data.length ? res.data : [
                { id: "1", title: "Autumn Sale", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267", place: "HOMEPAGE", isActive: true },
                { id: "2", title: "New Arrivals", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c", place: "SHOP", isActive: true },
            ]);
        } catch (error) {
            toast.error("Failed to fetch banners");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-outfit">Banners & Sliders</h1>
                    <p className="text-muted-foreground">Manage marketing visuals and promotional slides.</p>
                </div>
                <button className="btn-premium flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New Banner
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin" /></div>
                ) : (
                    banners.map((banner) => (
                        <div key={banner.id} className="glass-card rounded-3xl overflow-hidden group">
                            <div className="relative aspect-video">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={banner.image} alt="" className="object-cover h-full w-full" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        {banner.place}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{banner.title}</h3>
                                    <p className="text-xs text-muted-foreground">{banner.isActive ? "Active" : "Disabled"}</p>
                                </div>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
