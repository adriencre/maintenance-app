// 📌 src/components/Cart.jsx
import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Mon Panier</h2>
      {cart.length === 0 ? <p>Votre panier est vide.</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.labelle} - {item.prix}€ x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
