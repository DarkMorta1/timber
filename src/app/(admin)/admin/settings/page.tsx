"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Loader2, Globe, Layout, Info, HelpCircle, Mail } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const PAGES = [
    { key: "global", label: "Global Settings", icon: Globe },
    { key: "home-hero", label: "Homepage Hero", icon: Layout },
    { key: "about-us", label: "About Us Page", icon: Info },
    { key: "contact-info", label: "Contact Info", icon: Mail },
];

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("global");
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState<any>({});

    useEffect(() => {
        fetchContent();
    }, [activeTab]);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/content/${activeTab}`);
            setContent(res.data);
        } catch (error) {
            toast.error("Failed to fetch settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`${API_URL}/content/${activeTab}`, content);
            toast.success("Settings saved successfully");
        } catch (error) {
            toast.error("Failed to save changes");
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: string, value: any) => {
        setContent({ ...content, [field]: value });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-outfit">Store Settings & CMS</h1>
                <p className="text-muted-foreground">Manage dynamic content, SEO, and store configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    {PAGES.map((page) => (
                        <button
                            key={page.key}
                            onClick={() => setActiveTab(page.key)}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeTab === page.key
                                    ? "bg-primary text-primary-foreground shadow-lg"
                                    : "hover:bg-slate-100 text-muted-foreground"
                                }`}
                        >
                            <page.icon className="h-5 w-5" />
                            <span className="font-bold text-sm uppercase tracking-wider">{page.label}</span>
                        </button>
                    ))}
                </div>

                {/* Form Area */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSave} className="glass-card rounded-3xl p-10 space-y-10">
                        {loading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-accent" /></div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold border-b pb-2 uppercase tracking-widest text-accent">Content Control</h3>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Page Heading</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                                                value={content.heading || ""}
                                                onChange={(e) => updateField("heading", e.target.value)}
                                                placeholder="Main Title"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Main Content / Paragraph</label>
                                            <textarea
                                                rows={6}
                                                className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                                                value={content.content || ""}
                                                onChange={(e) => updateField("content", e.target.value)}
                                                placeholder="Describe the section content here..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Button Text</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                                                    value={content.buttonText || ""}
                                                    onChange={(e) => updateField("buttonText", e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Button Link</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                                                    value={content.buttonLink || ""}
                                                    onChange={(e) => updateField("buttonLink", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold border-b pb-2 uppercase tracking-widest text-accent">Images</h3>
                                        <p className="text-xs text-muted-foreground italic">Provide Cloudinary URLs for images in this section.</p>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Main Section Image URL</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                                                value={content.images?.[0] || ""}
                                                onChange={(e) => {
                                                    const newImages = [...(content.images || [])];
                                                    newImages[0] = e.target.value;
                                                    updateField("images", newImages);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 border-t">
                                    <button type="submit" className="btn-premium px-12 flex items-center gap-2">
                                        <Save className="h-5 w-5" /> Save Section
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
