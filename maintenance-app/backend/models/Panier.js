// backend/models/Panier.js
import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
  adresse: {
    type: String,
    required: true,
  },
  personne_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personne",
    required: true,
  },
  produits: [
    {
      produit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: true,
      },
      quantite: {
        type: Number,
        default: 1,
      }
    }
  ]
});

const Panier = mongoose.model("Panier", panierSchema);

export default Panier;
