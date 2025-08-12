import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { PlusCircle, Plus, Edit, Trash2, Package, Calendar, LogOut, X, Search, Filter, MoreVertical, Upload } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// --- TypeScript Interfaces ---
interface ProductStyle {
  _id: string;
  name: string;
  category: string;
  imageUrls: string[];
}
interface Variant {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
  stockCount: number;
}
interface InventoryItem {
  _id: string;
  productStyle: ProductStyle;
  branch: { _id: string; name: string; };
  rentalPrice: number;
  securityDeposit: number;
  variants: Variant[];
}

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);

  const fetchBranchInventory = async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/inventory`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch inventory.");
      const data: InventoryItem[] = await response.json();
      setInventory(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchInventory();
  }, [token]);

  // ✅ FIX: Implemented the handleDelete function
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item? This action is permanent.")) return;
    
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete product.");
      }

      alert('Product deleted successfully!');
      // Refresh the inventory list to remove the deleted item from the UI
      fetchBranchInventory();

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-slate-200/60 p-0 hidden lg:flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-10 rounded-xl flex items-center justify-center">
              <img className="w-12 object-fill" src="redclub2.png" alt="" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">RedClub Admin</h1>
              <p className="text-sm text-slate-500">{user?.branch?.name || 'Loading...'}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm transition-all duration-200 hover:shadow-md">
            <Package size={20} className="text-blue-600" /> 
            <span>Inventory</span>
            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group">
            <Calendar size={20} className="text-slate-500 group-hover:text-slate-700" /> 
            <span>Bookings</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-200/60">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group">
            <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" /> 
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200/60 px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
              <p className="text-slate-600 mt-1">Manage your rental products and stock levels</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 w-80"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200">
                <Filter size={18} />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)} 
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <PlusCircle size={20} /> 
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Rental Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Stock Details</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="inline-flex items-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="text-slate-600">Loading inventory...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="text-red-500 bg-red-50 rounded-xl p-4 mx-6">
                          <p className="font-medium">Error loading inventory</p>
                          <p className="text-sm text-red-400 mt-1">{error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : inventory.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="text-slate-500">
                          <Package size={48} className="mx-auto mb-4 text-slate-300" />
                          <p className="font-medium">No products found</p>
                          <p className="text-sm text-slate-400 mt-1">Start by adding your first product to the inventory</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    inventory.filter(item => item.productStyle).map((item, index) => (
                      <tr key={item._id} className="hover:bg-slate-50/80 transition-colors duration-200">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 bg-slate-100 rounded-xl overflow-hidden">
                              {item.productStyle?.imageUrls?.[0] ? (
                                <img 
                                  src={item.productStyle.imageUrls[0]} 
                                  alt={item.productStyle.name || 'Product'} 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                  <Package size={24} className="text-slate-400" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-200"></div>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{item.productStyle?.name || 'Unknown Product'}</p>
                              <p className="text-sm text-slate-500">ID: {item._id.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {item.productStyle?.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div>
                            <p className="text-lg font-bold text-slate-900">₹{item.rentalPrice.toFixed(2)}</p>
                            <p className="text-sm text-slate-500">per rental</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            {item.variants?.length > 0 ? item.variants.map(v => (
                              <span 
                                key={v.size} 
                                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                  v.stockCount > 5 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : v.stockCount > 0 
                                    ? 'bg-amber-100 text-amber-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {v.size}: {v.stockCount}
                              </span>
                            )) : (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
                                No variants
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => { setEditingProduct(item); setIsEditModalOpen(true); }} 
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Edit product"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id)} 
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Delete product"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {isAddModalOpen && (
        <AddProductModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSuccess={() => {
            setIsAddModalOpen(false);
            fetchBranchInventory();
          }}
        />
      )}
    </div>
  );
}

// --- Add Product Modal Component ---
const AddProductModal = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [variants, setVariants] = useState<Variant[]>([{ size: '', stockCount: 1 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVariantChange = (index: number, field: keyof Variant, value: string) => {
    const updatedVariants = [...variants];
    if (field === 'stockCount') updatedVariants[index][field] = parseInt(value, 10) || 0;
    else updatedVariants[index][field] = value as Variant['size'];
    setVariants(updatedVariants);
  };

  const addVariantField = () => setVariants([...variants, { size: '', stockCount: 1 }]);
  const removeVariantField = (index: number) => setVariants(variants.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create the Product Style (the design)
      const styleFormData = new FormData();
      styleFormData.append('name', name);
      styleFormData.append('description', description);
      styleFormData.append('category', category);
      if (images) {
        for (let i = 0; i < images.length; i++) {
          styleFormData.append('images', images[i]);
        }
      }

      const styleRes = await fetch(`${API_BASE_URL}/api/styles`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: styleFormData,
      });
      if (!styleRes.ok) {
        const errData = await styleRes.json();
        throw new Error(errData.message || 'Failed to create product style.');
      }
      const styleData = await styleRes.json();
      const newProductStyleId = styleData.data._id;

      // Step 2: Create the Inventory Item for the branch
      const inventoryData = {
        productStyle: newProductStyleId,
        rentalPrice: Number(rentalPrice),
        securityDeposit: Number(securityDeposit),
        variants: variants,
      };

      const inventoryRes = await fetch(`${API_BASE_URL}/api/inventory`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
      });
      if (!inventoryRes.ok) {
        const errData = await inventoryRes.json();
        throw new Error(errData.message || 'Failed to create inventory item.');
      }

      alert('Product added successfully!');
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden transform scale-100 transition-all duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-8 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add New Product</h2>
            <p className="text-slate-600 mt-1">Create a new inventory item for your store</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>
        
        {/* Modal Content with Form */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Royal Blue Sherwani" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Describe your product in detail..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    rows={4} 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Sherwani, Suit, Lehenga" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Pricing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Rental Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={rentalPrice} 
                    onChange={(e) => setRentalPrice(e.target.value)} 
                    required 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white" 
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Security Deposit (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={securityDeposit} 
                    onChange={(e) => setSecurityDeposit(e.target.value)} 
                    required 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white" 
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Product Images</h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Upload Images</label>
                <div className="relative">
                  <input 
                    type="file" 
                    onChange={handleFileUpload} 
                    accept="image/*" 
                    multiple 
                    required 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    id="file-upload"
                  />
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                    <p className="text-lg font-medium text-slate-700">
                      Drop your images here, or <span className="text-blue-600">browse</span>
                    </p>
                    <p className="text-sm text-slate-500 mt-2">Support multiple images (PNG, JPG, WEBP)</p>
                    {images && images.length > 0 && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ {images.length} file{images.length > 1 ? 's' : ''} selected
                        </p>
                        <div className="text-xs text-green-600 mt-1">
                          {Array.from(images).map((file, index) => (
                            <div key={index}>{file.name}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Size Variants */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Size & Stock</h3>
                <button 
                  type="button" 
                  onClick={addVariantField} 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-all duration-200"
                >
                  <Plus size={16} />
                  Add Size
                </button>
              </div>
              
              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-2">SIZE</label>
                      <select 
                        value={variant.size} 
                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)} 
                        required 
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="" disabled>Select size</option>
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                        <option value="XXL">Double XL (XXL)</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-2">STOCK COUNT</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={variant.stockCount} 
                        onChange={(e) => handleVariantChange(index, 'stockCount', e.target.value)} 
                        required 
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" 
                        min="0"
                      />
                    </div>
                    
                    {variants.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeVariantField(index)} 
                        className="p-3 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-all duration-200 mt-6"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end gap-4 p-8 border-t border-slate-200 bg-slate-50">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading} 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-400 transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving Product...
              </div>
            ) : (
              "Save Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
