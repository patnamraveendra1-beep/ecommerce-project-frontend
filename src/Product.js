// Product.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Product() {
const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
useEffect(() => {
getProducts();
}, []);

const getProducts = async () => {
try {
const res = await axios.get(
`https://ecommerce-backend-nu1x.onrender.com/api/products`
);

  setProducts(res.data);
} catch (err) {
  console.log(err);
}

};

const addToCart = async (product) => {
const token = localStorage.getItem("token");

try {
  await axios.post(
    "https://ecommerce-backend-nu1x.onrender.com/api/cart",
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Added To Cart");
  navigate("/cart");
} catch (err) {
  console.log(err.response?.data);
  alert("Please Login First");
}

};

const deleteProduct = async (id) => {
try {
await axios.delete(
`https://ecommerce-backend-nu1x.onrender.com/api/products/${id}`
);

  alert("Product Deleted Successfully");

  getProducts();
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
    Products
  </h1>

  <div
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    <input
      type="text"
      placeholder="Search Product..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        padding: "12px",
        width: "350px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
      }}
    />
    
    <select
      value={category}
      onChange={ (e) =>
        setCategory(e.target.value)
      }
      style={{
        padding: "12px",
        marginLeft: "10px",
        borderRadius: "8px",
      }}
    >
      <option value="">
        All Categories
      </option>
      <option value="Electronics">
        Electronics
      </option>
      <option value="Fashion">
        Fashion
      </option>
      <option value="Books">
        Books
      </option>
    </select>
  </div>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {products
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((item) => 
        category === ""
          ? true
          : item.category === category
      )
      .map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            margin: "15px",
            padding: "20px",
            width: "280px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            backgroundColor: "#fff",
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

          <h2>{item.name}</h2>

          <h3 style={{ color: "green" }}>
            ₹ {item.price}
          </h3>

          <button
            onClick={() =>
              addToCart(item)
            }
            style={{
              padding: "8px 15px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Add To Cart
          </button>

          <button
            onClick={() =>
              navigate(`/product/${item._id}`)
            }
            style={{
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            View Details
          </button>

          <br />
          <br />

          <button
            onClick={() =>
              navigate(
                `/edit-product/${item._id}`
              )
            }
            style={{
              background: "orange",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Edit Product
          </button>

          <button
            onClick={() =>
              deleteProduct(item._id)
            }
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete Product
          </button>
        </div>
      ))}
  </div>
</div>

)};

export default Product;