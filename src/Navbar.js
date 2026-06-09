import { Link, useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();

const logout = () => {
localStorage.removeItem("token");
navigate("/");
};

return (
<div
style={{
display: "flex",
justifyContent: "center",
gap: "20px",
padding: "15px",
borderBottom: "1px solid #ddd",
marginBottom: "20px",
}}
>
<Link to="/products">Products</Link>

  {" | "}

  <Link to="/cart">Cart</Link>

  {" | "}

  <Link to="/orders">Orders</Link>

  {" | "}

  <Link to="/admin">Admin</Link>

  {" | "}

  <Link to="/admin-orders">
    Admin Orders
  </Link>

  {" | "}

  <Link to="/add-product">
    Add Product
  </Link>

  {" | "}

  <Link to="/admin-users">
    Users
  </Link>

  {" | "}

  <button onClick={logout}>
    Logout
  </button>
</div>

);
}

export default Navbar;