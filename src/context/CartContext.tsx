import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface CartItem { id: string; qty: number }

interface CartContextValue {
  count: number;
  addToCart: (product: { id: string; name: string }) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  const addToCart = (product: { id: string; name: string }) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + 1 };
        return clone;
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
    toast({ title: "Added to cart", description: product.name });
  };

  return (
    <CartContext.Provider value={{ count, addToCart }}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
