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
  }
});

const Produit = mongoose.model("Produit", produitSchema);

export default Produit;
