import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Cart() {
const [cart, setCart] = useState([]);
const navigate = useNavigate();

useEffect(() => {
fetchCart();
}, []);

const fetchCart = async () => {
const token = localStorage.getItem("token");

try {
  const res = await axios.get(
    "https://ecommerce-backend-nu1x.onrender.com/api/cart",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setCart(res.data);
} catch (err) {
  console.log(err);
}

};

const removeItem = async (id) => {
const token = localStorage.getItem("token");

try {
  await axios.delete(
    `https://ecommerce-backend-nu1x.onrender.com/api/cart/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchCart();
} catch (err) {
  console.log(err);
}

};

const updateQuantity = async (id, quantity) => {
const token = localStorage.getItem("token");

try {
  await axios.put(
    `https://ecommerce-backend-nu1x.onrender.com/api/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchCart();
} catch (err) {
  console.log(err);
}

};



const totalPrice = cart.reduce(
(total, item) =>
total +
Number(item.price) * (item.quantity || 1),
0
);

return (
<div>
<Navbar />

  <h1 style={{ textAlign: "center" }}>
    My Cart
  </h1>

  {cart.length === 0 ? (
    <h3 style={{ textAlign: "center" }}>
      Cart Empty
    </h3>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {cart.map((item) => (
          <div
            key={item._id}
            style={{
              width: "250px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />

            <h3>{item.name}</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <button
                onClick={() => {
                  const qty =
                    (item.quantity || 1) - 1;

                  if (qty < 1) return;

                  updateQuantity(
                    item._id,
                    qty
                  );
                }}
              >
                -
              </button>

              <span>
                {item.quantity || 1}
              </span>

              <button
                onClick={() =>
                  updateQuantity(
                    item._id,
                    (item.quantity || 1) + 1
                  )
                }
              >
                +
              </button>
            </div>

            <h4 style={{ color: "green" }}>
              ₹ {item.price}
            </h4>

            <button
              onClick={() =>
                removeItem(item._id)
              }
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h2>
          Total Price : ₹ {totalPrice}
        </h2>

        <button
          onClick={() => 
            navigate("/checkout", {
              state: {
                totalPrice,
              },
            })
          }
            
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Checkout
        </button>

        <button
          onClick={() =>
            navigate("/orders")
          }
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          View Orders
        </button>
      </div>
    </>
  )}
</div>

);
}

export default Cart;