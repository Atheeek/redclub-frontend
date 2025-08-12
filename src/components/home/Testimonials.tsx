import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex P.",
    text: "Fantastic quality and the fit is perfect. Will definitely shop again!",
  },
  {
    name: "Jordan R.",
    text: "Elegant designs with top-notch materials. The suit exceeded expectations.",
  },
  {
    name: "Sam K.",
    text: "Fast shipping and great customer support. Highly recommend ManStyle Co.",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials" className="container mx-auto py-14">
      <header className="text-center mb-8">
        <p className="text-sm text-muted-foreground">Let Customers Speak for Us</p>
        <h2 id="testimonials" className="text-2xl md:text-3xl font-semibold mt-1" style={{ fontFamily: 'var(--font-display)' }}>
          What Our Customers Say
        </h2>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-accent fill-accent" />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">“{r.text}”</p>
            <p className="mt-2 text-sm font-medium">{r.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
