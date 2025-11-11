



import React from 'react';

function TermsShipping() {
  return (

    <section className="relative pt-10 overflow-hidden">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Shipping Terms & Conditions</h2>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">1. Order Processing</h3>
        <p>
          Orders are processed <strong>Mon–Fri</strong> (no processing on public holidays).
          Orders placed before <strong>2 PM IST</strong> ship the same day; otherwise, next business day.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">2. Shipping Destinations & Methods</h3>
        <p>We ship only within <strong>India</strong>. Delivery options:</p>
        <ul className="list-disc ml-6">
          <li><strong>Standard:</strong> 6–8 business days</li>
          <li><strong>Express:</strong> 2–3 business days (surcharge applies)</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">3. Shipping Charges</h3>
        <p>
          Standard shipping is ₹49 for orders under ₹999. Free standard shipping on orders ≥ ₹999.
          Express shipping incurs an additional flat fee (shown at checkout).
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">4. Multiple Shipments</h3>
        <p>
          Items may ship in separate packages due to stock availability or size. Tracking info is provided for each package.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">5. Delivery Issues</h3>
        <p>
          If your order hasn't arrived within the estimated timeframe, contact us at 
          <a href="mailto:support@embedtechnolozix.com" className="text-blue-600">support@embedtechnolozix.com</a> 
          with your order number and shipping address.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">6. PO Boxes & Military Addresses</h3>
        <p>
          Express shipping is unavailable for PO Box / APO / FPO addresses—standard shipping applies. Use a physical address to qualify for express shipping.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">7. Risk & Title Transfer</h3>
        <p>
          Title and risk pass to you once the carrier takes possession. We recommend insuring high-value items in transit.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">8. Order Changes & Cancellations</h3>
        <p>
          You may modify or cancel your order only before it ships. After dispatch, you’ll need to contact the carrier directly.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">9. Undeliverable Packages</h3>
        <p>
          If a delivery is returned due to incorrect address or refusal, reshipment fees may apply. Shipping costs are non-refundable in such cases.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">10. Force Majeure</h3>
        <p>
          Delays due to events beyond our control (e.g., natural disasters, strikes, customs holdups) are not our responsibility.
        </p>
      </section>

      
    </div></div>
    </section>
  );
}

export default TermsShipping;








