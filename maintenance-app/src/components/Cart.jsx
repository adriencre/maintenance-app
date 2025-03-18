import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Mon Panier</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img 
                  src={item.image || "https://via.placeholder.com/50"} 
                  alt={item.labelle}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.labelle}</h3>
                  <p>{item.prix}€</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item._id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: {total.toFixed(2)}€</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
