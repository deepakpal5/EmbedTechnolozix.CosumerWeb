
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { getBlog } from "../lib/data";

const BlogDetail = () => {
  const { id } = useParams();
   const Blog =getBlog(id);
 

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);




  





 
  

  if (!Blog) {
    return (
      loading ? (
  <div className="flex justify-center items-center h-48">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
) :
      (<div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600 mb-8">The Blog you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>)
    );
  }
  
 
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
                <Link to="/blog" className="text-sm text-gray-500 hover:text-gray-700">Blog</Link>
              </div>
            </li>
         
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700">{Blog.title}</span>
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
                alt={Blog.title}
               src={Blog.image} />
              
              
              
              
              
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
              <h1 className="text-3xl font-bold mb-2">{Blog.title}</h1>
              <div className="flex items-center mb-2">
               
                <span className="text-sm text-gray-500 ml-2"> {Blog.date} </span>
              </div>
              <div className="text-1xl  text-black-100 mb-4">{Blog.author}</div>
              <p className="text-gray-600 mb-6">{Blog.excerpt}</p>
            </div>
            
            <Separator className="my-6" />
            
           
            <Separator className="my-6" />
            
           
            
            <Separator className="my-6" />
           
            
            <Separator className="my-6" />
            
            
          </div>
        </motion.div>
      </div>
     
     
    </div>
  );
};

export default BlogDetail;
