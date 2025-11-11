import React from 'react';

function ShippingPolicy() {
  return (
    <div className="bg-white border rounded-lg p-4 mt-6 shadow-md">
      <h2 className="text-xl font-semibold mb-2">📦 Shipping Policy</h2>
      <p className="text-gray-700 text-sm leading-relaxed">
        We process all orders within <strong>1-2 business days</strong>. Delivery timelines depend on your location:
        <br /><br />
        - In India : <strong>0-7 working days</strong><br />
        {/* - Other areas: <strong>5-8 days</strong><br /><br /> */}
        Once shipped, you will receive a tracking ID via email or SMS. Please ensure your shipping details are correct.
        <br /><br />
        For any concerns, contact us at <a href="mailto:support@embedtechnolozix.com" className="text-blue-600 underline">support@embedtechnolozix.com</a>.
      </p>
    </div>

  );
}

export default ShippingPolicy;








