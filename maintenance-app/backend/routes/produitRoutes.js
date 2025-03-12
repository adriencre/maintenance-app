import mongoose from "mongoose";
import express from "express";
import Produit from "../models/Produit.js";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { labelle, prix } = req.body;
    const nouveauProduit = new Produit({ labelle, prix });
    await nouveauProduit.save();
    res.status(201).json(nouveauProduit);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
    try {
      console.log("📢 Requête reçue pour le produit avec ID:", req.params.id);
  
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log("❌ ID invalide :", req.params.id);
        return res.status(400).json({ message: "ID invalide" });
      }
  
      const produit = await Produit.findById(req.params.id);
  
      if (!produit) {
        console.log("❌ Produit non trouvé avec cet ID:", req.params.id);
        return res.status(404).json({ message: "Produit non trouvé" });
      }
  
      console.log("✅ Produit trouvé :", produit);
      res.status(200).json(produit);
    } catch (error) {
      console.log("❌ Erreur serveur :", error.message);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });
  

export default router;
