console.log("vhjk");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("🚀 Initialisation du serveur...");  // Ajout pour voir si le serveur démarre

const app = express();
app.use(express.json());
app.use(cors());

console.log("🔗 Tentative de connexion à MongoDB..."); 

mongoose.connect("mongodb://127.0.0.1:27017/maintenance-app")
  .then(() => console.log("✅ MongoDB connecté avec succès"))
  .catch(err => console.log("❌ Erreur de connexion MongoDB:", err));

console.log("🛠 Configuration des routes...");  

app.get("/", (req, res) => {