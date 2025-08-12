import suit from "@/assets/products/product1.jpg";
import shirt from "@/assets/products/product2.jpg";
import pants from "@/assets/products/Kurtha.jpg";
import shoes from "@/assets/products/product-4.jpg";
import knit from "@/assets/products/AW23-30-307029-BLK_1.webp";
import acc from "@/assets/products/product-6.jpg";

const categories = [
  { name: "Suits", image: suit },
  { name: "Shoes", image: shirt },
  { name: "Kurthas", image: pants },
  { name: "Boots", image: shoes },
  { name: "Bkazers", image: knit },
  { name: "Accessories", image: acc },
];

export default function CategoryGrid() {
  return (
    <section aria-labelledby="shop-by-category" className="container mx-auto py-14">
      <header className="mb-8">
        <h2 id="shop-by-category" className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          Shop by Category
        </h2>
        <p className="text-muted-foreground mt-1">Classic essentials curated for every occasion.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <article key={c.name} className="group relative overflow-hidden rounded-lg border bg-card">
            <img
              src={c.image}
              alt={`${c.name} collection — ManStyle Co.`}
              className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">{c.name}</h3>
              <a href="/#products" className="text-sm text-muted-foreground hover:underline">Shop now</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
