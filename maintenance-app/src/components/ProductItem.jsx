import React, { useState } from "react";
import "./ProductItem.css";

function ProductItem({ product, addToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="product-card">
      <img 
        src={product.image || "https://via.placeholder.com/150"} 
        alt={product.labelle}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.labelle}</h3>
        <p className="product-price">{product.prix}€</p>
        <p className="product-description">{product.description || "Aucune description disponible"}</p>
        <button 
          className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {isAdded ? '✓ Ajouté' : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
