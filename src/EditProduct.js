import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function EditProduct() {
const navigate = useNavigate();
const { id } = useParams();
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [image, setImage] = useState("");

useEffect(() => {
getProduct();
}, [id]);

const getProduct = async () => {
try {
const res = await axios.get(
`http://localhost:5000/api/products/${id}`
);

  setName(res.data.name);
  setPrice(res.data.price);
  setCategory(res.data.category);
  setImage(res.data.image);
} catch (err) {
  console.log(err);
}

};

const updateProduct = async () => {
try {
await axios.put(
`http://localhost:5000/api/products/${id}`,
{
name,
price,
category,
image,
}
);

  alert("Product Updated Successfully");
  navigate("/products");
} catch (err) {
  console.log(err);
  alert("Update Failed");
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
    Edit Product
  </h1>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "300px",
      margin: "auto",
      gap: "15px",
    }}
  >
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
    />

    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Price"
    />

    <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      placeholder="Category"
    />

    <input
      type="text"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      placeholder="Image URL"
    />

    <button
      onClick={updateProduct}
      style={{
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
      }}
    >
      Update Product
    </button>
  </div>
</div>

);
}

export default EditProduct;