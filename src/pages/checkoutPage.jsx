

import { Button } from "@/components/ui/button";
import React,  { useEffect, useState } from "react";
import { getUser, setUserLocal } from "../lib/auth";
import { getCart, getCartTotal } from "@/lib/cart";
import { clearCart } from "../lib/cart";
import axios from 'axios';
import ShippingPolicy from "../components/ShippingPolicy";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";



function CheckoutPage(){
  const [selectedDefault, setSelectedDefault] = useState(null);
  const [user, setUser] = useState(null);
  const [cartItems, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();







  useEffect(() => {


  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);








    // const userData = getUser();
    // if (userData) {
    //   setUser(userData);
    // } 
    




     const userData = getUser();
    if (userData) {
      setUser(userData);
      const defaultIndex = userData.address.findIndex((addr) => addr.is_default === true);
      
      if (defaultIndex > -1) {
        setSelectedDefault(defaultIndex);
      }
    }
    setCart(getCart());









  }, []);

const handlePayment = async (e) => {

  e.preventDefault();
  // console.log("🛒 Starting Razorpay payment...");




  if (!user || cartItems.length === 0) {
  // alert("User or Cart details missing. Please check and try again.");
   toast({
        title: "Something missing!",
        description: "User or Cart details missing. Please check and try again.",
        variant: "destructive",
      });
  return;
}
setIsProcessing(true);
  try {
     const res = await axios.post("https://embedtechnolozix.com/api/payment_order.php", {
      amount: Math.round(getCartTotal() * 100)});


const order=res.data;
    console.log("📦 Order Created:", order);

    

    const options = {
      key: "rzp_live_5eUkrSYnDfKnGk", //YcZNTcM7hVuHvCvVJEAYF
      amount:  Math.round(getCartTotal() * 100),

      currency: "INR",
      name: "EmbedTechnolozix",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        // alert("✅ Payment Successful!");
      toast({
              title: "✅ Payment Successful!",
              description: `Your payment of amount ₹${getCartTotal().toFixed(2)} was successful.`,
                        });
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        console.log("✅ Payment Successful!");
        console.log("💳 Payment ID:", paymentId);
        console.log("🧾 Order ID:", orderId);
        console.log("🔏 Signature:", signature);
await handleCheckout(paymentId);




//  window.location.href = "/thank-you";
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact:user.Mobile,
      },
      theme: {
        color: "#528FF0"
      }
    };

    const razor = new window.Razorpay(options);
   
    razor.open();

  }
   catch (error) {
    console.error("❌ Razorpay order error:", error);

    alert("Failed to start payment. Try again.");
    toast({
  title: "❌ Payment Failed!",
  description: "Failed to start payment. Try again.",
});
  }
  finally {
    setIsProcessing(false);
  }
};

  const handleCheckout = async(paymentID) => {
    // e.preventDefault();




// console.log(" paymentID is ",paymentID);

// const simplifiedCart = cartItems.map(item => ({
//   product_id: item.id,
//   quantity: item.quantity
// }));

// console.log("cart data is ", simplifiedCart);
const defaultAddress = user?.address?.find(addr => addr.is_default) || {};
const order = {

    user_email: user?.email || "guest@domain.com",
    items: cartItems,
    shipping_address:defaultAddress || "No address found",
    total_amount: parseFloat(getCartTotal()).toFixed(2),
    orderDate: new Date().toISOString(),
    payment_id: paymentID
  };
  // console.log(order);
  // console.log("order data is ", order);
    // Optional: send to your backend PHP/Node
    try {
      const response = await fetch("https://embedtechnolozix.com/api/place_order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  const data = await response.json();

// console.log("Server response:", data);

if (data.success) {
  const updatedCart = await clearCart();
      setCart(updatedCart);
navigate("/thank-you", { state: { order } });
   window.location.reload();


  
    // alert('Order placed! Order ID: ' + data.order_id);


  } else {
    // alert('Failed to place order: ' + data.message);
     toast({
        title: "Failed",
        description: 'Failed to place order: ' + data.message,
        variant: "destructive",
      });
  }

      
    } 
    catch (err) {
      console.error("Checkout error:", err);
      // alert("Server error.");
    }
  };



  const handleChange = async (index) => {
    const response = await fetch("https://embedtechnolozix.com/api/set_default_address.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        index: index,
      }),
    });

    const data = await response.json();
    if (data.success) {
      toast({ title: "Default address updated" });
      setUser(data.user);
      setUserLocal(data.user);
      setSelectedDefault(index);
    } else {
      toast({ title: "Update failed", description: data.message || "Try again later" });
    }
  };

if (!user || cartItems.length === 0) {
  return (
  <section className="relative pt-10 overflow-hidden">
    <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
     <div className="top-0 right-0  overflow-hidden z-0">
        <div className="top-0 right-0   bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="bottom-0 left-0  bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="p-10 text-center">Loading checkout details...</div>
  </section>
  
  
  
  );
}

  return (

    <section className="relative pt-10 overflow-hidden">
        <div className="inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
           <div className="top-0 right-0  overflow-hidden z-0">
        <div className="top-0 right-0   bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="bottom-0 left-0  bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="py-10 max-w-5xl mx-auto text-gray-800">

             <div>
          <h1 className="text-xl font-bold mb-4">Shipping Details</h1>
          {user && (
  <>
    <h1 className="text-x5  mb-3"> Name : {user.name}</h1>
    <h1 className="text-x5  mb-3"> Email : {user.email}</h1>
    <h1 className="text-x5  mb-3"> Mobile : {user.mobile}</h1>
    <div className="mt-4">
    <h3 className="font-semibold">Permanent Address:</h3>
    <p>{user.address[0]?.fulladdress}, {user.address[0]?.distt || user.address[0]?.city}, {user.address[0]?.state} - {user.address[0]?.zipcode}</p>
    </div>

      {user.address.length > 1 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Shipping Addresses:</h3>
            {user.address.slice(1).map((addr, index) => (
              <div key={index + 1} className="mb-2 border p-3 rounded bg-gray-50 shadow flex items-start gap-4">
                <input
                  type="radio"
                  name="defaultShipping"
                  checked={selectedDefault === index + 1}
                  onChange={() => handleChange(index + 1)}
                  className="mt-1"
                />
                <div>
                  <p>{addr.fulladdress}, {addr.city || addr.distt}, {addr.state} - {addr.zipcode}</p>
                  {selectedDefault === index + 1 && <span className="text-sm text-green-600">Default</span>}
                </div>
              </div>
            ))}
          </div>
        )}




  </>
)}
 </div>

           <div className="flex justify-between font-semibold border-t pt-2">
             <span>Total Amount:</span>
           <span>₹{getCartTotal().toFixed(2)}</span>
           </div>

     

<div>

  <ShippingPolicy/>
  <br/>
 <p >
    
      🔒 Read our <a href="/refund-policy" className="underline text-blue-600">Cancellations and Refunds Policy</a>.
    </p>

<div>
  <br/>
<p >
    
      🔒Read our <a href="/privacy-policy" className="underline text-blue-600">full Privacy Policy</a>.
    </p>

</div>
<div>
     <br/>
  
<p >
     
      🔒Read our <a href="/term-Condition" className="underline text-blue-600">Terms & Conditions</a>.
    </p>

</div>

<br/>





<Button
                onClick={handlePayment}

                // onClick={() => handleCheckout("pay_QhwESkXOj780IR")}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={isProcessing}
              >
               {isProcessing ? "Processing..." : "Place Order"}
              </Button>

</div>
             
      </div>
    </section>














  );
};

export default CheckoutPage;
