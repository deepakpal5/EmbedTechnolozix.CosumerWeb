
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getProductsByIds } from "../lib/cart";

function ThankYou() {
  const location = useLocation();
  const { order } = location.state || {};

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
    try {
      const productIds = order.items.map((item) => item.product_id);
      const data = await getProductsByIds(productIds);
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err.message);
    }
  };


    if (order && Array.isArray(order.items) && order.items.length > 0) {
      fetchProducts();
    }
  }, [order]);

  if (!order || !order.items) {
    return (
      <section className="relative pt-10 overflow-hidden">
        <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
        <div className="top-0 right-0 overflow-hidden z-0">
          <div className="top-0 right-0 bg-gradient-to-l from-blue-600/10 to-transparent" />
          <div className="bottom-0 left-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="p-10 text-center">Loading details...........</div>
      </section>
    );
  }

  return (
    <section className="relative pt-10 overflow-hidden">
      <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
      <div className="top-0 right-0 overflow-hidden z-0">
        <div className="top-0 right-0 bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="bottom-0 left-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          🧾 Invoice / Order Summary
        </h1>

        <div className="mb-6">
          <p><span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleString()}</p>
          <p><span className="font-semibold">Payment ID:</span> {order.payment_id}</p>
          <p><span className="font-semibold">Email:</span> {order.user_email}</p>
        </div>

        <h2 className="text-xl font-semibold mb-2">Items Ordered:</h2>
        <div className="overflow-x-auto border border-gray-300 rounded-lg mb-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border-b">#</th>
                <th className="p-2 border-b">Product</th>
                <th className="p-2 border-b">Price (₹)</th>
                <th className="p-2 border-b">Quantity</th>
                <th className="p-2 border-b">Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => {


// const matchedProduct = products.find((p) => p.id == item.product_id);
                
                const price = parseFloat(item?.price|| "0");

                // const matchedProduct = products.find((p) => p.id == item.product_id);

                // const price = parseFloat(matchedProduct?.price|| "0");
                // console.log(matchedProduct);

                return (
                  <tr key={index} className="text-gray-800">
                    <td className="p-2 border-b">{index + 1}</td>
                    <td className="p-2 border-b">{item?.name || "Unknown Product"}</td>
                    <td className="p-2 border-b">₹{price.toFixed(2)}</td>
                    <td className="p-2 border-b">{item.quantity}</td>
                    <td className="p-2 border-b">₹{(price * item.quantity).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-right mt-6">
          <p className="text-lg font-bold">Total: ₹{order.total_amount}</p>
        </div>

        <div className="text-sm text-gray-500 text-center mt-8">
          <div style={styles.container}>
            <h1>Thank you for shopping with <strong>EmbedTechnolozix</strong>! 💙</h1>
            <p>Your order has been successfully placed and is on its way.</p>
            <p>We’ve sent a confirmation email with the shipping details.</p>

            <Link to="/" style={styles.button}>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    marginTop: '20px',
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  }
};

export default ThankYou;
