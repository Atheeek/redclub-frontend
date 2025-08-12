import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, Search, User, LogIn, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // For the profile dropdown
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // 1. IMPORT and USE the AuthContext
import logo from "/redclub2.png";
const navItems = [
  { label: "Home", href: "/", type: "route" },
  { label: "Shop", href: "/#products", type: "hash" },
  { label: "About", href: "/#testimonials", type: "hash" },
  { label: "Contact", href: "/#footer", type: "hash" },
];

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth(); // 2. GET the live user and logout function

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 text-sm font-medium transition-colors duration-200
    ${isActive ? "text-black" : "text-gray-500 hover:text-black"}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md">
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
                <a key={item.href} href={item.href} className="relative px-4 py-2 text-sm font-medium text-gray-500 hover:text-black">
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* --- Desktop Icons --- */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/cart" className="relative p-3 text-gray-700 hover:bg-gray-100 rounded-xl">
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
                <Button variant="ghost" className="flex items-center gap-2 rounded-xl p-3 text-gray-700 hover:bg-gray-100">
                  <User size={22} />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem> */}
                <DropdownMenuItem asChild><Link to="/my-rentals">My Rentals</Link></DropdownMenuItem>
                {/* <DropdownMenuItem asChild><Link to="/admin">Admin Dashboard</Link></DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-gray-600 text-white px-5 py-2 rounded-lg text-sm font-[300] hover:bg-gray-900">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>
        
        {/* --- Mobile Menu --- */}
        <div className="flex md:hidden items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open menu">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent>
                <nav className="grid gap-2 mt-6">
                  {navItems.map((item) => (
                    <NavLink key={item.href} to={item.href} className={navClass} end>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto pt-4 px-5 border-t absolute bottom-6 w-[85%]">
                    {user ? (
                        <div>
                            <Link to="/profile" className="w-full flex items-center justify-center gap-3 bg-gray-100 py-3 rounded-lg font-medium mb-2">
                                <User size={18} /> {user.name}
                            </Link>
                             <Button onClick={logout} variant="outline" className="w-full">Logout</Button>
                        </div>
                    ) : (
                        <Link to="/login" className="w-full text-sm flex items-center justify-center gap-3 bg-gray-600 text-white py-3 rounded-lg font-[200]">
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
