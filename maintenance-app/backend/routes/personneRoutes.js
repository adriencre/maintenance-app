import mongoose from "mongoose";
import express from "express";
import Personne from "../models/Personne.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("📢 Requête reçue pour récupérer toutes les personnes.");
    const personnes = await Personne.find(); 
    res.status(200).json(personnes);
  } catch (error) {
    console.log("❌ Erreur lors de la récupération des personnes :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des personnes", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nom, prenom, email, mdp } = req.body;
    const nouvellePersonne = new Personne({ nom, prenom, email, mdp });
    await nouvellePersonne.save();
    res.status(201).json(nouvellePersonne);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    console.log("📢 Requête reçue pour la personne avec ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("❌ ID invalide :", req.params.id);
      return res.status(400).json({ message: "ID invalide" });
    }

    const personne = await Personne.findById(req.params.id);

    if (!personne) {
      console.log("❌ Personne non trouvée avec cet ID:", req.params.id);
      return res.status(404).json({ message: "Personne non trouvée" });
    }

    console.log("✅ Personne trouvée :", personne);
    res.status(200).json(personne);
  } catch (error) {
    console.log("❌ Erreur serveur :", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

export default router;
