"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/hooks/useCartStore";
import { useWishlistStore } from "@/hooks/useWishlistStore";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { user } = useAuth();
    const { addItem } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
    const router = useRouter();
    const pathname = usePathname();

    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user) {
            localStorage.setItem("redirectAfterLogin", pathname);
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }

        addItem({
            id: product.id,
            name: product.name,
            price: product.discountPrice || product.price,
            image: product.images[0],
            quantity: 1,
            variantId: "base",
            variantName: "Standard",
        });
        toast.success("Added to cart!");
    };

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isWishlisted) {
            removeFromWishlist(product.id);
            toast.success("Removed from wishlist");
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.discountPrice || product.price,
                image: product.images[0],
                slug: product.slug
            });
            toast.success("Added to wishlist!");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-xl mb-4">
                <Image
                    src={product.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-white rounded-full shadow-lg hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1"
                    >
                        <ShoppingBag className="h-5 w-5" />
                    </button>
                    <button
                        onClick={toggleWishlist}
                        className={`p-3 rounded-full shadow-lg transition-all transform hover:-translate-y-1 ${isWishlisted ? "bg-accent text-white" : "bg-white hover:bg-accent hover:text-white"
                            }`}
                    >
                        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>
                </div>

                {product.discountPrice && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Sale
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <Link href={`/product/${product.slug}`} className="block">
                    <h3 className="text-sm font-medium uppercase tracking-widest group-hover:text-accent transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-2">
                    {product.discountPrice ? (
                        <>
                            <span className="text-sm font-bold">${product.discountPrice}</span>
                            <span className="text-xs text-muted-foreground line-through">${product.price}</span>
                        </>
                    ) : (
                        <span className="text-sm font-bold">${product.price}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
