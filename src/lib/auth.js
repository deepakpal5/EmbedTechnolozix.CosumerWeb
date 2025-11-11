import { getCart,cartUpdateServer } from "@/lib/cart";
// Simple authentication using localStorage
export const getUser = () => {
  const user = localStorage.getItem('embedtechnolozix_user');
  // console.log("user : "+user);
  return user ? JSON.parse(user) : null;
};






export const login = async (email, password) => {
  if (!email || !email.includes('@') || !password || password.length < 6) {
    return { success: false, message: 'Invalid email or password' };
  }
  const user = {
    email,
    password,
  };
  const res = await fetch('https://embedtechnolozix.com/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    // console.log("res received is ",res);
    const data = await res.json();
  //   console.log("data received is ",data);
  console.log("Logged User is ",data.user);


   
  if(data.success){
 const localCart = getCart() || [];
//  console.log("localCart is ",localCart);
    const serverCart = data.user.cart_data || [];
// console.log("serverCart is ",serverCart);
    const mergedCart = mergeCartItems(localCart, serverCart);
// console.log("mergedCart is ",mergedCart);


localStorage.setItem('embedtechnolozix_cart', JSON.stringify(mergedCart));
localStorage.setItem('embedtechnolozix_user', JSON.stringify(data.user));


if (localCart) {
cartUpdateServer(mergedCart);
}
return { success: true, user : data.user };
  }
  
  return { success: false, message : data.message };
};




export const setUserLocal = async (user)=> {
localStorage.setItem('embedtechnolozix_user', JSON.stringify(user));
  
}

function mergeCartItems(localCart, serverCart) {
  const merged = {};

  // Add local cart items
  localCart.forEach(item => {
    const pid =  item.id;
    merged[pid] = { ...item };
  });

  // Add/merge server cart items
  serverCart.forEach(item => {
    const pid =item.id;
    if (merged[pid]) {
      merged[pid].quantity += item.quantity;
    } else {
      merged[pid] = { ...item };
    }
  });

  return Object.values(merged);
}

export const register = async (name, email, password,fulladdress,state,distt,zipcode,mobile) => {
 if (!name || !email || !email.includes('@') || !password || password.length < 6) {
    return { success: false, message: 'Invalid registration details' };
  }

  const user = {email,name,password,address: [
    {
      "fulladdress": fulladdress,
      "distt": distt,
      "state": state,
      "zipcode": zipcode,
      "is_default": true
    }
    
  ],
  mobile};
  

// console.log("user data is ",user);


  const res = await fetch('https://embedtechnolozix.com/api/signup.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

// console.log("res data is ",res);

    
    const data =await res.json();
   
// console.log(" data is ",data);

// return { success: true, message :"data.message" };

  return { success: data.success, message :data.message };
};

export const logout = () => {
  
  localStorage.removeItem('embedtechnolozix_cart');
  localStorage.removeItem('embedtechnolozix_user');
  return { success: true };
};

export const isAuthenticated = () => {
  const user = getUser();
  // console.log(user);
  return user ;
};
