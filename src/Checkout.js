import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Checkout() {
const navigate = useNavigate();
const location = useLocation();

const totalPrice = location.state?.totalPrice || 0;

const [form, setForm] = useState({
name: "",
phone: "",
address: "",
city: "",
pincode: "",
paymentMethod: "COD",
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const loadRazorpay = () => {
return new Promise((resolve) => {
if (window.Razorpay) {
resolve(true);
return;
}


  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";

  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);

  document.body.appendChild(script);
});


};

const placeOrder = async () => {
const token = localStorage.getItem("token");


const loaded = await loadRazorpay();

if (!loaded) {
  alert("Razorpay SDK not loaded");
  return;
}

try {
  const orderRes = await axios.post(
    "https://ecommerce-backend-nu1x.onrender.com/api/payment/create-order",
    {
      amount: totalPrice // ₹100 test amount
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const order = orderRes.data;
  
  console.log(
    "ORDER RESPONSE FULL:",
    JSON.stringify(order, null, 2)
  );

  const options = {
    key: "rzp_test_T1C2X5Nvf5sZaB",
    amount: order.amount,
    currency: order.currency,
    name: "Patnam Ecommerce",
    description: "Test Payment",
    order_id: order.id,

    prefill: {
      name: form.name,
      contact: form.phone,
    },

    handler: async function (response) {
      try {
        console.log(
          "PAYMENT SUCCESS:",response);
        const orderData = {
          ...form,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
        };
        console.log("ORDER DATA:", orderData);
        const res = await axios.post(
          "https://ecommerce-backend-nu1x.onrender.com/api/orders",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(res.data.message);
        navigate("/orders");
      } catch (err) {
        console.log("ORDER SAVE ERROR:", err);
        console.log("ORDER SAVE ERROR DATA:", err.response?.data);
        alert("Order save failed");
      }
    },

    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", function (response) {
    console.log(
      "PAYMENT FAILED FULL:",
      JSON.stringify(response, null, 2)
    );

    alert(
      response?.error?.description ||
      response?.error?.reason ||
      "Payment Failed"
    );
  });

  rzp.open();
} catch (err) {
  console.log("BACKEND ERROR:", err);
  alert("Payment Failed (backend error)");
}


};

return ( <div> <Navbar />


  <h1 style={{ textAlign: "center" }}>Checkout</h1>

  <div
    style={{
      width: "400px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <input
      name="name"
      placeholder="Full Name"
      onChange={handleChange}
    />

    <input
      name="phone"
      placeholder="Phone Number"
      onChange={handleChange}
    />

    <textarea
      name="address"
      placeholder="Address"
      onChange={handleChange}
    />

    <input
      name="city"
      placeholder="City"
      onChange={handleChange}
    />

    <input
      name="pincode"
      placeholder="Pincode"
      onChange={handleChange}
    />

    <select
      name="paymentMethod"
      onChange={handleChange}
    >
      <option value="COD">
        Cash On Delivery
      </option>

      <option value="UPI">
        UPI
      </option>

      <option value="CARD">
        Card
      </option>
    </select>

    <button
      onClick={placeOrder}
      style={{
        background: "green",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Confirm Order
    </button>
  </div>
</div>


);
}

export default Checkout;
