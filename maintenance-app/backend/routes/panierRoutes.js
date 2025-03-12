// backend/routes/panierRoutes.js
import express from "express";
import Panier from "../models/Panier.js";
import mongoose from "mongoose";

const router = express.Router();

// Créer un panier
router.post("/", async (req, res) => {
  try {
    const { adresse, personne_id, produits } = req.body;
    const newPanier = new Panier({ adresse, personne_id, produits });
    await newPanier.save();
    res.status(201).json({ message: "Panier créé", panier: newPanier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du panier", error });
  }
});

router.get("/", async (req, res) => {
    try {
      const paniers = await Panier.find()
        .populate("personne_id")  
        .populate("produits.produit_id");
  
      res.status(200).json(paniers);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des paniers", error: error.message });
    }
  });

// Récupérer un panier par ID
router.get("/:id", async (req, res) => {
  try {
    const panier = await Panier.findById(req.params.id)
      .populate("personne_id")  // Peupler la personne
      .populate("produits.produit_id");  // Peupler les produits
    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du panier", error });
  }
});

export default router;
