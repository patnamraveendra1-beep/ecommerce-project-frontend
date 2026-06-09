import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-backend-nu1x.onrender.com/api/admin/users"
      );

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (email) => {
    try {
      await axios.delete(
        `https://ecommerce-backend-nu1x.onrender.com/api/admin/users/${email}`
      );

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (err) {
      console.log("DELETE RESPONSE =",err.response?.data);
      console.log("DELETE STATUS =",err.response?.status);

      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Admin Users
      </h1>

      <h2 style={{ textAlign: "center" }}>
        Total Users: {users.length}
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
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <button
                  onClick={() =>
                    deleteUser(user.email)
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
    </div>
  );
}

export default AdminUsers;