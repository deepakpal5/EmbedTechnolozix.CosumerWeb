
import React from "react";
import ServiceSection from "@/components/ServiceSection";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import TestimonialSection from "@/components/TestimonialSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";

const HomePage = () => {
  return (
    <div>
      
      <HeroSection />
      <ServiceSection/>
      <FeaturedProducts />
      <CategorySection />
      <TestimonialSection />
      <BlogSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
