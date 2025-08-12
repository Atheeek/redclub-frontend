import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard, { ProductStyle } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const fetchHomepageStyles = async () => {
  const response = await fetch(`${API_BASE_URL}/api/public/styles?limit=4`);
  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }
  const data = await response.json();
  return data.data || data; 
};

// A new component for the loading state UI
const ProductCardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <div className="relative aspect-[3/4] w-full animate-pulse rounded-lg bg-slate-200"></div>
    <div className="space-y-2 pt-2 text-center">
      <div className="h-4 w-3/4 mx-auto animate-pulse rounded bg-slate-200"></div>
      <div className="h-4 w-1/2 mx-auto animate-pulse rounded bg-slate-200"></div>
    </div>
    <div className="h-11 w-full animate-pulse rounded-lg bg-slate-200 mt-1"></div>
  </div>
);

export default function ProductGrid() {
  const { data: styles, isLoading, error } = useQuery({
    queryKey: ['homepageProducts'],
    queryFn: fetchHomepageStyles,
    // This tells React Query to not re-fetch data for 5 minutes, improving performance
    staleTime: 1000 * 60 * 5, 
  });

  return (
    <section id="products" className="container mx-auto py-14">
      <header className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-serif">Featured Collection</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Discover our most sought-after styles, handpicked for the modern gentleman.
        </p>
      </header>
      
      {error && <p className="text-center text-red-500">Error: {(error as Error).message}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          // If loading, show 4 skeleton cards
          Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : (
          // Otherwise, show the actual product cards
          styles && styles.map((style: ProductStyle) => (
            <ProductCard key={style._id} product={style} />
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg px-8 py-6 text-base font-semibold">
          <Link to="/collection">
            View All Collections <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
