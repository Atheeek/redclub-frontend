import { useEffect } from "react";
import Hero from "@/components/home/Hero";
// We don't need ProductCard or the static products import here anymore

import CategoryGrid from "@/components/home/CategoryGrid";
import SaleBanner from "@/components/home/SaleBanner";
import Testimonials from "@/components/home/Testimonials";
import FeaturedSplit from "@/components/home/FeaturedSplit";
import NewsletterBand from "@/components/home/NewsletterBand";

// 1. Import the ProductGrid component we created
import ProductGrid from "@/components/products/ProductGrid"; 

const Index = () => {
  useEffect(() => {
    document.title = "Red Club — Premium Men's Fashion";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Discover premium men's fashion at ManStyle Co. Shop tailored suits, shirts, and essentials.");
  }, []);

  return (
    <main className="">
      <Hero />
      <CategoryGrid />

      {/* 2. REMOVE the old static section and REPLACE it with the ProductGrid component.
        This component now contains all the logic for fetching and displaying products.
      */}
      <ProductGrid />

      <SaleBanner />
      <Testimonials />
      <FeaturedSplit />
      <NewsletterBand />
    </main>
  );
};

export default Index;