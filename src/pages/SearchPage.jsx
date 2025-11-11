
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://embedtechnolozix.com/api/get_products.php");
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = allProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchQuery) ||
        p.description?.toLowerCase().includes(searchQuery) ||
        p.features?.toLowerCase().includes(searchQuery)||
        p.category?.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(results);
  }, [searchQuery, allProducts]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10"
      >
        {/* Search Results for:{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          "{searchQuery}"
        </span> */}
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product)}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-transform duration-300 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain p-4 bg-gray-100"
              />
              <div className="px-4 py-3">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-2 font-bold text-blue-600 text-base">
                  ₹{parseFloat(product.price).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-20 text-gray-600"
        >
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-md">Try searching with a different keyword.</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchPage;
