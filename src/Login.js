import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
try {
const res = await axios.post(
"https://ecommerce-backend-nu1x.onrender.com/api/auth/login",
{
email,
password,
}
);

  localStorage.setItem(
    "token",
    res.data.token
  );

  alert("Login Success");

  navigate("/products");
} catch (err) {
  console.log(err);

  alert(
    JSON.stringify(err.response?.data) ||
    err.message ||
    "Login Failed"
  );
}

};

return (
<div>
<h1>Login Page</h1>

  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

  <br />
  <br />

  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <br />
  <br />

  <button onClick={handleLogin}>
    Login
  </button>
</div>

);
}

export default Login;