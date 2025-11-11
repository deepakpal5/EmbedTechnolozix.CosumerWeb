
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import  LOGO2 from "https://embedtechnolozix.com/images/LOGOFolder/Logo2.png";
// import  LOGO1 from "https://embedtechnolozix.com/images/LOGOFolder/Logo1.png";
import { motion } from "framer-motion";

const Footer = () => {

 const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  setError('');
    setSubmitted(true);

    // Simulate sending email to backend or email marketing service
    setTimeout(() => {
      console.log(`Email submitted: ${email}`);
      setEmail('');
    }, 500);
    

    // alert("Thank you for subscribing to our newsletter!");
    // e.target.reset();
  };

  return (
    <footer className="bg-gray-600 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
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
            </div>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for electronics and embedded systems. Quality products for makers, hobbyists, and professionals.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/embedtechnolizix" target="https://facebook.com/embedtechnolizix" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              {/* <a href="https://twitter.com" target="https://twitter.com" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a> */}
              <a href="https://instagram.com/embedtechnolozix" target="https://instagram.com/embedtechnolozix" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@embedtechnolozix" target="https://youtube.com/@embedtechnolozix" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com/company/embedtechnolozix" target="https://linkedin.com/company/embedtechnolozix" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
             
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">
                  Noida Sector 115,Meerut , UP India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400" />
                <span className="text-gray-400">+919639627944</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <span className="text-gray-400">info@embedtechnolozix.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest products, offers, and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                 type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
                className="bg-gray-800 border-gray-700 text-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Subscribe
              </Button>
            </form>
            {submitted && !error && (
        <div className="mt-4 text-green-600 text-center">
          ✅ You’ve successfully subscribed!
        </div>
      )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; 2023 EmbedTechnolozix. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-500 hover:text-white text-sm">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
