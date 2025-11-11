
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";

const ProductCard = ({ product }) => {
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);

    // console.log(product);
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`}>
        <Card className="product-card h-full flex flex-col overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300">
          <div className="relative pt-[100%] overflow-hidden bg-gray-100">
            <img  
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt={product.name}
             src={product.image} />
            
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Low Stock
              </Badge>
            )}
            
            {product.stock === 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Out of Stock
              </Badge>
            )}
            
            {product.isFeatured && (
              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500">
                Featured
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toast({
                  title: "Added to wishlist",
                  description: `${product.name} has been added to your wishlist`,
                });
              }}
            >
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
            </Button>
          </div>
          
          <CardContent className="flex-grow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
            </div>
            
            <div className="flex items-center mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
            </div>
            
            <p className="text-gray-500 text-sm line-clamp-2 mb-2">
              {product.description?.substring(0, 80)}...
            </p>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 mt-auto">
            <div className="w-full flex justify-between items-center">
              <div className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
