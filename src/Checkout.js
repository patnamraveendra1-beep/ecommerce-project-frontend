import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Checkout() {
  const navigate = useNavigate();

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

  // ✅ Razorpay SDK loader (IMPORTANT FIX)
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

    // ✅ ensure SDK loaded
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay SDK not loaded. Try again.");
      return;
    }

    try {
      // STEP 1: Create order
      const orderRes = await axios.post(
        "https://ecommerce-backend-nu1x.onrender.com/api/payment/create-order",
        { amount: 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = orderRes.data;

      console.log("ORDER RESPONSE:", order);

      // STEP 2: Razorpay options
      const options = {
        key: "rzp_test_T1C2X5Nvf5sZaB",
        amount: order.amount,
        currency: "INR",
        name: "Patnam Ecommerce",
        description: "Test Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            console.log("PAYMENT SUCCESS:", response);

            const res = await axios.post(
              "https://ecommerce-backend-nu1x.onrender.com/api/orders",
              form,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert(res.data.message);
            navigate("/orders");
          } catch (err) {
            console.log(err);
            alert("Order save failed");
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      // STEP 3: Open Razorpay
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("PAYMENT FAILED:", response);
        alert("Payment Failed");
      });

      rzp.open();
    } catch (err) {
      console.log(err);
      alert("Payment Failed (backend error)");
    }
  };

  return (
    <div>
      <Navbar />

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
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />
        <textarea name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />

        <select name="paymentMethod" onChange={handleChange}>
          <option value="COD">Cash On Delivery</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
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