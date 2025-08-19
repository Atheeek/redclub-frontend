import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, User, LogIn, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import logo from "/redclub2.png";

const navItems = [
  { label: "HOME", href: "/#", type: "hash" },
  { label: "SHOP", href: "/#products", type: "hash" },
  { label: "ABOUT", href: "/#testimonials", type: "hash" },
  { label: "CONTACT", href: "/#footer", type: "hash" },
];

// 1. Define props for the component
interface HeaderProps {
  initialTransparent?: boolean;
}

// 2. Accept the prop in the function signature, defaulting to false
export default function Header({ initialTransparent = false }: HeaderProps) {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. Create a dynamic background class based on scroll state and the new prop
  const headerBgClass = isScrolled
    ? "bg-black/50 backdrop-blur-md"
    : initialTransparent
    ? "bg-transparent"
    : "bg-black";

  const navClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-medium transition-colors duration-200
    ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`;

  return (
    <header
      // 4. Apply the new dynamic class here
      className={`sticky text-[16px] top-0 z-50 w-full text-white transition-all duration-300 ${headerBgClass}`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Redclub home">
            <img src={logo} alt="Redclub logo" className="h-16 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) =>
              item.type === "route" ? (
                <NavLink key={item.href} to={item.href} className={navClass} end={item.href === "/"}>
                  {item.label}
                </NavLink>
              ) : (
                <a key={item.href} href={item.href} className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-transform duration-200">
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* --- Desktop Icons --- */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/cart" className="relative p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white shadow-md">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-xl p-3 text-gray-300 hover:text-white hover:bg-gray-800">
                  <User size={22} />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700 text-white">
                <DropdownMenuLabel className="text-gray-200">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-white">
                    <Link to="/my-rentals">My Rentals</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={logout} className="text-red-400 focus:bg-gray-800 focus:text-red-300 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="flex  items-center gap-2 text-white px-5 py-2 rounded-lg text-sm font-[300] hover:bg-gray-800">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>
        
        {/* --- Mobile Menu --- */}
        <div className="flex lg:hidden items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open menu" className="border-gray-700 bg-black text-gray-300 hover:bg-gray-800 hover:text-white">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black border-gray-800 text-white">
                <nav className="grid gap-2 mt-6">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className="block px-4 py-2 text-lg text-gray-300 hover:text-white rounded-md">
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className="mt-auto pt-4 px-5 border-t border-gray-800 absolute bottom-6 w-[85%]">
                    {user ? (
                        <div>
                            <Link to="/profile" className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white py-3 rounded-lg font-medium mb-2 hover:bg-gray-700">
                                <User size={18} /> {user.name}
                            </Link>
                            <Button onClick={logout} variant="outline" className="w-full border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">Logout</Button>
                        </div>
                    ) : (
                        <Link to="/login" className="w-full text-sm flex items-center justify-center gap-3 bg-black text-white py-3 rounded-lg font-[200] hover:bg-gray-600">
                            <LogIn size={18} /> Login / Register
                        </Link>
                    )}
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}