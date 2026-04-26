import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-widest uppercase">TIMBER</h3>
                        <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                            Crafting premium essentials for the modern lifestyle. Quality that tells a story, design that lives forever.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Youtube className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Collections</h4>
                        <ul className="space-y-4 text-sm text-primary-foreground/60">
                            <li><Link href="/shop" className="hover:text-accent transition-colors">Spring / Summer</Link></li>
                            <li><Link href="/shop" className="hover:text-accent transition-colors">Autumn / Winter</Link></li>
                            <li><Link href="/shop" className="hover:text-accent transition-colors">Accessories</Link></li>
                            <li><Link href="/shop" className="hover:text-accent transition-colors">Limited Editions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-primary-foreground/60">
                            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/care" className="hover:text-accent transition-colors">Product Care</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-sm text-primary-foreground/60 mb-6 leading-relaxed">
                            Join our list for exclusive previews and craft insights.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-primary-foreground/10 border-none px-4 py-3 text-sm flex-1 outline-none rounded-l-md"
                            />
                            <button className="bg-accent px-6 py-3 text-sm font-bold rounded-r-md hover:bg-accent-hover transition-colors">
                                JOIN
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/40">
                    <p>© 2024 TIMBER CRAFTED GOODS. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
