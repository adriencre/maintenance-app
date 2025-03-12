// backend/models/Commande.js
import mongoose from "mongoose";

const commandeSchema = new mongoose.Schema({
  panier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Panier",
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

const Commande = mongoose.model("Commande", commandeSchema);

export default Commande;
