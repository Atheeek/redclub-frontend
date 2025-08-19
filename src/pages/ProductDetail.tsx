import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { MapPin } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// Define the detailed structure we expect from the API
interface ProductStyle {
  _id: string; name: string; description: string; category:string; imageUrls: string[];
}
interface InventoryItem {
  _id: string;
  branch: { name: string; address: string; };
  rentalPrice: number;
  variants: { size: string; stockCount: number; }[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [style, setStyle] = useState<ProductStyle | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { addToCart } = useCart();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/public/styles/${id}`);
        if (!response.ok) throw new Error("Product not found.");
        const { style, inventory } = await response.json();
        setStyle(style);
        setInventory(inventory);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!style) return <div className="text-center py-20">Product not found.</div>;

  return (
    <main className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="flex items-center justify-center">
          <img src={style.imageUrls[0]} alt={style.name} className="w-full md:w-[30vw]  rounded-lg shadow-lg mb-4"/>
          <div className="grid grid-cols-4 gap-2">
            {style.imageUrls.slice(1, 5).map((url, i) => (
              <img key={i} src={url} alt={`${style.name} view ${i+2}`} className="w-full aspect-square object-cover rounded-md cursor-pointer"/>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="">
                    <p className="text-sm w-16 flex items-center justify-center rounded-3xl bg-gray-500 p-1 font-large text-white">{style.category || 'Category'}</p>

          <h1 className="text-4xl font-bold mt-2 font-serif">{style.name}</h1>
          <p className="mt-4 text-lg text-gray-600">{style.description}</p>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Check Availability & Book</h2>
            {inventory.length > 0 ? (
              <div className="space-y-4">
                {inventory.map(item => (
                  <div key={item._id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold flex items-center gap-2"><MapPin size={16} className="text-gray-500"/> {item.branch.name}</p>
                        <p className="text-sm text-gray-500">{item.branch.address}</p>
                      </div>
                      <p className="font-semibold text-lg">₹{item.rentalPrice.toFixed(2)}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium mb-2">Available Sizes:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.variants.filter(v => v.stockCount > 0).map(v => (
                           <span key={v.size} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-bold">{v.size}</span>
                        ))}
                      </div>
                      <Button className="w-full mt-4">Select Branch & Book</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 bg-gray-100 rounded-md text-gray-700">This item is currently not available for rent at any branch.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
