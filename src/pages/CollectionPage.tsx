import React, { useState, useEffect } from "react";
import ProductCard, { ProductStyle } from "@/components/home/ProductCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Tag } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// In a real app, you would fetch these from dedicated API endpoints
const MOCK_CATEGORIES = ["Suit", "Blazer", "Sherwanis","Kurtha", "Shirts", "Pants", "Accessories"];
// ❗ IMPORTANT: You MUST replace these placeholder IDs with the actual `_id` values
// from your 'branches' collection in MongoDB Atlas for the filter to work correctly.
const MOCK_BRANCHES = [
    { _id: "6899f1dd8ae2724823e772a5", name: "Redclub Deralakatte" }, // Example ID, please verify
    { _id: "6899f1ec8ae2724823e772a6", name: "Redclub Mangalore" },
    { _id: "6899f2008ae2724823e772a7", name: "Redclub Uppala" },
];

export default function CollectionPage() {
  const [styles, setStyles] = useState<ProductStyle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for all filters, sorting, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // This useEffect now triggers a new API call whenever any filter changes
  useEffect(() => {
    const fetchFilteredData = async () => {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: '9',
        sort: sortOrder,
      });
      if (selectedCategories.length > 0) params.append('categories', selectedCategories.join(','));
      if (selectedBranches.length > 0) params.append('branches', selectedBranches.join(','));
      if (searchTerm) params.append('search', searchTerm);

      try {
        const response = await fetch(`${API_BASE_URL}/api/public/styles?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch products. Please check your connection or filters.");
        const data = await response.json();
        setStyles(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.totalItems || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    const searchTimeout = setTimeout(fetchFilteredData, 300);
    return () => clearTimeout(searchTimeout);
  }, [currentPage, selectedCategories, selectedBranches, sortOrder, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    setCurrentPage(1);
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranches(prev => prev.includes(branchId) ? prev.filter(id => id !== branchId) : [...prev, branchId]);
    setCurrentPage(1);
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* --- Filters Sidebar --- */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search by name..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <Accordion type="multiple" defaultValue={["categories", "branches"]} className="w-full">
              <AccordionItem value="categories">
                <AccordionTrigger className="text-base font-semibold text-gray-800"><Tag size={16} className="mr-2"/>CATEGORIES</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {MOCK_CATEGORIES.map(category => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox id={`cat-${category}`} checked={selectedCategories.includes(category)} onCheckedChange={() => handleCategoryChange(category)} />
                        <label htmlFor={`cat-${category}`} className="text-sm text-gray-700 cursor-pointer">{category}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="branches">
                <AccordionTrigger className="text-base font-semibold text-gray-800"><MapPin size={16} className="mr-2"/>BRANCH</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {MOCK_BRANCHES.map(branch => (
                      <div key={branch._id} className="flex items-center space-x-3">
                        <Checkbox id={`branch-${branch._id}`} checked={selectedBranches.includes(branch._id)} onCheckedChange={() => handleBranchChange(branch._id)} />
                        <label htmlFor={`branch-${branch._id}`} className="text-sm text-gray-700 cursor-pointer">{branch.name}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        {/* --- Products Grid --- */}
        <section className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Showing {totalItems} results</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <Select value={sortOrder} onValueChange={(value) => { setSortOrder(value); setCurrentPage(1); }}>
                <SelectTrigger className="w-[180px] h-9 text-sm font-semibold border-none bg-transparent focus:ring-0">
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Alphabetical (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Alphabetical (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading && <p className="text-center py-20">Loading...</p>}
          {error && <p className="text-center py-20 text-red-500">{error}</p>}
          
          {!isLoading && !error && (
            <>
              {styles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {styles.map((style) => (
                    <ProductCard key={style._id} product={style} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold">No Products Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                </div>
              )}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-2">
                  <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button key={page} variant={currentPage === page ? 'default' : 'outline'} onClick={() => setCurrentPage(page)} className="w-10 h-10">{page}</Button>
                  ))}
                  <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
