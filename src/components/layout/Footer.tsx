import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className=" border-t  ">
      <div className="container mx-auto grid gap-8 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">RedClub Co.</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium men's fashion for modern gentlemen.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/#products" className="hover:underline">Shop</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>support@redclub.co</li>
            <li>+1 (555) 000-1234</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Newsletter</h4>
          <p className="mt-2 text-sm text-muted-foreground">Get style tips and exclusive offers.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Your email" aria-label="Email address" />
            <Button type="submit" variant="default">Subscribe</Button>
          </form>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook /></a>
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter /></a>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Redclub All rights reserved.</div>
    </footer>
  );
}
