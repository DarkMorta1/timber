"use client";

import { useState } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useWishlistStore } from "@/hooks/useWishlistStore";
import toast from "react-hot-toast";

const mockProduct = {
    id: "1",
    name: "Classic Oak Chair",
    slug: "classic-oak-chair",
    description: `Experience ultimate comfort and timeless design with our Classic Oak Chair. Handcrafted from sustainably sourced solid oak, this piece features a perfectly contoured seat and a sturdy backrest designed for long-lasting support.

  Key Features:
  - Solid FSC-certified Oak
  - Contoured ergonomic design
  - Premium satin finish
  - Handcrafted joints for durability
  `,
    price: 299,
    images: [
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1000",
    ],
    variants: [
        { id: "v1", name: "Natural Oak", stock: 10 },
        { id: "v2", name: "Dark Walnut", stock: 5 },
        { id: "v3", name: "Matte Black", stock: 0 },
    ],
    category: "Furniture",
    stock: 12,
};

const relatedProducts = [
    { id: "2", name: "Minimalist Desk Lamp", slug: "minimalist-desk-lamp", price: 159, images: ["https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000"] },
    { id: "3", name: "Premium Wool Throw", slug: "premium-wool-throw", price: 89, images: ["https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=1000"] },
    { id: "4", name: "Stone Coffee Table", slug: "stone-coffee-table", price: 850, images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000"] },
];

export default function ProductDetail() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
    const isWishlisted = isInWishlist(mockProduct.id);

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(mockProduct.id);
            toast.success("Removed from wishlist");
        } else {
            addToWishlist({
                id: mockProduct.id,
                name: mockProduct.name,
                price: mockProduct.price,
                image: mockProduct.images[0],
                slug: mockProduct.slug
            });
            toast.success("Added to wishlist!");
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            localStorage.setItem("redirectAfterLogin", pathname);
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }

        addItem({
            id: mockProduct.id,
            name: mockProduct.name,
            price: mockProduct.price,
            image: mockProduct.images[0],
            quantity: quantity,
            variantId: selectedVariant.id,
            variantName: selectedVariant.name,
        });
        toast.success("Added to cart");
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full w-full"
                                >
                                    <Image
                                        src={mockProduct.images[selectedImage]}
                                        alt={mockProduct.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <button
                                onClick={() => setSelectedImage((prev) => (prev - 1 + mockProduct.images.length) % mockProduct.images.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={() => setSelectedImage((prev) => (prev + 1) % mockProduct.images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {mockProduct.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? "border-accent scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                <Star className="h-3 w-3 fill-accent" />
                                <Star className="h-3 w-3 fill-accent" />
                                <Star className="h-3 w-3 fill-accent" />
                                <Star className="h-3 w-3 fill-accent" />
                                <Star className="h-3 w-3 fill-accent" />
                                <span className="text-muted-foreground ml-2">(12 Reviews)</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4 uppercase">{mockProduct.name}</h1>
                            <p className="text-2xl font-bold text-accent">${mockProduct.price}</p>
                        </div>

                        <div className="prose prose-sm text-muted-foreground leading-loose">
                            <p className="whitespace-pre-line">{mockProduct.description}</p>
                        </div>

                        {/* Variants */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest">Finish</h3>
                            <div className="flex flex-wrap gap-3">
                                {mockProduct.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        disabled={variant.stock === 0}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`px-6 py-3 rounded-full text-sm font-medium border-2 transition-all flex items-center gap-2 ${selectedVariant.id === variant.id
                                            ? "border-primary bg-primary text-white"
                                            : "border-slate-200 hover:border-primary text-muted-foreground"
                                            } ${variant.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                                    >
                                        {variant.name}
                                        {selectedVariant.id === variant.id && <Check className="h-4 w-4" />}
                                    </button>
                                ))}
                            </div>
                            {selectedVariant.stock === 0 && (
                                <p className="text-xs text-red-500 font-bold uppercase tracking-widest px-2">Out of stock</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <div className="flex items-center border-2 rounded-full px-4 h-14">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:text-accent transition-colors"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="w-12 text-center font-bold bg-transparent outline-none"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 hover:text-accent transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={selectedVariant.stock === 0}
                                className="flex-1 btn-premium h-14 flex items-center justify-center gap-3"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Add to Cart
                            </button>
                            <button
                                onClick={toggleWishlist}
                                className={`h-14 w-14 border-2 rounded-full flex items-center justify-center transition-all ${isWishlisted ? "bg-red-50 border-red-100 text-red-500 scale-110" : "hover:bg-slate-50 border-slate-200"
                                    }`}
                            >
                                <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
                            </button>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-2 gap-4 pt-10 border-t">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Shipping</p>
                                <p className="text-sm font-bold">Standard 3-5 days</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Returns</p>
                                <p className="text-sm font-bold">30-day policy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <section className="pt-24 border-t">
                    <h2 className="text-3xl font-bold font-outfit mb-12 uppercase">You may also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p as any} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
