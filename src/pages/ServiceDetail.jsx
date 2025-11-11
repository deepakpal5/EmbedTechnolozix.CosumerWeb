import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ServicesCollections } from "@/lib/data";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const ServicesProvide = ServicesCollections();

  useEffect(() => {
    const foundService = ServicesProvide.find((p) => p.id === id);
    if (foundService) {
      setService(foundService);
    }
    window.scrollTo(0, 0);
  }, [id, ServicesProvide]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <p className="text-gray-600 mb-8">The Service you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/Services">Back to Services</Link>
        </Button>
      </div>
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
                <Link to="/Services" className="text-sm text-gray-500 hover:text-gray-700">Services</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700">{service.title}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-24">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img
  className="w-full h-full object-contain"
  alt={service.title}
  src={service.image}
/>

            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
              <p className="text-gray-600 mb-6">{service.description}</p>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {service.point_covered.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center">
              <span className="text-sm font-medium mr-4">Share:</span>
              <div className="flex space-x-2">
                {/* Replace with share buttons */}
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b">
            <TabsTrigger value="description" className="text-lg py-3">Description</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p className="mb-4">{service.description}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceDetailPage;