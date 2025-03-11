import express from "express";
import Produit from "../models/Produit.js";

const router = express.Router();

// 📌 Route pour récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 📌 Route pour ajouter un produit
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

export default router;
