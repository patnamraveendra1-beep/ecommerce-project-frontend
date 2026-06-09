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

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    try {
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
      alert("Order Failed");
    }
  };

  return (
    <div>
      <Navbar />

      <h1 style={{ textAlign: "center" }}>
        Checkout
      </h1>

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
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="text"
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
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          type="text"
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