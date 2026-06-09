import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Product from "./Product";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Orders from "./Orders";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Admin from "./Admin";
import AdminOrders from "./AdminOrders";
import Users from "./Users";
import AdminUsers from "./AdminUsers";
import Checkout from "./Checkout";
function App() {
return (
<BrowserRouter>
<Routes>

    <Route
      path="/"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/products"
      element={<Product />}
    />

    <Route
      path="/cart"
      element={<Cart />}
    />

    <Route
      path="/orders"
      element={<Orders />}
    />

    <Route
      path="/add-product"
      element={<AddProduct />}
    />

    <Route
      path="/edit-product/:id"
      element={<EditProduct />}
    />

    <Route
      path="/product/:id"
      element={<ProductDetails />}
    />

    <Route
      path="/admin"
      element={<Admin />}
    />

    <Route
      path="/admin-orders"
      element={<AdminOrders />}
    />

    <Route
      path="/users"
      element={<Users />}
    />

    <Route
      path="/admin-users"
      element={<AdminUsers />}
    />
    
    <Route
      path="/checkout"
      element={<Checkout />}
    />
  </Routes>
</BrowserRouter>

);
}

export default App;