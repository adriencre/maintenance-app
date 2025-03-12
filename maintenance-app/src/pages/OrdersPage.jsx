// 📌 src/pages/OrdersPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/commandes")
      .then((res) => res.json())
      .then(setOrders)
      .catch((err) => console.error("Erreur de récupération des commandes :", err));
  }, []);

  return (
    <div>
      <h1>Commandes récentes</h1>
      <Link to="/">⬅ Retour aux Produits</Link>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <strong>Commande #{order._id}</strong>
            <ul>
              {order.produits.map((p) => (
                <li key={p.produit_id._id}>{p.produit_id.labelle} - x{p.quantite}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
