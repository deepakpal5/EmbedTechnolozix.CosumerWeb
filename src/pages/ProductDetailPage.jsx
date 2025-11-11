
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Minus,
  Plus,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/lib/cart";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import { getProductById } from "../lib/cart";

const ProductDetailPage = () => {
  const products = useProducts();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const { toast } = useToast();
   const [loading, setLoading] = useState(true);
  // console.log(products);
  useEffect(() => {
    // Find the product by ID
    const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err.message);
    }
  };

    fetchProduct();


    
  }, [id]);




   useEffect(() => {
  setLoading(true); 
const timer = setTimeout(() => {

    const productId = parseInt(id);
    // const foundProduct = products.find(p => p.id === productId);
    // console.log(product);
    if (product) {




      
      // Get related products from the same category
      const related = products
        .filter(p => p.category === product.category && p.id !== productId)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
    
    // Reset quantity when product changes
    setQuantity(1);
    setActiveImage(0);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);




    setLoading(false); 
     }, 200);
     return () => clearTimeout(timer);
  }, [product]);
  





  const handleAddToCart = () => {
    if (product) {
// const formattedProduct = {
//   id: Number(product.id),
//   name: product.productName,
//   price: parseFloat(product.productPrice),
//   category: product.category,
//   rating: parseFloat(product.rating),
//   stock: Number(product.stock),
//   image: product.productImage,
//   description: product.productDescription,
//   features: product.features ? product.features.split('|') : [],
//   isFeatured: product.isFeatured === '1' || product.isFeatured === 1 ? true : false
// };
console.log(product);
// console.log(formattedProduct);
      addToCart(product, quantity);
      
      // Dispatch custom event to update cart count in navbar
      window.dispatchEvent(new Event("cartUpdated"));
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} has been added to your cart`,
      });
    }
  };
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  if (!product) {
    return (
      loading ? (
  <div className="flex justify-center items-center h-48">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
) :
      (<div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>)
    );
  }
  
  // Create dummy additional images for the product
  const productImages = [
    product.image,
    "/product-angle-1.jpg",
    "/product-angle-2.jpg",
    "/product-angle-3.jpg"
  ];
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-sm text-gray-500 hover:text-gray-700">Products</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to={`/category/${product.category}`} className="text-sm text-gray-500 hover:text-gray-700">
                  {product.category.split('|').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-24">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img  
                className="w-full h-full object-cover"
                alt={product.name}
               src={product.image} />
              
              {product.stock <= 5 && product.stock > 0 && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  Low Stock
                </Badge>
              )}
              
              {product.stock === 0 && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  Out of Stock
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                onClick={() => {
                  toast({
                    title: "Added to wishlist",
                    description: `${product.description} has been added to your wishlist`,
                  });
                }}
              >
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                    activeImage === index ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img  
                    className="w-full h-full object-cover"
                    alt={`${product.name} - view ${index + 1}`}
                   src={product.image} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">{product.rating} ({Math.floor(product.rating * 10)} reviews)</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-4">₹{product.price}</div>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500 ml-4">
                  {product.stock} available
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "Added to wishlist",
                      description: `${product.name} has been added to your wishlist`,
                    });
                  }}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Product Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.split("|").map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>




                  </li>
                ))}


              </ul>
            </div>
            
            <Separator className="my-6" />
            
            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">2 Year Warranty</h4>
                  <p className="text-sm text-gray-500">Full coverage</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">30 Day Returns</h4>
                  <p className="text-sm text-gray-500">Hassle-free returns</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Share */}
            <div className="flex items-center">
              <span className="text-sm font-medium mr-4">Share:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b">
            <TabsTrigger value="description" className="text-lg py-3">Description</TabsTrigger>
            <TabsTrigger value="specifications" className="text-lg py-3">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="text-lg py-3">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p className="mb-4">{product.description}</p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <table className="w-full">
                  <tbody>
                    {product.features.split("|").map((feature, index) => {
                      const [key, value] = feature.includes(':') 
                        ? feature.split(':') 
                        : [feature.split(' ')[0], feature.split(' ').slice(1).join(' ')];
                      
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-2 px-4 font-medium">{key}</td>
                          <td className="py-2 px-4">{value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Package Contents</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>1 x {product.name}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>User Manual</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>USB Cable</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Warranty Card</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <div className="text-4xl font-bold mr-2">{product.rating}</div>
                  <div>
                    <div className="flex text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {Math.floor(product.rating * 10)} reviews</div>
                  </div>
                </div>
                <Button className="ml-auto">Write a Review</Button>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">John Doe</div>
                    <div className="text-gray-500 text-sm">2 days ago</div>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < 5 ? "fill-current" : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Great product! Works exactly as described and the quality is excellent. I've been using it for my IoT projects and it's been very reliable.
                  </p>
                </div>
                
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-gray-500 text-sm">1 week ago</div>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? "fill-current" : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    The product is good, but the documentation could be better. Had to search online for some of the setup instructions. Otherwise, it works well for my projects.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Mike Johnson</div>
                    <div className="text-gray-500 text-sm">2 weeks ago</div>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < 5 ? "fill-current" : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Excellent product and fast shipping! I've purchased several of these for different projects and they've all worked flawlessly. Highly recommended for anyone working with embedded systems.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
