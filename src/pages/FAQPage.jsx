import React, { useState, useEffect } from "react";
const FAQPage = () => {
     useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    
    <div className="container mx-auto px-4 pt-20 pb-10">
          <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
        <div className="top-0 right-0  overflow-hidden z-0">
        <div className="top-0 right-0   bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="bottom-0 left-0  bg-gradient-to-t from-background to-transparent" />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">❓ Frequently Asked Questions</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold">1. What is EmbedTechnolozix?</h2>
          <p className="text-gray-700">
            EmbedTechnolozix is a technology platform focused on embedded systems, IoT, automation, and smart application development.
            We offer end-to-end solutions—from hardware design to cloud integration and mobile app development.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. What services do you provide?</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Embedded system design</li>
            <li>IoT development</li>
            <li>Android & iOS app development (Flutter)</li>
            <li>Web development</li>
            <li>Cloud integration (Firebase, AWS, etc.)</li>
            <li>Custom PCB design</li>
            <li>Smart home and industrial automation</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Do you provide custom hardware solutions?</h2>
          <p className="text-gray-700">
            Yes, we specialize in developing custom embedded hardware and firmware tailored to your project’s needs.
            From sensors and microcontrollers to complete PCB design—we handle it all.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Can you integrate IoT devices with mobile apps?</h2>
          <p className="text-gray-700">
            Absolutely! We build real-time apps that communicate with your IoT devices using:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>WebSockets</li>
            <li>MQTT</li>
            <li>HTTP/REST APIs</li>
            <li>BLE/WiFi modules (like ESP32, ESP8266, etc.)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Do you build complete e-commerce or service-based platforms?</h2>
          <p className="text-gray-700">
            Yes. We build robust platforms with:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Admin dashboards</li>
            <li>User apps</li>
            <li>Payment gateway integration (Razorpay, PayPal, etc.)</li>
            <li>Location/GPS services</li>
            <li>Notification systems</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. How can I contact you for a project?</h2>
          <p className="text-gray-700">
            You can reach out via:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>Email:</strong> support@embedtechnolozix.com</li>
            <li><strong>Phone:</strong> +91-9639627944</li>
            <li><strong>Contact Form:</strong> <a href="https://embedtechnolozix.com/contact" className="text-blue-500 underline">Visit Contact Page</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Do you offer support and maintenance?</h2>
          <p className="text-gray-700">
            Yes, we provide:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Ongoing support after deployment</li>
            <li>Bug fixes</li>
            <li>Feature updates</li>
            <li>AMC (Annual Maintenance Contracts)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. Can I hire your team for long-term collaboration?</h2>
          <p className="text-gray-700">
            Yes. We offer dedicated development and long-term partnerships for startups, R&D labs, and SMEs looking to scale their product.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">9. What industries do you serve?</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Smart homes</li>
            <li>Agriculture</li>
            <li>HealthTech</li>
            <li>Energy & power monitoring</li>
            <li>Industrial automation</li>
            <li>Education & EdTech</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">10. How experienced is your team?</h2>
          <p className="text-gray-700">
            Our team consists of engineers and developers with 5+ years of experience in:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Embedded C, C++, Python</li>
            <li>Flutter, React, PHP</li>
            <li>Hardware prototyping</li>
            <li>End-to-end IoT deployment</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📩 Still Have Questions?</h2>
          <p className="text-gray-700">
            Feel free to <a href="https://embedtechnolozix.com/api/querygenrate.php" className="text-blue-500 underline">Contact Us</a> for custom queries or technical consultations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
