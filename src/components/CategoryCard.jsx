
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="category-card relative rounded-xl overflow-hidden shadow-md group h-64"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        
        <img  
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={category.name}
         src={category.image} />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
          <p className="text-gray-200 text-sm mb-3">{category.description}</p>
          
          <div className="flex items-center text-blue-300 text-sm font-medium group-hover:text-blue-200 transition-colors">
            <span>Explore products</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
