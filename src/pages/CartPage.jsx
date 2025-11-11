
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCart, updateCartItem, removeFromCart, clearCart, getCartTotal,getCartSubTotal,getShipping,getTax } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";
import { isAuthenticated } from "@/lib/auth";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load cart from localStorage
    const cartitems=getCart();
    if (cartitems) {
      setCart(cartitems);
      // console.log(cartitems);
    }


    
  }, []);
  
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return handleRemoveItem(productId);
    else{
    const updatedCart = await updateCartItem(productId, newQuantity);

    if (updatedCart)
    setCart(updatedCart);}
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  const handleRemoveItem = async(productId) => {
    const updatedCart = await removeFromCart(productId);
    setCart(updatedCart);
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const handleClearCart =async() => {
    const updatedCart = await clearCart();
    setCart(updatedCart);
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });

    // window.location.reload();
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated()) {
      toast({
        title: "Login required",
        description: "Please login or create an account to checkout",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout");
    }, 1000);
  };
  
  // const subtotal = getCartTotal();
  // const shipping = subtotal > 50 ? 0 : 5.99;
  // const tax = subtotal * 0.07; // 7% tax
  // const total = subtotal + shipping + tax;
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Browse our products and find something you like!
          </p>
          <Button asChild size="lg">
            <Link to="/products">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Your Shopping Cart
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <Separator className="mb-6" />
              
              {cart.map( (item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b"
                >
                  {/* Product */}
                  <div className="col-span-6 flex items-center">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 mr-4">
                      <img  
                        className="w-full h-full object-cover"
                        alt={item.name}
                       src={item.image} />
                    </div>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center text-sm text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 flex md:block items-center justify-between">
                    <span className="md:hidden text-sm font-medium text-gray-500">Price:</span>
                    <span className="text-center block">₹{item.price}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex md:block items-center justify-between">
                    <span className="md:hidden text-sm font-medium text-gray-500">Quantity:</span>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 flex md:block items-center justify-between">
                    <span className="md:hidden text-sm font-medium text-gray-500">Total:</span>
                    <span className="font-medium text-right block">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </motion.div>
              ) )}
              
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
                <Button asChild variant="outline">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartSubTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {getShipping() === 0 ? "Free" : "₹"+(getShipping().toFixed(2))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span className="font-medium">₹{getTax().toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">₹{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </span>
                )}
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 9.51V12.5H2V5.5C2 4.4 2.9 3.5 4 3.5H13.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 12.5V18.5C22 19.6 21.1 20.5 20 20.5H4C2.9 20.5 2 19.6 2 18.5V12.5H22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 16.5H7.01" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 16.5H13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 9H22" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.5 18H7.5" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 18H16" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 4C7 4 7.5 2 9.5 2H14.5C16.5 2 17 4 17 4" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6V18C22 21 20 22 18 22H6C4 22 2 21 2 18V6C2 3 4 2 6 2H18C20 2 22 3 22 6Z" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 2V5" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2V5" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 9H21" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.6947 13.7H15.7037" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.6947 16.7H15.7037" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.9955 13.7H12.0045" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.9955 16.7H12.0045" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.29431 13.7H8.30329" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.29431 16.7H8.30329" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
