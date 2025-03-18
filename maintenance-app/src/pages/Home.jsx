// src/pages/Home.jsx
import React from "react";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5001/api/produits")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Erreur de récupération des produits :", err));
  }, []);

  return (
    <div className="home-container">
      <h1>Liste des Produits</h1>
      <Link to="/panier" className="cart-link">🛒 Voir le Panier</Link>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
