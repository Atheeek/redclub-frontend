import p1 from "@/assets/products/product-1.jpg";
import p2 from "@/assets/products/product-2.jpg";
import p3 from "@/assets/products/product-3.jpg";
import p4 from "@/assets/products/product-4.jpg";

export default function SaleBanner() {
  const items = [
    { image: p1, title: "Classic White Shirt" },
    { image: p2, title: "Tailored Suit Jacket" },
    { image: p3, title: "Slim-Fit Chinos" },
    { image: p4, title: "Leather Oxford Shoes" },
  ];

  return (
    <section className="mt-16 bg-primary text-primary-foreground">
      <div className="container mx-auto py-14">
        <header className="text-center">
          <p className="uppercase tracking-wide text-sm/6 opacity-80">Winter Essentials Sale</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Up to 30% Off Selected Outerwear
          </h2>
        </header>

        <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-4">
          {items.map((it) => (
            <article key={it.title} className="rounded-lg border border-primary-foreground/15 bg-background text-foreground overflow-hidden">
              <img src={it.image} alt={`${it.title} on sale — ManStyle Co.`} className="aspect-square w-full object-cover" loading="lazy" />
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-1">{it.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Limited-time offer</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
