import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Orders() {
const [orders, setOrders] = useState([]);

useEffect(() => {
fetchOrders();
}, []);

const fetchOrders = async () => {
const token = localStorage.getItem("token");

try {
  const res = await axios.get(
     "https://ecommerce-backend-nu1x.onrender.com/api/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setOrders(res.data);
} catch (err) {
  console.log(err);
}

};

return (
<div>
<Navbar />

  <h1
    style={{
      textAlign: "center",
    }}
  >
    My Orders
  </h1>

  {orders.length === 0 ? (
    <h3
      style={{
        textAlign: "center",
      }}
    >
      No Orders Found
    </h3>
  ) : (
    orders.map((order) => (
      <div
        key={order._id}
        style={{
          border: "1px solid #ddd",
          margin: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          Total: ₹ {order.total}
        </h2>

        <p>
          Items: {order.items.length}
        </p>

        <p>
          Date:
          {" "}
          {new Date(
            order.createdAt
          ).toLocaleString()}
        </p>

        <p>
          Status:
          {" "}
          <strong>
            {order.status || "Pending"}
          </strong>
        </p>

        <hr />

        {order.items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "10px",
                marginRight: "15px",
              }}
            />

            <div>
              <h4>{item.name}</h4>

              <p>
                Quantity : {item.quantity || 1}
              </p>
              
              <p>
                ₹ {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    ))
  )}
</div>

);
}

export default Orders;