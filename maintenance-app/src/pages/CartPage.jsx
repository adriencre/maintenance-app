// 📌 src/pages/CartPage.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

function CartPage() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1>Mon Panier</h1>
      <Link to="/">⬅ Retour aux Produits</Link>
      {cart.length === 0 ? <p>Votre panier est vide.</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.labelle} - {item.prix}€ x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <CheckoutForm />
    </div>
  );
}

export default CartPage;
