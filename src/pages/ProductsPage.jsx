
// import { useProducts } from "../lib/hooks/useProducts";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { useCategory } from "@/lib/data";
import { useProducts } from "@/lib/cart";

const ProductsPage = () => {
  const categories=useCategory();
  const products = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
setLoading(true); 
const timer = setTimeout(() => {
    let result = [...products];
    
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
// console.log(selectedCategory);
//       console.log(result);
      result = result.filter((p) => {


  return (
    p.name?.toLowerCase().includes(selectedCategory) ||
    p.description?.toLowerCase().includes(selectedCategory) ||
    p.features?.toLowerCase().includes(selectedCategory) ||
    p.category?.toLowerCase().includes(selectedCategory)
  );
}

);

    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured sorting (default)
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    setFilteredProducts(result);
    setLoading(false); 
     }, 300); // 500ms delay

  return () => clearTimeout(timer);
  }, [products,searchQuery, selectedCategory, priceRange, sortBy]);

  

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange(prev => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 20000 });
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">
            Browse our wide selection of electronics and embedded systems
          </p>
        </motion.div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <Button
            variant="outline"
            className="md:hidden mr-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Search</h4>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="category"
                  checked={selectedCategory === "all"}
                  onChange={() => setSelectedCategory("all")}
                  className="mr-2"
                />
                <label htmlFor="all" className="text-sm">All Categories</label>
              </div>
              
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    id={category.id}
                    name="category"
                    checked={selectedCategory === category.id }
                    onChange={() => setSelectedCategory(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={category.id} className="text-sm">{category.name}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">Min (₹)</label>
                <Input
                  type="number"
                  min="0"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(e, "min")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Max (₹)</label>
                <Input
                  type="number"
                  min="0"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e, "max")}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Filters - Mobile */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Search</h4>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="mobile-all"
                    name="mobile-category"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="mr-2"
                  />
                  <label htmlFor="mobile-all" className="text-sm">All Categories</label>
                </div>
                
                {categories.map(category => (
                  <div key={`mobile-${category.id}`} className="flex items-center">
                    <input
                      type="radio"
                      id={`mobile-${category.id}`}
                      name="mobile-category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`mobile-${category.id}`} className="text-sm">{category.name}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Min (₹)</label>
                  <Input
                    type="number"
                    min="0"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Max (₹)</label>
                  <Input
                    type="number"
                    min="0"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={clearFilters}
              >
                Clear All
              </Button>
              <Button
                className="w-1/2"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Mobile Sort */}
          <div className="md:hidden mb-6">
            <Tabs defaultValue={sortBy} onValueChange={setSortBy}>
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="featured" className="text-xs">Featured</TabsTrigger>
                <TabsTrigger value="price-low" className="text-xs">Price ↓</TabsTrigger>
                <TabsTrigger value="price-high" className="text-xs">Price ↑</TabsTrigger>
                <TabsTrigger value="name" className="text-xs">Name</TabsTrigger>
                <TabsTrigger value="rating" className="text-xs">Rating</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {
          
         loading ? (
  <div className="flex justify-center items-center h-48">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
) :


filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) 
          : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;





