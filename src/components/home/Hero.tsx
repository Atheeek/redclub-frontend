import heroImage from "@/assets/hero-mens-fashion.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Headphones, RotateCcw } from "lucide-react";
import { useState ,useEffect} from "react";

import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaTshirt } from 'react-icons/fa';
// import heroImage1 from "@/assets/hero-mens-fashion.jpg";
// Add a few more high-quality images for the slider effect
import heroImage2 from "@/assets/product1.jpg"; 
import heroImage3 from "@/assets/p4.jpg";
import heroImage4 from "@/assets/p1.jpg";
// import heroImage5 from "@/assets/p2.webp";
// import heroImage6 from "@/assets/p4.jpg";
import heroImage7 from "@/assets/13290.jpg";

const heroImages = [ heroImage2, heroImage3, heroImage4,  heroImage7];


export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [currentImageIndex]);

  return (
    <section className="relative min-h-[70vh] w-full">
        {/* Background Image Slider */}
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Premium men's fashion collection"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />

      <div className="relative container mx-auto flex min-h-[70vh] flex-col items-start justify-center py-20">
         <h1  className="max-w-full sm:max-w-2xl lg:max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light  text-gray-600  leading-tight tracking-wide" 
            style={{fontFamily: '"Playfair Display", "Times New Roman", serif'}}>
          <span className="block sm:inline italic">Elevate Your </span>
          <span className="block sm:inline italic text-gray-600">Style</span>
          <br className="hidden  sm:block" />
          <span className="block sm:inline italic">Redefine Your </span>
          <span className="block sm:inline italic text-gray-600">Confidence</span>
        </h1>
        <p className="mt-4 max-w-xl text-base  md:text-lg text-muted-foreground">
          Discover our curated collection of suits, shirts, and essentials crafted for modern gentlemen.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="hero" size="lg">
            <a href="#products">Shop Now</a>
          </Button>
          <Button className="hover:bg-gray-400 hover:text-white" asChild variant="outline" size="lg">
            <Link to="/collection">Explore Collection</Link>
          </Button>
        </div>
        {/* <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-md border bg-background/70 px-4 py-3 shadow-sm backdrop-blur">
            <Truck className="opacity-80" />
            <div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Orders over $75</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-background/70 px-4 py-3 shadow-sm backdrop-blur">
            <Headphones className="opacity-80" />
            <div>
              <p className="text-sm font-medium">24/7 Support</p>
              <p className="text-xs text-muted-foreground">We’re here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-background/70 px-4 py-3 shadow-sm backdrop-blur">
            <RotateCcw className="opacity-80" />
            <div>
              <p className="text-sm font-medium">30‑Day Returns</p>
              <p className="text-xs text-muted-foreground">Hassle‑free</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}


// Filename: ManStylePage.tsx

// import React from 'react';

// // Importing icons from react-icons
// import { 
//     FiSearch, 
//     FiHeart, 
//     FiShoppingCart, 
//     FiChevronDown,
//     FiCheckCircle,
//     FiCreditCard,
//     FiTruck
// } from 'react-icons/fi';
// import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaTshirt } from 'react-icons/fa';
// import { BiMessageAltDetail } from 'react-icons/bi';

// // Helper component for Navigation Links for better readability
// const NavLink = ({ children, hasDropdown = false }: { children: React.ReactNode; hasDropdown?: boolean }) => (
//   <a href="#" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
//     <span>{children}</span>
//     {hasDropdown && <FiChevronDown size={14} />}
//   </a>
// );

// // Helper component for Feature items at the bottom
// const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
//     <div className="flex items-start space-x-4">
//         <div className="text-3xl text-gray-400 mt-1">
//             {icon}
//         </div>
//         <div>
//             <h3 className="font-semibold text-white">{title}</h3>
//             <p className="text-gray-400 text-sm">{description}</p>
//         </div>
//     </div>
// );

// // Main Page Component
// const ManStylePage = () => {
//   return (
//     <div className="bg-[#111111] text-white min-h-screen font-sans">
      
//       {/* ===== SOCIAL LINKS SIDEBAR ===== */}
//       <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20">
//         <div className="flex flex-col items-center space-y-5">
//           <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition-colors"><FaFacebookF /></a>
//           <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition-colors"><FaInstagram /></a>
//           <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition-colors"><FaTiktok /></a>
//           <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition-colors"><FaYoutube /></a>
//         </div>
//       </div>

//       <div className="max-w-screen-xl mx-auto px-8">
//         {/* ===== HEADER ===== */}
//         <header className="py-6">
//           <div className="flex justify-between items-center">
//             {/* Left Side: Logo */}
//             <h1 className="text-2xl font-bold">ManStyle Co.</h1>
            
//             {/* Middle: Primary Navigation */}
//             <nav className="hidden md:flex space-x-8">
//               <a href="#" className="hover:text-gray-300">HOME</a>
//               <a href="#" className="hover:text-gray-300">SHOP</a>
//               <a href="#" className="hover:text-gray-300">CONTACT US</a>
//             </nav>

//             {/* Right Side: User Actions */}
//             <div className="flex items-center space-x-5">
//               <span className="text-sm">HELLO ANARDA</span>
//               <button className="hover:text-gray-300"><FiSearch size={20} /></button>
//               <button className="hover:text-gray-300"><FiHeart size={20} /></button>
//               <button className="hover:text-gray-300"><FiShoppingCart size={20} /></button>
//             </div>
//           </div>
//         </header>

//         {/* ===== SECONDARY NAVIGATION BAR ===== */}
//         <nav className="py-4 border-t border-b border-gray-700">
//           <div className="flex justify-center items-center space-x-8">
//             <NavLink hasDropdown>SHIRTS</NavLink>
//             <NavLink>T-SHIRTS</NavLink>
//             <NavLink>BLAZERS</NavLink>
//             <NavLink hasDropdown>SUITS</NavLink>
//             <NavLink hasDropdown>POLO</NavLink>
//             <NavLink>KNITWEAR</NavLink>
//             <NavLink hasDropdown>PANTS</NavLink>
//             <NavLink hasDropdown>UNDERWEAR</NavLink>
//             <NavLink hasDropdown>ACCESSORIES</NavLink>
//           </div>
//         </nav>

//         {/* ===== HERO SECTION ===== */}
//         <main className="relative mt-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            
//             {/* Left Side: Text Content */}
//             <div className="space-y-6 z-10">
//               <h2 className="text-7xl font-serif font-medium leading-tight">
//                 Elevate Your Style <br />
//                 Redefine Your <br />
//                 Confidence
//               </h2>
//               <p className="text-gray-400 max-w-md">
//                 Discover timeless designs crafted for the modern gentleman. From tailored fits to luxurious details, redefine your wardrobe with essentials that inspire confidence and sophistication.
//               </p>
//               <button className="bg-[#a89580] text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-colors">
//                 SHOP NOW
//               </button>
              
//               {/* Pagination */}
//               <div className="flex items-center space-x-4 pt-8">
//                 <span className="text-lg">01</span>
//                 <div className="w-24 h-px bg-gray-600 relative">
//                     <div className="absolute left-0 top-0 h-full bg-white w-1/4"></div>
//                 </div>
//                 <span className="text-lg text-gray-500">04</span>
//               </div>
//             </div>

//             {/* Right Side: Image and Cards */}
//             <div className="relative">
//                 {/* NOTE: You should replace this placeholder URL with the actual path to your image.
//                   The original image has a transparent background (PNG).
//                 */}
//               <img 
//                 src="hero-mens-fashion.jpg" 
//                 alt="Man in a tailored pinstripe suit"
//                 className="w-full h-auto object-cover" 
//               />
//               <div className="absolute bottom-16 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg text-right">
//                 <p className="text-xs text-gray-400">OUTERWEAR</p>
//                 <h4 className="font-semibold">PREMIUM DOUBLE-BREASTED</h4>
//                 <h4 className="font-semibold">TAILORED BLAZER</h4>
//               </div>
//             </div>
//           </div>
//           <button className="absolute bottom-0 right-1/4 -mr-16 bg-[#a89580] p-4 rounded-full text-black hover:bg-opacity-90 transition-colors z-20">
//               <BiMessageAltDetail size={24} />
//           </button>
//         </main>
//       </div>

//       {/* ===== FEATURES SECTION ===== */}
//       <footer className="bg-[#1a1a1a] mt-24 py-12">
//         <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//             <FeatureItem
//                 icon={<FiCheckCircle />}
//                 title="Satisfaction Guarantee"
//                 description="Non-conforming items can be returned within 7 days"
//             />
//             <FeatureItem
//                 icon={<FaTshirt />}
//                 title="Size Consultation"
//                 description="We can help you finding the right size"
//             />
//             <FeatureItem
//                 icon={<FiCreditCard />}
//                 title="Easy Payment Options"
//                 description="Check out payment with your favourite method"
//             />
//             <FeatureItem
//                 icon={<FiTruck />}
//                 title="On-Time Shipping"
//                 description="Order will shipped on the same day"
//             />
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ManStylePage;