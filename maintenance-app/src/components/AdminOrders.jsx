// 📌 src/components/AdminOrders.jsx
import React, { useState, useEffect } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/commandes")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de récupération des commandes :", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement des commandes...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h2>Commandes récentes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ) : (
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
      )}
    </div>
  );
}

export default AdminOrders;
