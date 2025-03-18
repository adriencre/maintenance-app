import React, { useState, useEffect } from "react";
import "./OrdersPage.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/commandes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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

  if (loading) return <div className="loading-spinner">Chargement des commandes...</div>;
  if (error) return <div className="error-message">Erreur: {error}</div>;

  return (
    <div className="orders-page">
      <h2>Commandes récentes</h2>
      {orders.length === 0 ? (
        <div className="no-orders">Aucune commande trouvée</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card" data-testid="order-item">
              <div className="order-header">
                <span className="order-id">Commande #{order._id}</span>
              </div>
              <div className="order-products">
                {order.produits.map((p) => {
                  if (!p.produit_id) {
                    return (
                      <div key={`missing-${Math.random()}`} className="product-item error">
                        <span className="product-name">Produit indisponible</span>
                      </div>
                    );
                  }
                  return (
                    <div key={p.produit_id._id} className="product-item">
                      <span className="product-name">{p.produit_id.labelle || 'Nom indisponible'}</span>
                      <span className="product-quantity">x{p.quantite}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;