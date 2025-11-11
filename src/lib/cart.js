
import { getUser } from "./auth";
import { useEffect, useState } from "react";
// Cart functionality using localStorage
export const getCart = () => {
  try {
    const cart = localStorage.getItem('embedtechnolozix_cart');
    const parsedCart = cart ? JSON.parse(cart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (e) {
    console.error("❌ Failed to parse cart from localStorage:", e);
    return [];
  }
};

// Save to LocalStorage & Send to Server
export const addToCart = async (product, quantity = 1) => {
  const cart = getCart();

  // console.log("Trying to add item:", product);

  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  localStorage.setItem('embedtechnolozix_cart', JSON.stringify(cart));

  // 🔄 Call server update
 await cartUpdateServer(cart);

  return cart;
};






// src/lib/api.js

const BASE_URL = "https://embedtechnolozix.com/api";

/**
 * Get product details by ID
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/get_product_by_id.php?id=${id}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
};

/**
 * Get multiple product details by array of IDs
 * @param {Array<number|string>} ids
 * @returns {Promise<Array<Object>>}
 */
export const getProductsByIds = async (ids) => {
  const requests = ids.map((id) => getProductById(id));
  return Promise.all(requests);
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/get_products.php`)
      .then(res => res.json())
      .then(data => {
      setProducts(data);
      })
      .catch(err => console.error("Error loading products:", err));





  }, []);
// console.log(products);
  return products;
};




















export const cartUpdateServer = async (cart) => {
  const user = getUser();
// console.log("trying to update data");
  if (!user || !user.email) {
    console.error("❌ No user logged in or email missing. Skipping cart sync.");
    return { success: false, message: "User not logged in" };
  }

  const Cartdata = {
    email: user.email,
    cart
  };

  try {
    const res = await fetch(`${BASE_URL}/cartItem.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Cartdata),
    });

    const data = await res.json();

    // console.log(data);
    return { success: data.success, message: data.message };

  } catch (error) {
    console.error("❌ Cart update failed:", error);
    return { success: false, message: error.message };
  }
};













export const updateCartItem = async (productId, quantity) => {
  const cart = getCart();
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity } : item
  );
   await cartUpdateServer(updatedCart);
  localStorage.setItem('embedtechnolozix_cart', JSON.stringify(updatedCart));
  return updatedCart;
};


















export const removeFromCart = async(productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
   await cartUpdateServer(updatedCart);
  localStorage.setItem('embedtechnolozix_cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const clearCart = async() => {
  await cartUpdateServer([]);
  localStorage.removeItem('embedtechnolozix_cart');
  return [];
};

export const getCartSubTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};


export const getShipping = () => {
 const subtotal = getCartSubTotal();
 return subtotal > 50 ? 0 : 0;
};

export const getTax = () => {
 const subtotal = getCartSubTotal();
 return subtotal * 0.07;
};  


export const getCartTotal = () => {

  return (getCartSubTotal()+getShipping()+getTax());
};




