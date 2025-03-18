import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import "./CartPage.css";

function CartPage() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Mon Panier</h1>
      <Link to="/" className="back-link">⬅ Retour aux Produits</Link>
      
      <div className="cart-list">
        {cart.length === 0 ? (
          <p className="cart-empty">Votre panier est vide.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image || "https://via.placeholder.com/150"} alt={item.labelle} />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.labelle}</h3>
                <p className="cart-item-price">{item.prix}€ x {item.quantity}</p>
              </div>
              <p className="cart-item-total">{(item.prix * item.quantity).toFixed(2)}€</p>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="checkout-section">
          <h2>Total: {total.toFixed(2)}€</h2>
          <CheckoutForm />
        </div>
      )}
    </div>
  );
}

export default CartPage;
