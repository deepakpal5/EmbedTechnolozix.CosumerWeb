
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/cart";
import { getUser, logout } from "@/lib/auth";




import { useUser } from "../lib/UserContext";




import { useToast } from "@/components/ui/use-toast";
const Navbar = () => {
  const { user, setUser } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    // Check user authentication status
    setUser(getUser());

    // Update cart count initially and when localStorage changes
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("scroll", handleScroll);

    // Custom event for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCartCount(0);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
    // window.location.reload();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
  initial={{ opacity: 0, scale: 2 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.1 }}
  className="relative font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex justify-center items-center"
>
  <img
    className="w-28 h-12 sm:w-32 sm:h-14 md:w-36 md:h-16 object-contain transition-transform duration-500 hover:scale-110"
    alt="ET"
    src="https://embedtechnolozix.com/images/LOGOFolder/Logo1.png"
  />
</motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              
              <img  
              // className="inset-0 w-22 h-12 object-cover transition-transform duration-1000 hover:scale-10"
               className="inset-0 w-21 h-12  object-contain transition-transform duration-1000 hover:scale-110"
              alt="EmbedTechnolozix"
             src={'https://embedtechnolozix.com/images/LOGOFolder/Logo2.png'} />
            </motion.div>





          </Link>

        
          <nav className="hidden md:flex flex-wrap items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="nav-link text-gray-700 hover:text-blue-600 font-small"
            >
              Home
            </Link>
             <Link
              to="/Services"
              className="nav-link text-gray-700 hover:text-blue-600 font-small"
            >
              Services
            </Link>
            <Link
              to="/products"
              className="nav-link text-gray-700 hover:text-blue-600 font-small"
            >
              Products
            </Link>
            {/* <Link
              to="/categories"
              className="nav-link text-gray-700 hover:text-blue-600 font-small"
            >
              Categories
            </Link> */}
            <Link
              to="/blog"
              className="nav-link text-gray-700 hover:text-blue-600 font-small"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="nav-link text-gray-700 hover:text-blue-600 font-small"
            >
              About
            </Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="flex items-center space-x-4">
            {/* Search (Desktop) */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative"
            >
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 rounded-full">
                      {cartCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </Link>

            {/* User Account */}
            {user ? (
              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar-placeholder.jpg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="py-6">
                    <form
                      onSubmit={handleSearch}
                      className="flex items-center relative mb-6"
                    >
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pr-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>

                    <nav className="flex flex-col space-y-4">
                      <Link
                        to="/"
                        className="text-lg font-medium hover:text-blue-600"
                      >
                        Home
                      </Link>
                      <Link
                        to="/Services"
                        className="nav-link text-gray-700 hover:text-blue-600 font-medium"
                        >
                        Services
                        </Link>
                      <Link
                        to="/products"
                        className="text-lg font-medium hover:text-blue-600"
                      >
                        Products
                      </Link>
                      <Link
                        to="/categories"
                        className="text-lg font-medium hover:text-blue-600"
                      >
                        Categories
                      </Link>
                      <Link
                        to="/blog"
                        className="text-lg font-medium hover:text-blue-600"
                      >
                        Blog
                      </Link>
                      <Link
                        to="/about"
                        className="text-lg font-medium hover:text-blue-600"
                      >
                        About
                      </Link>
                    </nav>
                  </div>

                  <div className="mt-auto border-t pt-4">
                    {user ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatar-placeholder.jpg" alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <Link to="/account">
                            <Button variant="outline" className="w-full">My Account</Button>
                          </Link>
                          <Link to="/orders">
                            <Button variant="outline" className="w-full">My Orders</Button>
                          </Link>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="destructive"
                          className="w-full mt-2"
                        >
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Link to="/login">
                          <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                        <Link to="/register">
                          <Button className="w-full">Register</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
