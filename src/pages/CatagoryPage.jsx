

import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/cart";
const CategoryPage= () => {
const products = useProducts();
const { id } = useParams();
const [filteredProducts, setFilteredProducts] = useState(products);
 useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
const timer = setTimeout(() => {
    let result = [...products];
    
    
   
    
    // Filter by category
   
// console.log(id);
//       console.log(result);



      if (id !== "all") {
      result = result.filter((p) => {


  return (
    p.name?.toLowerCase().includes(id) ||
    p.description?.toLowerCase().includes(id) ||
    p.features?.toLowerCase().includes(id) ||
    p.category?.toLowerCase().includes(id)
  );
}

);}

    
    
   
    
   

    setFilteredProducts(result);
     }, 300   ) ; // 500ms delay

  return () => clearTimeout(timer);
  }, [products,id]);
  return (



    <div className="container mx-auto px-24 py-24">
        <section className="py-16">
      <div className="container mx-auto px-4">
      
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {filteredProducts.map((product) => (
                         <ProductCard key={product.id} product={product} />
                       ))}
        </div>
      </div>
    </section>



    </div>
    
  );
};

export default CategoryPage;
