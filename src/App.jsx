import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar/"
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicePage from "./pages/ServicePage";
import ServiceDetailPage from "./pages/ServiceDetail";
import BlogPage from "./pages/BlogPage";
import AboutUs from "./pages/AboutUsPage";
import MyProfilePage from "./pages/MyAccountPage";
import CheckoutPage from "./pages/checkoutPage";
import ThankYouPage from "./pages/thankyou";
import TermsRefunds from "./components/Cancillation-refund";
import TermsShipping from "./components/policyformat";
import PrivacyPolicy from "./components/PrivecyPolicy";
import MyOrder from "./pages/MyOrders";
import ForgotPassword from "./pages/ForgotPassword";
import SearchPage from "./pages/SearchPage";
import { UserProvider } from "./lib/UserContext";
import CategoryPage from "./pages/CatagoryPage";
import BlogDetail from "./pages/BlogDetail";
import FAQPage from "./pages/FAQPage";

const App = () => {
  return (
     <UserProvider>    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Services" element ={<ServicePage/>}/>
            <Route path="/Service/:id" element ={<ServiceDetailPage/>}/>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/account" element={<MyProfilePage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/thank-you" element={<ThankYouPage/>}/>
            <Route path="/refund-policy" element={<TermsRefunds />} />
            <Route path="/term-Condition" element={<TermsShipping />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/orders"element={<MyOrder />} />
            <Route path="/forgot-password"element={<ForgotPassword />} />
            <Route path="/search"element={<SearchPage />} />
            <Route path="/category/:id"element={<CategoryPage />} />
            <Route path="/blog/:id"element={<BlogDetail />} />
            <Route path="/faq"element={<FAQPage />} />
            
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router></UserProvider>

  );
};

export default App;
