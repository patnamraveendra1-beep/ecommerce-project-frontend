import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
const [orders, setOrders] = useState([]);
const [selectedOrder, setSelectedOrder] =
useState(null);

useEffect(() => {
fetchOrders();
}, []);

const fetchOrders = async () => {
try {
const res = await axios.get(
"https://ecommerce-backend-nu1x.onrender.com/api/admin/orders"
);

  setOrders(res.data);
} catch (err) {
  console.log(err);
}

};

const updateStatus = async (id, status) => {
try {
await axios.put(
`https://ecommerce-backend-nu1x.onrender.com/api/admin/orders/${id}`,
{
status: "Delivered",
}
);

  fetchOrders();
} catch (err) {
  console.log(err);
}

};

const deleteOrder = async (id,) => {
try {
await axios.delete(
`https://ecommerce-backend-nu1x.onrender.com/api/admin/orders/${id}`
);

  alert("Order Deleted Successfully");

  fetchOrders();
} catch (err) {
  console.log(err);
  alert("Delete Failed");
}

};

return (
<div style={{ padding: "20px" }}>
<h1 style={{ textAlign: "center" }}>
Admin Orders
</h1>

  <h2 style={{ textAlign: "center" }}>
    Total Orders: {orders.length}
  </h2>

  <table
    border="1"
    style={{
      width: "90%",
      margin: "20px auto",
      borderCollapse: "collapse",
      textAlign: "center",
    }}
  >
    <thead>
      <tr>
        <th>Email</th>
        <th>Total</th>
        <th>Status</th>
        <th>Date</th>
        <th>Action</th>
        <th>Details</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => (
        <tr key={order._id}>
          <td>{order.email}</td>

          <td>₹{order.total}</td>

          <td>
            {order.status || "Pending"}
          </td>

          <td>
            {order.createdAt
              ? new Date(
                  order.createdAt
                ).toLocaleString()
              : "-"}
          </td>

          <td>
            <select
              value={order.status || "Pending"}
              onChange={(e) =>
                updateStatus(
                  order._id,
                  e.target.value
                )
              }

            >
              <option value="Pending">
                Pending
              </option>
              
              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </td>

          <td>
            <button
              onClick={() =>
                setSelectedOrder(order)
              }
            >
              View
            </button>
          </td>

          <td>
            <button
              onClick={() =>
                deleteOrder(order._id)
              }
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {selectedOrder && (
    <div
      style={{
        width: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h2>Order Details</h2>

      <p>
        <strong>Email:</strong>{" "}
        {selectedOrder.email}
      </p>

      <p>
        <strong>Total:</strong> ₹
        {selectedOrder.total}
      </p>

      <h3>Products</h3>

      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>

        <tbody>
          {selectedOrder.items?.map(
            (item, index) => (
              <tr key={index}>
                <td>{item.name}</td>

                <td>
                  ₹{item.price}
                </td>

                <td>
                  {item.quantity ||
                    item.qty ||
                    1}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <br />

      <button
        onClick={() =>
          setSelectedOrder(null)
        }
      >
        Close
      </button>
    </div>
  )}
</div>

);
}

export default AdminOrders;