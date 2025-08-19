// in your Index.tsx file
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import SaleBanner from "@/components/home/SaleBanner";
import Testimonials from "@/components/home/Testimonials";
import FeaturedSplit from "@/components/home/FeaturedSplit";
import NewsletterBand from "@/components/home/NewsletterBand";
import ProductGrid from "@/components/products/ProductGrid"; 
import Header from "@/components/layout/Header";

const Index = () => {
  // ... your useEffect hook ...

  return (
    // NOTE: The <main> tag is now the scrolling container
    <main>
      {/* 1. Render the Header on its own. It will stick to <main>. */}
      <Header initialTransparent={true} />

      {/* 2. Wrap ALL page content AFTER the header in a div. */}
      {/* 3. Pull this content up behind the header with a negative margin.
         The header is h-20 (5rem), so we use -mt-20.
      */}
      <div className="-mt-20">
        <Hero />
        <CategoryGrid />
        <ProductGrid />
        <SaleBanner />
        <Testimonials />
        <FeaturedSplit />
        <NewsletterBand />
      </div>
    </main>
  );
};

export default Index;
