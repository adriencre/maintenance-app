import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartContext } from "../src/context/CartContext";
import ProductList from "../src/components/ProductList";

global.fetch = vi.fn();

describe("ProductList", () => {
  const products = [
    { _id: "1", labelle: "Produit 1", prix: 20 },
    { _id: "2", labelle: "Produit 2", prix: 30 },
  ];

  const addToCart = vi.fn();

  it("affiche les produits récupérés", async () => {
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(products),
    });

    render(
      <CartContext.Provider value={{ addToCart }}>
        <ProductList />
      </CartContext.Provider>
    );

    expect(screen.getByText("Liste des Produits")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Produit 1")).toBeInTheDocument();
      expect(screen.getByText("Produit 2")).toBeInTheDocument();
    });
  });
});
