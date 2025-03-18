import React, { useState, useEffect } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/commandes");
        console.log("Réponse API reçue :", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues :", data);
        setOrders(data);
      } catch (err) {
        console.error("Erreur de récupération des commandes :", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div data-testid="loading">Chargement des commandes...</div>;
  if (error) return <div data-testid="error">Erreur: {error}</div>;

  return (
    <div>
      <h2>Commandes récentes</h2>
      {orders.length === 0 ? (
        <p data-testid="no-orders">Aucune commande trouvée</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} data-testid="order-item">
              <strong>Commande #{order._id}</strong>
              <ul>
                {order.produits.map((p) => (
                  <li key={p.produit_id._id}>
                    {p.produit_id.labelle} - x{p.quantite}
                  </li>
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
