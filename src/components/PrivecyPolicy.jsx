// PrivacyPolicy.jsx
import React from 'react';

 function PrivacyPolicy() {
  return (
    <section className="relative pt-10 overflow-hidden">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">1. What We Collect</h3>
        <p>
          We collect personal information you voluntarily provide—such as name, email, address,
          phone number, and payment details—when you place an order or register an account.  
          {/* Based on standard ecommerce privacy outlines :contentReference[oaicite:1]{index=1} */}
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">2. How We Use It</h3>
        <p>
          We use your data to process orders, deliver products, communicate updates, and improve our service.
          We don't sell or share your information with third parties for marketing.  
          {/* Matches template practices :contentReference[oaicite:2]{index=2} */}
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">3. Payment Security</h3>
        <p>
          Payment details are handled securely by trusted payment providers. We do not store full card details on our servers.  
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">4. Cookies & Tracking</h3>
        <p>
          We use cookies and analytics tools (e.g., Google Analytics) to enhance your experience and optimize our site performance.  
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">5. Your Privacy Rights</h3>
        <p>
          You can access, correct, or delete your personal data—just reach out to us. We comply with GDPR and CCPA standards.  
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">6. Changes to Policy</h3>
        <p>
          We may update this policy occasionally. Any changes take effect when posted here.  
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-6">
        <strong>Contact Us:</strong> support@embedtechnolozix.com  
        <br />
        <em>Last updated: June 13, 2025</em>
      </p>
    </div></div>
    </section>
  );
}
export default PrivacyPolicy;