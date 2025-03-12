// backend/routes/commandeRoutes.js
import express from "express";
import Commande from "../models/Commande.js";
import mongoose from "mongoose";

const router = express.Router();

// Créer une commande
router.post("/", async (req, res) => {
  try {
    const { panier_id, produits } = req.body;
    const newCommande = new Commande({ panier_id, produits });
    await newCommande.save();
    res.status(201).json({ message: "Commande créée", commande: newCommande });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la commande", error });
  }
});


// Récupérer toutes les commandes
router.get("/", async (req, res) => {
    try {
      console.log("📢 Requête reçue pour récupérer toutes les commandes.");
      const commandes = await Commande.find()
        .populate("panier_id")  
        .populate("produits.produit_id"); 
  
      res.status(200).json(commandes);
    } catch (error) {
      console.log("❌ Erreur lors de la récupération des commandes :", error.message);
      res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: error.message });
    }
  });
  


router.get("/:id", async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate("panier_id")  
      .populate("produits.produit_id"); 
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la commande", error });
  }
});

export default router;
