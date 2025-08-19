import shoes from "@/assets/products/product-4.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterBand() {
  return (
    <section className="relative  pb-28 mt-16">
      <img
        src={shoes}
        alt="Leather shoes on satin fabric — ManStyle Co."
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="relative container mx-auto py-14">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Stay in the know
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Be first to hear about new arrivals, exclusive offers, and style inspiration.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Your email" 
              aria-label="Email address" 
              className="bg-black/80 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-500" 
            />
            <Button type="submit" className="bg-black border-white/60 border  text-white hover:bg-gray-800">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}