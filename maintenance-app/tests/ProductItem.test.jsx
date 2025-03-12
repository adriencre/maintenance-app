import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductItem from "../src/components/ProductItem"; 
describe("ProductItem", () => {
  const product = { _id: "123", labelle: "Test Produit", prix: 50 };
  const addToCart = vi.fn();

  it("affiche correctement le produit", () => {
    render(<ProductItem product={product} addToCart={addToCart} />);
    expect(screen.getByText("Test Produit")).toBeInTheDocument();
    expect(screen.getByText("Prix : 50€")).toBeInTheDocument();
  });

  it("appelle addToCart lors du clic sur le bouton", () => {
    render(<ProductItem product={product} addToCart={addToCart} />);
    const button = screen.getByRole("button", { name: /ajouter au panier/i });
    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
