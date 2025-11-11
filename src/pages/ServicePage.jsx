
import { motion } from "framer-motion";
import { ServicesCollections } from "@/lib/data";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const ServicePage = () => {
  
const ServicesProvide=ServicesCollections();
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">All Services</h1>
          <p className="text-gray-600">
            Browse our wide selection of providing Services.
          </p>
        </motion.div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >


              {ServicesProvide.map((ServiceProfile,index)=>(
                <motion.div
                  key={ServiceProfile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              >
                <Link to={`/Service/${ServiceProfile.id}`} className="block group">
                 <div className="relative rounded-xl overflow-hidden shadow-lg h-80">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <img  
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={ServiceProfile.title}
                   src= {ServiceProfile.image}/>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2">{ServiceProfile.title}</h3>
                    <p className="text-gray-200 mb-4">{ServiceProfile.description}</p>
                    
                    <div className="flex items-center text-blue-300 font-medium group-hover:text-blue-200 transition-colors">
                      <span>Explore Services</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  </div>
                </Link>
                </motion.div>

              ))}
             
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
