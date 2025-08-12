import p1 from "@/assets/products/product1.jpg";
import p2 from "@/assets/products/product2.jpg";
import p3 from "@/assets/products/product-3.jpg";
import p4 from "@/assets/products/product-4.jpg";
import p5 from "@/assets/products/product-5.jpg";
import p6 from "@/assets/products/product-6.jpg";

// ... other image imports
// 1. Define and export the single source of truth for the Product type
export interface Product {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  category: string;
  imageUrls: string[];
  rentalPrice: number;
  securityDeposit: number;
  variants: {
    size: string;
    stockCount: number;
  }[];
}

// 2. Your exported array of products
export const products: Product[] = [
  { 
    id: "p1", 
    name: "Charcoal Wool Suit",
    description: "A timeless charcoal wool suit, perfect for formal occasions. Expertly tailored for a sharp, modern silhouette.",
    category: "Suits",
    imageUrls: [p1],
    rentalPrice: 5000,
    securityDeposit: 10000,
    variants: [
        { size: "M", stockCount: 3 },
        { size: "L", stockCount: 2 },
    ],
  },
  { 
    id: "p2", 
    name: "Navy Slim-fit Blazer",
    description: "A versatile navy blazer that can be dressed up or down. Crafted from a lightweight wool blend.",
    category: "Blazers",
    imageUrls: [p2],
    rentalPrice: 2500,
    securityDeposit: 5000,
    variants: [
        { size: "S", stockCount: 1 },
        { size: "M", stockCount: 4 },
        { size: "L", stockCount: 2 },
    ],
  },
];
