import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const addProduct = async () => {
    try {
      await axios.post(
        "https://ecommerce-backend-nu1x.onrender.com/api/products",
        product
      );

      alert("Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add Product</h1>

      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;