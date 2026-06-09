import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsRes = await axios.get(
        "https://ecommerce-backend-nu1x.onrender.com/api/products"
      );

      const ordersRes = await axios.get(
        "https://ecommerce-backend-nu1x.onrender.com/api/admin/orders"
      );
      console.log("ORDERS=",ordersRes.data);
      const usersRes = await axios.get(
        "https://ecommerce-backend-nu1x.onrender.com/api/admin/users"
      );

      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);


      console.log("Products:",productsRes.data);
      console.log("Orders:",ordersRes.data);
      console.log("Users:",usersRes.data);
    } catch (err) {
      console.log("ADMIN ERROR:",err.response?.data);
      console.log("ADMIN ERROR FULL:",err);
      alert("Dashboard API Failed");
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status !== "Delivered"
  ).length;

  return (
    <div>
      <Navbar />

      <div
        style={{
          maxWidth: "1300px",
          margin: "auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Admin Dashboard
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#2563eb",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1>{products.length}</h1>
            <p>Total Products</p>
          </div>

          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#059669",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1>{orders.length}</h1>
            <p>Total Orders</p>
          </div>

          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#dc2626",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1>₹{totalRevenue}</h1>
            <p>Total Revenue</p>
          </div>

          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#f59e0b",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1>{pendingOrders}</h1>
            <p>Pending Orders</p>
          </div>

          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#7c3aed",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1>{users.length}</h1>
            <p>Total Users</p>
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Recent Orders
        </h2>

        <table
          border="1"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Total</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td style={{ padding: "10px" }}>{order.email}</td>
                <td style={{ padding: "10px" }}>₹{order.total}</td>
                <td style={{ padding: "10px" }}>
                  {order.status || "Pending"}
                </td>
                <td style={{ padding: "10px" }}>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Recent Users
        </h2>

        <table
          border="1"
          style={{
            width: "600px",
            margin: "20px auto",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.slice(0, 5).map((user) => (
              <tr key={user._id}>
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <button
            onClick={() =>
              (window.location.href = "/admin-orders")
            }
            style={{
              padding: "15px 30px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Manage Orders
          </button>

          <button
            onClick={() =>
              (window.location.href = "/products")
            }
            style={{
              padding: "15px 30px",
              backgroundColor: "#059669",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Manage Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;