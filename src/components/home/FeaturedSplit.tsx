import blazer from "@/assets/products/product1.jpg";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function FeaturedSplit() {
  return (
    <section className="container mx-auto py-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        
        {/* Image with overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={blazer}
            alt="Double-breasted blazer — premium modern look"
            className="h-[70vh] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>

        {/* Text content */}
        <article className="flex flex-col justify-center max-w-lg mx-auto">
          <p className="text-sm font-medium tracking-wider text-gray-700 uppercase">
            The Modern Look
          </p>

          <h2 
            className="mt-2 text-3xl md:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Double-Breasted Blazers
          </h2>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className="fill-yellow-400 text-yellow-400 drop-shadow-sm" 
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">4.8 (1,240 reviews)</span>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            Tailored to perfection with premium wool blends and sharp silhouettes. 
            Elevate your wardrobe with an icon of effortless elegance.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white text-black font-medium px-8 py-3 rounded-xl shadow hover:shadow-lg hover:bg-gray-200 transition-all"
            >
              Shop Blazers
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-700 text-gray-600 px-8 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
            >
              Learn More
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
