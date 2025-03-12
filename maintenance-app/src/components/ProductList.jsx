// 📌 src/components/ProductList.jsx
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5001/api/produits")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Erreur de récupération des produits :", err));
  }, []);

  return (
    <div>
      <h2>Liste des Produits</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
