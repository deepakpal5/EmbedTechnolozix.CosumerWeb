

import { useEffect, useState } from "react";
import { getUser } from "../lib/auth";
import { useProducts } from "@/lib/cart";
import { Loader2, PackageCheck, Truck, Ban, CreditCard } from "lucide-react";

export default function MyOrder() {
  const products = useProducts();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUser();
    if (!u) return (window.location.href = "/login");
    setUser(u);
    fetchOrders(u.email);
  }, []);

  const fetchOrders = async (email) => {
    setLoading(true);
    try {
      const res = await fetch(`https://embedtechnolozix.com/api/get_orders.php?email=${email}`);
      const { success, orders } = await res.json();
      if (success) {setOrders(orders);

        // console.log(orders);
      }
      else alert("Failed to fetch orders");
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    const res = await fetch(`https://embedtechnolozix.com/api/update_order_status.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId, delivery_status: status }),
    });
    const data = await res.json();
    if (data.success) fetchOrders(user.email);
  };

  const refund = async (payment_id, orderid, amountRs) => {
    const refundOrder = {
      payment_id,
      amount: amountRs * 100,
    };
    const res = await fetch("https://embedtechnolozix.com/api/refund_payment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(refundOrder),
    });
    const data = await res.json();
    if (data.success) {
      updateStatus(orderid, "Cancelled");
    } else {
      alert("Refund error: " + data.error);
    }
  };

  const renderStatusBadge = (status) => {
    const base = "text-xs px-2 py-1 rounded-full font-semibold";
    switch (status) {
      case "Pending":
        return <span className={`${base} bg-yellow-100 text-yellow-800`}><CreditCard className="inline h-4 w-4 mr-1" />Pending</span>;
      case "Shipped":
        return <span className={`${base} bg-blue-100 text-blue-800`}><Truck className="inline h-4 w-4 mr-1" />Shipped</span>;
      case "Delivered":
        return <span className={`${base} bg-green-100 text-green-800`}><PackageCheck className="inline h-4 w-4 mr-1" />Delivered</span>;
      case "Cancelled":
        return <span className={`${base} bg-red-100 text-red-800`}><Ban className="inline h-4 w-4 mr-1" />Cancelled</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-16 mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">You have no orders yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((o) => (
            <div
              key={o.order_id}
              className="bg-white shadow-sm rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="mb-4">
                <p className="text-gray-800 font-medium">
                  <strong>Order ID:</strong> #{o.order_id}
                </p>
                <p className="text-sm text-gray-500">
                 {(() => {
  const d = new Date(o.order_date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'long' }); // "July"
  const year = d.getFullYear();
  const time = d.toLocaleTimeString('en-US'); // "11:26:43 PM"
  return `${day}/${month}/${year}, ${time}`;
})()}


                </p>
              </div>

              <div className="mb-4 space-y-2 border-t pt-4">
                {o.items.map((item) => {
                  return(
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{item["name"] || "Unknown Product"}</span>
                      <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                    </div>)
                  
                })}
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-gray-800">
                  ₹{o.total_amount}
                </span>
                {renderStatusBadge(o.delivery_status)}
              </div>

              {o.delivery_status === "Pending" && (
                <button
                  onClick={() => refund(o.payment_id, o.order_id, o.total_amount)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-medium"
                >
                  Cancel & Refund
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
