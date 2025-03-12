import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartContext } from "../src/context/CartContext";
import Cart from "../src/components/Cart";

// Mock du contexte
const renderWithCartContext = (cart) => {
  return render(
    <CartContext.Provider value={{ cart }}>
      <Cart />
    </CartContext.Provider>
  );
};

describe("Cart Component", () => {
  it("affiche 'Votre panier est vide.' quand le panier est vide", () => {
    renderWithCartContext([]);
    expect(screen.getByText("Votre panier est vide.")).toBeInTheDocument();
  });

  it("affiche la liste des articles du panier", () => {
    const cartItems = [
      { _id: "1", labelle: "Produit 1", prix: 10, quantity: 2 },
      { _id: "2", labelle: "Produit 2", prix: 20, quantity: 1 },
    ];

    renderWithCartContext(cartItems);

    expect(screen.getByText("Produit 1 - 10€ x 2")).toBeInTheDocument();
    expect(screen.getByText("Produit 2 - 20€ x 1")).toBeInTheDocument();
  });

  it("affiche correctement le titre du panier", () => {
    renderWithCartContext([]);
    expect(screen.getByText("Mon Panier")).toBeInTheDocument();
  });
});
