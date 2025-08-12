export default function AnnouncementBar() {
  return (
    <div className="w-full bg-secondary text-secondary-foreground text-xs">
      <div className="container mx-auto flex h-9 items-center justify-between">
        <p className="hidden sm:block">
          Free Shipping over $75 • 24/7 Support • 30-day Returns
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Track Order</a>
        </div>
      </div>
    </div>
  );
}
