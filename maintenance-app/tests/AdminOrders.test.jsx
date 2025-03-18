import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminOrders from "../src/pages/OrdersPage";

// Mock fetch globally
global.fetch = vi.fn();

describe("AdminOrders", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("displays loading state", () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    render(<AdminOrders />);
    expect(screen.getByTestId("loading")).toHaveTextContent("Chargement des commandes...");
  });

  it("displays orders when fetch succeeds", async () => {
    const mockOrders = [
      {
        _id: "123",
        produits: [
          { produit_id: { _id: "1", labelle: "Produit A" }, quantite: 2 },
          { produit_id: { _id: "2", labelle: "Produit B" }, quantite: 1 }
        ]
      }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockOrders)
    });

    render(<AdminOrders />);

    await waitFor(() => {
      expect(screen.getByText("Commandes récentes")).toBeInTheDocument();
      expect(screen.getByText("Commande #123")).toBeInTheDocument();
      expect(screen.getByText("Produit A - x2")).toBeInTheDocument();
      expect(screen.getByText("Produit B - x1")).toBeInTheDocument();
    });
  });

  it("displays error message when fetch fails", async () => {
    const errorMessage = "Network error";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<AdminOrders />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(`Erreur: ${errorMessage}`);
    });
  });

  it("displays message when no orders are found", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    render(<AdminOrders />);

    await waitFor(() => {
      expect(screen.getByTestId("no-orders")).toHaveTextContent("Aucune commande trouvée");
    });
  });

  it("handles HTTP errors correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    render(<AdminOrders />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("Erreur: HTTP error! status: 404");
    });
  });
});