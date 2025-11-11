
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ServicesCollections } from "@/lib/data";
import { Button } from "@/components/ui/button";

const ServiceSection = () => {

const ServiceProvide=ServicesCollections();



  
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        
        
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
           <div>
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               viewport={{ once: true }}
               className="text-3xl font-bold mb-2"
             >
               Services Provided
             </motion.h2>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               viewport={{ once: true }}
               className="text-gray-600"
             >
               Discover our Services by selection of top-quality Services given By EmbedTechnolozix
             </motion.p>
           </div>
           
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
             viewport={{ once: true }}
           >
             <Button asChild variant="ghost" className="group">
               <Link to="/Services" className="flex items-center">
                 View All Services
                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </Link>
             </Button>
           </motion.div>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {ServiceProvide .map( (collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/Service/${collection.id}`} className="block group">
                <div className="relative rounded-xl overflow-hidden shadow-lg h-80">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  
                  <img  
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={collection.title}
                   src={collection.image} />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                    <p className="text-gray-200 mb-4">{collection.description}</p>
                    
                    <div className="flex items-center text-blue-300 font-medium group-hover:text-blue-200 transition-colors">
                      <span>Explore Services</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;





