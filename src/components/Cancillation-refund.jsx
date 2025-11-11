
import React from 'react';

 function TermsRefunds() {
  return (

    <section className="relative pt-10 overflow-hidden">
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Cancellations & Refunds Policy</h2>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">1. Order Cancellation</h3>
        <p>
          You may cancel your order within <strong>14 days</strong> of placing it, provided it has not yet been shipped. 
          Cancellation must be submitted via email (<em>support@embedtechnolozix.com</em>) or our contact form.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">2. Refund Eligibility</h3>
        <ul className="list-disc ml-6">
          <li>Cancel before shipment? Full refund (excluding any payment processing fees).</li>
          <li>After dispatch? Refunds are only for defective or damaged products.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">3. Refund Timeframes</h3>
        <p>
          Once we receive a valid refund request (and returned item, if applicable), refunds will be processed within <strong>7–14 business days</strong> to the original payment method.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">4. Return Shipping</h3>
        <p>
          For damaged/defective goods: we provide a prepaid shipping label. 
          For other cancellations: return shipping cost is your responsibility.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">5. Non-Refundable Items</h3>
        <p>Items that are customized, intimate, or perishable cannot be returned or refunded after dispatch.</p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">6. Refund Methods</h3>
        <p>Refunds will be credited via original payment method. If that’s not available, we may issue store credit.</p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">7. Partial or No Refund</h3>
        <p>
          We reserve the right to refuse or partially refund orders due to abuse of policy, missing original packaging, or unreasonable delays in return.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold">8. Dispute Resolution</h3>
        <p>
          If you disagree with our refund decision, contact <em>support@embedtechnolozix.com</em>. We will review within <em>10 business days</em>.
        </p>
      </section>

     
    </div>
    </div>
    </section>
  );
}
export default TermsRefunds;