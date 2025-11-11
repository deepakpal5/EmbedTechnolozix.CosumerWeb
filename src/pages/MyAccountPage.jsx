import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, setUserLocal } from "../lib/auth";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../components/ui/button";

function MyAccountPage() {
  const [user, setUser] = useState(null);
  const [selectedDefault, setSelectedDefault] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fulladdress: "",
    distt: "",
    state: "",
    zipcode: "",
    is_default: false,
  });

  const [stateDistrictData, setStateDistrictData] = useState({});
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
    const [imageFile, setImageFile] = useState(null);
  const [photoProgress, setPhotoProgress] = useState(false);
    const [editing, setEditing] = useState(false);
const [editingShipping, setEditingShipping] = useState(false);
 const [form, setForm] = useState({
    name: '',
    mobile: '',
    fulladdress: '',
    distt: '',
    state: '',
    zipcode: '',
  });

  useEffect(() => {
    fetch("https://embedtechnolozix.com/data/state_districts.json")
      .then((res) => res.json())
      .then((data) => setStateDistrictData(data))
      .catch((err) => console.error("Failed to load JSON:", err));

    const userData = getUser();
    if (userData) {
      setUser(userData);
      const defaultIndex = userData.address.findIndex((addr, i) => i > 0 && addr.is_default);
      setSelectedDefault(defaultIndex >= 0 ? defaultIndex : null);
    } else {
      window.location.href = "/login";
    }
  }, []);
const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
const formData = new FormData();
  formData.append("image", file);
  formData.append("email", user.email);
    setPhotoProgress(true);
 


    try {


const response = await fetch("https://embedtechnolozix.com/api/upload_user_image.php", {
      method: "POST",
      body: formData,
    });




    const data = await response.json();

if (data.user) {
  setUser(data.user);
  localStorage.setItem('embedtechnolozix_user', JSON.stringify(data.user));
} else {
  alert('Upload succeeded but no user data returned');
  console.log('Upload response:', data);
}





    } catch (err) {
      alert('Upload failed');
    } finally {
      setPhotoProgress(false);
    }
  };
  const handleStateChange = (e) => {
    const state = e.target.value;
    setNewAddress((prev) => ({
      ...prev,
      state,
      distt: ""
    }));
    setDistricts(stateDistrictData[state] || []);
  };

  const handleChange = async (index) => {
    const selectedAddress = user.address[index];

    const response = await fetch("https://embedtechnolozix.com/api/set_default_address.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        index: index, // or ID if using IDs
      }),
    });

console.log("response received is ",response);
    const data = await response.json();
    console.log("data received is ",data);
  console.log("data.user is ",data.user);







    if (data.success) {
      toast({ title: "Default address updated" });
      setUser(data.user);
      setUserLocal(data.user); // update local storage
      setSelectedDefault(index);
    } else {
      toast({ title: "Update failed", description: data.message || "Try again later" });
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleAddAddress = async () => {
    const response = await fetch("https://embedtechnolozix.com/api/add_address.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        address: newAddress
      })
    });

   



    // console.log("response received is ",response);
    const data = await response.json();
  //   console.log("data received is ",data);
  // console.log("data.user is ",data.user);



    if (data.success) {
      toast({ title: "Address added" });
      setUser(data.user);
      setUserLocal(data.user);
      setNewAddress({
        fulladdress: "",
        distt: "",
        state: "",
        zipcode: "",
        is_default: false,
      });

      const defaultIndex = data.user.address.findIndex((addr, i) => i > 0 && addr.is_default);
      setSelectedDefault(defaultIndex >= 0 ? defaultIndex : null);
    } else {
      toast({ title: "Failed", description: data.message || "Something went wrong" });
    }
  };


const saveProfile = async () => {







const updatedAddress = {
  fulladdress: form.fulladdress.trim(),
  distt: form.distt.trim(),
  state: form.state.trim(),
  zipcode: form.zipcode.trim(),
  is_default: false,
};

const updatedAddresses = [...user.address]; // clone the existing address array

if (updatedAddresses.length > 0) {
  updatedAddresses[0] = updatedAddress; // update the first address
} else {
  updatedAddresses.push(updatedAddress); // or push new if empty
}

const updatedUser = {
  email: user.email,
  name: form.name.trim(),
  mobile: form.mobile.trim(),
  photourl: user.photourl,
  cart_data: user.cart_data,
  address: updatedAddresses,
};






console.log(updatedUser);






  try {
    const response = await fetch("https://embedtechnolozix.com/api/update_user_profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok && result.success) {
      localStorage.setItem("embedtechnolozix_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profile updated successfully");
      return true;
    } else {
      alert("Failed to update profile: " + (result.message || "Unknown error"));
      return false;
    }
  } catch (err) {
    console.error("Error updating profile:", err);
  alert("Error: " + err.message);
    return false;
  }
};













  if (!user)
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow"
        >
          <h1 className="text-2xl font-bold mb-2 text-center">Loading...</h1>
        </motion.div>
      </div>
    );

  return (
    <div className="bg-gray-100 p-4 mt-10">
      <div className="max-w-3xl mx-auto p-10 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>


        <div className="flex flex-col items-center mb-4">
        {photoProgress ? (
           <div className="flex items-center justify-center w-28 h-28">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
        ) : (
          <div className="relative w-28 h-28">
  <img
    src={user?.photourl || '/assets/images/ET.png'}
    alt="Profile"
    className="rounded-full w-full h-full object-cover border-4 border-blue-300 shadow-lg"
  />

  {/* Overlay and icon on hover */}
  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-500 hover:text-white transition">
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    />
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12.2c-2.87 0-5.2-2.33-5.2-5.2S9.13 6.8 12 6.8s5.2 2.33 5.2 5.2-2.33 5.2-5.2 5.2zM21 4h-4.18C16.4 2.84 15.3 2 14 2h-4c-1.3 0-2.4.84-2.82 2H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-9 13c-2.21 0-4-1.79-4-4s1.79-4 4-4a4 4 0 1 1 0 8z"/>
    </svg>
  </label>
</div>

        )}
      </div>




        {
          editing ? (
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
          <input className="input w-full border p-2 rounded" name="name" value={form.name} onChange={handleInput} placeholder="Full Name" />
          <input className="input w-full border p-2 rounded" name="mobile" value={form.mobile} onChange={handleInput} placeholder="Mobile" />
          <input className="input w-full border p-2 rounded" name="fulladdress" value={form.fulladdress} onChange={handleInput} placeholder="Address" />
          <input className="input w-full border p-2 rounded" name="zipcode" value={form.zipcode} onChange={handleInput} placeholder="ZIP Code" />
          <select name="state" value={form.state} onChange={handleInput} className="input w-full border p-2 rounded">
            <option value="">Select State</option>
            {Object.keys(stateDistrictData).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <select name="distt" value={form.distt} onChange={handleInput} className="input w-full border p-2 rounded">
            <option value="">Select District</option>
            {(stateDistrictData[form.state] || []).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
            onClick={async () => {
    await saveProfile();
    setEditing(false);
  }}
          >
            Submit
          </button>
        </div>
      ) 
        :  
         ( <div className="space-y-1">
          <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Mobile:</b> {user.mobile}</p>

        <div className="mt-4">
          <h3 className="font-semibold">Permanent Address:</h3>
          <p>{user.address[0]?.fulladdress}, {user.address[0]?.distt || user.address[0]?.city}, {user.address[0]?.state} - {user.address[0]?.zipcode}</p>
        </div> </div>)}

   <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition duration-200"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel' : 'Edit'}
        </button>
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
                  {selectedDefault === index + 1 && (
                    <span className="text-sm text-green-600">Default</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 border-t pt-4">
         
        <h3
  onClick={() => setEditingShipping(!editingShipping)}
  className="text-sm text-green-700 hover:text-green-900 cursor-pointer font-semibold mb-2"
>
  + Click here to Add New Shipping Address
</h3>

          {
          
          editingShipping?
          
          (<div className="grid grid-cols-2 gap-4">
            <input type="text" name="fulladdress" placeholder="Full Address" value={newAddress.fulladdress} onChange={handleNewAddressChange} className="border p-2 rounded" />

            <select
              value={newAddress.state}
              onChange={handleStateChange}
              className="border p-2 rounded"
            >
              <option value="">Select State</option>
              {Object.keys(stateDistrictData).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <select
              value={newAddress.distt}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  distt: e.target.value
                }))
              }
              className="border p-2 rounded"
            >
              <option value="">Select District</option>
              {districts.map((distt) => (
                <option key={distt} value={distt}>{distt}</option>
              ))}
            </select>

            <input type="text" name="zipcode" placeholder="ZIP Code" value={newAddress.zipcode} onChange={handleNewAddressChange} className="border p-2 rounded" />

            <label className="col-span-2 flex items-center gap-2">
              <input type="checkbox" name="is_default" checked={newAddress.is_default} onChange={handleNewAddressChange} />
              Set as Default
            </label>

            <Button className="col-span-2" onClick={handleAddAddress}>Add Address</Button>
          </div>
):(

  null
)}

          
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
