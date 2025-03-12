// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import produitRoutes from "./routes/produitRoutes.js";
import personneRoutes from "./routes/personneRoutes.js";
import panierRoutes from "./routes/panierRoutes.js";
import commandeRoutes from "./routes/commandeRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

console.log("🚀 Initialisation du serveur...");

// Enregistrer les routes API
app.use("/api/personnes", personneRoutes);
app.use("/api/produits", produitRoutes);
app.use("/api/paniers", panierRoutes);
app.use("/api/commandes", commandeRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect("mongodb://127.0.0.1:27017/maintenance-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connecté avec succès"))
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB:", err);
    process.exit(1);
  });

app.listen(PORT, () =>
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`)
);
