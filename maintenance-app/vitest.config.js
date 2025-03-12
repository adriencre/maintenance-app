/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // Pour simuler l'environnement du navigateur
    unstubGlobals: true,
    setupFiles: "./src/setupTests.js", // Charge ce fichier avant les tests
    include: ["tests/**/*.{test,spec}.{js,jsx}"] // Inclut les fichiers de tests dans le dossier tests
  },
});
