import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import ProductCard from "@/components/site/ProductCard";
import Footer from "@/components/site/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Dummy data for initial display
const featuredProducts = [
  {
    id: "1",
    name: "Classic Oak Chair",
    slug: "classic-oak-chair",
    description: "Handcrafted oak chair with premium finish.",
    price: 299,
    images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000"],
    categoryId: "furniture",
    productTypeId: "chairs",
    isFeatured: true,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Minimalist Desk Lamp",
    slug: "minimalist-desk-lamp",
    description: "Sleek brass lamp with soft warm light.",
    price: 159,
    images: ["https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000"],
    categoryId: "lighting",
    productTypeId: "lamps",
    isFeatured: true,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Premium Wool Throw",
    slug: "premium-wool-throw",
    description: "Soft merino wool throw for cozy evenings.",
    price: 89,
    discountPrice: 69,
    images: ["https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=1000"],
    categoryId: "home",
    productTypeId: "textiles",
    isFeatured: true,
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Stone Coffee Table",
    slug: "stone-coffee-table",
    description: "Solid marble top with brushed steel base.",
    price: 850,
    images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000"],
    categoryId: "furniture",
    productTypeId: "tables",
    isFeatured: true,
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const categories = [
  { name: "Furniture", image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000", link: "/shop?category=furniture" },
  { name: "Lighting", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000", link: "/shop?category=lighting" },
  { name: "Decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000", link: "/shop?category=decor" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Selected Works</span>
            <h2 className="text-4xl font-bold font-outfit">Featured Products</h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-all">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Explore</span>
            <h2 className="text-4xl font-bold font-outfit">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.link} className="relative aspect-[4/5] overflow-hidden group rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold font-outfit tracking-wider uppercase border-b-2 border-transparent group-hover:border-white transition-all">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-24 relative h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-6 text-white text-center">
          <h2 className="text-5xl md:text-7xl font-bold font-outfit mb-8 max-w-4xl mx-auto">Craftsmanship that lasts a lifetime</h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our commitment to sustainable materials and traditional techniques ensures that every piece we create is more than just a product—it's an heirloom.
          </p>
          <Link href="/about" className="btn-premium px-12 py-4 bg-white text-black hover:bg-accent hover:text-white">
            Learn Our Story
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
