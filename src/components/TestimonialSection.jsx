
import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../lib/data";

// const testimonials = [

//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Electrical Engineer",
//     content: "EmbedTechnolozix has been my go-to for all electronic components. Their Arduino selection is unmatched, and the shipping is always fast and reliable.",
//     avatar: "/avatar-1.jpg"
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Robotics Enthusiast",
//     content: "I've been building robots for years, and EmbedTechnolozix consistently provides the highest quality sensors and microcontrollers. Their technical support is also excellent!",
//     avatar: "/avatar-2.jpg"
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "IoT Developer",
//     content: "As someone who works on IoT projects daily, having a reliable supplier is crucial. EmbedTechnolozix delivers every time with quality products and great documentation.",
//     avatar: "/avatar-3.jpg"
//   }
// ];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white/20">
                    <img  
                      className="w-full h-full object-cover"
                      alt={`${testimonial.name} avatar`}
                     src="https://images.unsplash.com/photo-1544212408-c711b7c19b92" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-blue-200 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <svg className="w-8 h-8 text-blue-300/50" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8c-4.418 0-8 3.582-8 8v12h8v-12h-4c0-2.209 1.791-4 4-4v-4zm20 0c-4.418 0-8 3.582-8 8v12h8v-12h-4c0-2.209 1.791-4 4-4v-4z" />
                  </svg>
                </div>
                
                <p className="text-blue-100 leading-relaxed">{testimonial.content}</p>
                
                <div className="mt-6 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-300 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
