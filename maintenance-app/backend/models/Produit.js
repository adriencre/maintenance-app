// backend/models/Produit.js
import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
  labelle: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: 'Aucune description disponible'
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  stock: {
    type: Number,
    default: 0
  }
});

const Produit = mongoose.model("Produit", produitSchema);

export default Produit;
