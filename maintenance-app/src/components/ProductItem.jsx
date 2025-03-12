// 📌 src/components/ProductItem.jsx
import React from "react";


function ProductItem({ product, addToCart }) {
    return (
      <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
        <h3>{product.labelle}</h3>
        <p>Prix : {product.prix}€</p>
        <button onClick={() => addToCart(product)}>Ajouter au panier</button>
      </div>
    );
  }
  
  export default ProductItem;
  