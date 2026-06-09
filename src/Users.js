import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Users() {
const [users, setUsers] = useState([]);

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/admin/users"
);

  setUsers(res.data);
} catch (err) {
  console.log(err);
}

};

const deleteUser = async (email) => {
try {
await axios.delete(
`http://localhost:5000/api/admin/users/${email}`
);

  fetchUsers();
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
      marginTop: "20px",
    }}
  >
    Users Management
  </h1>

  <h2
    style={{
      textAlign: "center",
    }}
  >
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
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
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

export default Users;