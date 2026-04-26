"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminFAQsPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState<any>(null);

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        order: 0
    });

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await axios.get(`${API_URL}/faqs`);
            setFaqs(res.data);
        } catch (error) {
            toast.error("Failed to fetch FAQs");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingFaq) {
                await axios.put(`${API_URL}/faqs/${editingFaq.id}`, formData);
                toast.success("FAQ updated");
            } else {
                await axios.post(`${API_URL}/faqs`, formData);
                toast.success("FAQ created");
            }
            setShowModal(false);
            setEditingFaq(null);
            setFormData({ question: "", answer: "", order: 0 });
            fetchFaqs();
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await axios.delete(`${API_URL}/faqs/${id}`);
            toast.success("FAQ deleted");
            fetchFaqs();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-outfit">Manage FAQs</h1>
                    <p className="text-muted-foreground">Add or edit questions displayed on the FAQ page.</p>
                </div>
                <button
                    onClick={() => { setEditingFaq(null); setShowModal(true); }}
                    className="btn-premium flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add FAQ
                </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-20 flex justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Order</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Question</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono">{faq.order}</td>
                                    <td className="px-6 py-4 font-bold">{faq.question}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => { setEditingFaq(faq); setFormData(faq); setShowModal(true); }}
                                                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(faq.id)}
                                                className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full space-y-6">
                        <h2 className="text-2xl font-bold">{editingFaq ? "Edit FAQ" : "Add FAQ"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Question</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Answer</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Order</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 btn-premium">Save Changes</button>
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-full font-bold uppercase tracking-widest hover:bg-slate-100">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
