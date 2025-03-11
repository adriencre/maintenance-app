import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
  labelle: { type: String, required: true },
  prix: { type: Number, required: true },
});

export default mongoose.model("Produit", produitSchema);
