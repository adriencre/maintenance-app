import React, { useState, useEffect } from "react";

function App() {
  const [produits, setProduits] = useState([]);
  const [personnes, setPersonnes] = useState([]);
  const [paniers, setPaniers] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5001/api/produits").then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
        return res.json();
      }),
      fetch("http://localhost:5001/api/personnes").then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des personnes");
        return res.json();
      }),
      fetch("http://localhost:5001/api/paniers").then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des paniers");
        return res.json();
      }),
      fetch("http://localhost:5001/api/commandes").then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des commandes");
        return res.json();
      }),
    ])
      .then(([produitsData, personnesData, paniersData, commandesData]) => {
        setProduits(produitsData);
        setPersonnes(personnesData);
        setPaniers(paniersData);
        setCommandes(commandesData);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Dashboard Maintenance App</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      <section>
        <h2>Liste des produits</h2>
        <ul>
          {produits.map((produit) => (
            <li key={produit._id}>
              {produit.labelle} - {produit.prix}€
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Liste des personnes</h2>
        <ul>
          {personnes.map((personne) => (
            <li key={personne._id}>
              {personne.nom} {personne.prenom} - {personne.email}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Liste des paniers</h2>
        <ul>
          {paniers.map((panier) => (
            <li key={panier._id}>
              <strong>Adresse :</strong> {panier.adresse} <br />
              <strong>Propriétaire :</strong>{" "}
              {panier.personne_id && panier.personne_id.nom}{" "}
              {panier.personne_id && panier.personne_id.prenom}
              <ul>
                {panier.produits &&
                  panier.produits.map((item, index) => (
                    <li key={index}>
                      Produit :{" "}
                      {item.produit_id && item.produit_id.labelle} - Quantité :{" "}
                      {item.quantite}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Liste des commandes</h2>
        <ul>
          {commandes.map((commande) => (
            <li key={commande._id}>
              <strong>ID Commande :</strong> {commande._id} <br />
              <strong>Panier :</strong>{" "}
              {commande.panier_id && commande.panier_id._id}
              <ul>
                {commande.produits &&
                  commande.produits.map((item, index) => (
                    <li key={index}>
                      Produit :{" "}
                      {item.produit_id && item.produit_id.labelle} - Quantité :{" "}
                      {item.quantite}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
