
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { getBlog } from "@/lib/data";

const BlogPage = () => {

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const blogPosts=getBlog();
  return (
   <section className="relative pt-10 overflow-hidden">
        <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
           <div className="top-0 right-0  overflow-hidden z-0">
        <div className="top-0 right-0   bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="bottom-0 left-0  bg-gradient-to-t from-background to-transparent" />
      </div>

 <div className="px-6 py-10 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-blue-700 text-center">EmbedTechnolozix Blog</h1>

      <p className="text-lg mb-12 text-center max-w-2xl mx-auto">
        Insights, tutorials, and industry trends in embedded systems, IoT, and smart hardware — curated by the engineers at EmbedTechnolozix.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300">
          
<Link to={`/blog/${post.id}`} className="block group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img  
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={post.title}
                     src={post.image}/>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      <span>Read More →</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-gray-600">
        <p>Stay tuned — more articles coming soon!</p>
      </div>
    </div>

      </section>
  );
};

export default BlogPage;
