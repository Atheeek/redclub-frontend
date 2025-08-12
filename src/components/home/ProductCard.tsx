import { Link } from "react-router-dom";
import { Eye, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export interface ProductStyle {
  _id: string;
  name: string;
  description: string;
  category: string;
  imageUrls: string[];
  inventory?: {
    rentalPrice: number;
    branch?: { name: string };
  }[];
}

export default function ProductCard({ product }: { product: ProductStyle }) {
  const { addToCart } = useCart();
  const productId = product._id;
  const startingPrice = product.inventory?.[0]?.rentalPrice || 0;

  const handleAddToCart = () => {
    const productForCart = {
      id: productId,
      _id: productId,
      name: product.name,
      price: startingPrice,
      image: product.imageUrls[0],
    };
    addToCart(productForCart);
  };

  // Get unique branch names from the inventory data
  const availableBranches = product.inventory ? [...new Set(product.inventory.map(item => item.branch?.name).filter(Boolean))] : [];

  return (
    <article className="group overflow-hidden rounded-lg border bg-card flex flex-col">
      <div className="relative">
        <img src={product.imageUrls[0]} alt={product.name} className="aspect-[3/4] w-full object-cover"/>
        <div className="absolute inset-0 flex items-center justify-center gap-2 p-3 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 bg-black/30 backdrop-blur-sm">
          <Button variant="secondary" size="sm" asChild>
            <Link to={`/product/${productId}`}><Eye className="mr-2 h-4 w-4" /> Quick View</Link>
          </Button>
        </div>
      </div>
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">Rent from ₹{startingPrice.toFixed(2)}</p>
        
        {/* Branch Location Info */}
        <div className="mt-2 flex-grow">
            {availableBranches.length > 0 && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={14} />
                    <span>Available at: {availableBranches.join(', ')}</span>
                </div>
            )}
        </div>

        <Button className="mt-3 w-full" onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </article>
  );
}
