import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce-backend-nu1x.onrender.com/api/products/${id}`
      );

      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          width: "500px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <h1>{product.name}</h1>

        <h2 style={{ color: "green" }}>
          ₹ {product.price}
        </h2>

        <h3>{product.category}</h3>

        <button
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;