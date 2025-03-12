// backend/models/Personne.js
import mongoose from "mongoose";

const personneSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  }
});

const Personne = mongoose.model("Personne", personneSchema);

export default Personne;
