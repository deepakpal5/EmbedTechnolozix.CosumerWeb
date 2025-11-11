
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
const AboutUs = () => {
   useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <section className="relative pt-10 overflow-hidden">
        <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
           <div className="top-0 right-0  overflow-hidden z-0">
        <div className="top-0 right-0   bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="bottom-0 left-0  bg-gradient-to-t from-background to-transparent" />
      </div>

 <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">About Us</h1>

      <p className="mb-6 text-lg">
        <strong>EmbedTechnolozix — Empowering the Future with Embedded Intelligence</strong>
      </p>

      <p className="mb-6">
        Established in 2023, <strong>EmbedTechnolozix</strong> is a forward-thinking technology company specializing in
        <strong> embedded systems design and development</strong>. We build intelligent solutions that power smart devices,
        connected systems, and automation technologies across a wide range of industries.
      </p>

      <p className="mb-6">
        Our solutions are the backbone of modern innovation — from <strong>IoT devices</strong> and
        <strong> automotive electronics</strong> to <strong>industrial automation</strong> and <strong>consumer tech</strong>.
        With a strong focus on reliability, efficiency, and scalability, EmbedTechnolozix helps businesses transform bold
        ideas into real-world embedded applications.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600">Our Mission</h2>
      <p className="mb-6">
        To engineer robust and innovative embedded solutions that drive performance, efficiency, and intelligence in a
        connected world.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Our Vision</h2>
      <p className="mb-6">
        To become a global leader in embedded technology by delivering smarter systems that shape the future of digital
        transformation.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">What We Offer</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Custom Embedded Hardware Design</li>
        <li>Firmware & Software Development</li>
        <li>IoT Integration & Sensor Networks</li>
        <li>Embedded Linux & Real-Time Systems</li>
        <li>PCB Design & Rapid Prototyping</li>
        <li>Testing, Validation, and Product Support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Why Choose EmbedTechnolozix?</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li><strong>Expert Engineers:</strong> Our multidisciplinary team brings deep technical knowledge and practical experience.</li>
        <li><strong>Tailored Solutions:</strong> Every project is custom-built to meet specific performance, cost, and time requirements.</li>
        <li><strong>Innovation-First Culture:</strong> We stay ahead by embracing the latest in embedded platforms and design tools.</li>
        <li><strong>Client Partnership:</strong> We work as an extension of your team — transparent, collaborative, and committed to results.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Meet Our Team</h2>
      <p className="mb-6">
        At the heart of EmbedTechnolozix is a team of passionate engineers, developers, and innovators with a shared goal:
        building smart, efficient, and future-ready systems. From embedded firmware architects to hardware designers and
        IoT specialists, our people bring <strong>diverse skills and a shared commitment to quality</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Our Core Values</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li><strong>Innovation:</strong> We believe in challenging the status quo and pushing boundaries with creative engineering.</li>
        <li><strong>Precision:</strong> We build systems that are optimized, reliable, and meticulously crafted.</li>
        <li><strong>Integrity:</strong> We act with honesty, transparency, and accountability in everything we do.</li>
        <li><strong>Growth:</strong> We foster continuous learning and embrace new technologies to serve our clients better.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600">Let’s Build the Future Together</h2>
      <p className="mb-6">
        Whether you're building the next-generation smart device or need expert support on a complex embedded project,
        <strong> EmbedTechnolozix</strong> is your trusted technology partner.
      </p>

      <p className="text-lg font-medium">📩 Get in touch with us today to discuss your project.</p>
    </div>

    </section>
    
  );
};

export default AboutUs;
