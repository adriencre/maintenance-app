// 📌 src/components/CheckoutForm.jsx
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function CheckoutForm() {
  const [adresse, setAdresse] = useState("");
  const { cart, clearCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adresse) return alert("Veuillez entrer une adresse de livraison");

    const response = await fetch("http://localhost:5001/api/commandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        panier_id: "64b9e0f93dcee2c3a9e4c8b1", // ID du panier (à générer dynamiquement si nécessaire)
        produits: cart.map(({ _id, quantity }) => ({ produit_id: _id, quantite: quantity })),
      }),
    });

    if (response.ok) {
      alert("Commande passée avec succès !");
      clearCart();
    } else {
      alert("Erreur lors de la commande");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Paiement</h2>
      <input
        type="text"
        placeholder="Adresse de livraison"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
      />
      <button type="submit">Payer</button>
    </form>
  );
}

export default CheckoutForm;
