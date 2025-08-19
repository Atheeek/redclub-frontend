import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import img from '/logo.png';
import { Link } from 'react-router-dom';

// 1. Define props to accept children
interface HeroSectionProps {
  children: React.ReactNode;
}

// 2. Update the component to accept the children prop
const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen  w-full overflow-hidden">
      {/* 3. Render the children (the Header will go here) */}

      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat -110 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Decorative Elements (Changed to amber) */}
      <div className="absolute top-10 left-10 text-amber-500/20 opacity-0 animate-[fadeIn_2s_ease-out_1.5s_forwards]">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-32 right-16 text-amber-500/20 opacity-0 animate-[fadeIn_2s_ease-out_2s_forwards]">
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-32 left-20 text-amber-500/20 opacity-0 animate-[fadeIn_2s_ease-out_2.5s_forwards]">
        <Sparkles size={20} />
      </div>

      {/* Content Container */}
      {/* 4. Added -mt-20 to pull content up, accounting for the header's height */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="text-center max-w-5xl">
          {/* Luxury Badge */}
          <div className="mb-8 opacity-0 animate-[fadeInUp_1.2s_ease-out_0.2s_forwards]">
            <div className="inline-flex mt-52 items-center gap-2 px-6 py-2 border border-amber-500/30 rounded-full bg-black/20 backdrop-blur-sm">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-gold-gradient text-xs tracking-[0.3em] uppercase font-light">
                Est. Premium Collection
              </span>
            </div>
          </div>

          {/* Main Headline with Enhanced Typography */}
          <h1 className="mb-6 font-serif text-white leading-tight">
            <div className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-normal mb-2 opacity-0 animate-[fadeInUp_1.5s_ease-out_0.4s_forwards] tracking-[0.1em]">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">RED</span>
              <span className="text-gold-gradient inline-block transform hover:scale-105 transition-transform duration-300">CLUB</span>
            </div>
            <div className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.4em] opacity-0 animate-[fadeInUp_1.5s_ease-out_0.6s_forwards] text-gray-200">
              MEN'S WEDDING LOUNGE
            </div>
          </h1>

          {/* Enhanced Subtext with Line Decoration */}
          <div className="mb-12 opacity-0 animate-[fadeInUp_1.5s_ease-out_0.8s_forwards]">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
              <div className="w-2 h-2 bg-amber-600 rotate-45"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <p className="text-gold-gradient text-base md:text-lg lg:text-xl font-serif tracking-[0.3em] uppercase">
              Where Royalty Meets Elegance
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            <Link to="/collection">
              <button className="group px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm md:text-base font-serif tracking-[0.2em] uppercase transition-all duration-500 transform hover:scale-105 rounded-full hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] font-medium relative overflow-hidden">
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>

            <button className="group px-10 py-4 bg-transparent text-sm md:text-base font-serif tracking-[0.2em] uppercase transition-all duration-500 transform hover:scale-105 rounded-full border-2 border-amber-600 hover:bg-amber-600/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden">
              <span className="text-gold-gradient relative z-10 transition-colors duration-300">Book Consultation</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 opacity-0 animate-[fadeInUp_1.5s_ease-out_1.2s_forwards]">
            <div className="flex items-center justify-center gap-8 text-gray-400 text-xs tracking-wider uppercase">
              <span>Premium Quality</span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span>Custom Tailoring</span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span>Royal Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-[fadeIn_2s_ease-out_2s_forwards]">
        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center group"
          aria-label="Scroll to products"
        >
          <span className="text-gold-gradient text-xs tracking-wider uppercase mb-2 font-light transition-opacity duration-300 group-hover:opacity-80">Discover</span>
          <ChevronDown size={20} className="text-amber-500 animate-bounce group-hover:animate-pulse" />
        </button>
      </div>

    </div>
  );
};

export default HeroSection;