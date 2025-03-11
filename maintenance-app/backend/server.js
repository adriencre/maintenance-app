import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import produitRoutes from "./routes/produitRoutes.js"; // ✅ Vérifie ce chemin !

const app = express();
app.use(express.json());
app.use(cors());

console.log("🚀 Initialisation du serveur...");

// 📌 Routes API
app.use("/api/produits", produitRoutes);

const PORT = process.env.PORT || 5001;

// 📌 Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/maintenance-app")
  .then(() => console.log("✅ MongoDB connecté avec succès"))
  .catch(err => {
    console.error("❌ Erreur de connexion MongoDB:", err);
    process.exit(1);
  });

console.log(`📡 Démarrage du serveur sur le port ${PORT}...`);

app.listen(PORT, () => console.log(`✅ Serveur démarré sur http://localhost:${PORT}`));
