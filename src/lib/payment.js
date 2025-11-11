import {getCartTotal } from "@/lib/cart";
export const initiatePayment = async()=> {


const res = await axios.post("https://embedtechnolozix.com/api/payment_order.php", {
      amount: Math.round(getCartTotal() * 100)});


return res.data;
}



