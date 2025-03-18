import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminOrders from '../src/components/AdminOrders';

// Par défaut, fetch renvoie une réponse avec des commandes
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          _id: "1",
          produits: [
            { produit_id: { _id: "a1", labelle: "Test Product" }, quantite: 2 },
          ],
        },
      ]),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("affiche le titre 'Commandes récentes'", async () => {
  await act(async () => {
    render(<AdminOrders />);
  });
  await waitFor(() => {
    expect(screen.getByText(/Commandes récentes/i)).toBeInTheDocument();
  });
});

it("affiche les commandes récupérées", async () => {
  await act(async () => {
    render(<AdminOrders />);
  });
  await waitFor(() => {
    expect(screen.getByText("Commande #1")).toBeInTheDocument();
    expect(screen.getByText("Test Product - x2")).toBeInTheDocument();
  });
});

it("affiche un message d'erreur en cas d'échec de récupération", async () => {
  fetch.mockImplementationOnce(() => Promise.reject(new Error("Erreur serveur")));
  await act(async () => {
    render(<AdminOrders />);
  });
  await waitFor(() => {
    expect(screen.getByText("Erreur: Erreur serveur")).toBeInTheDocument();
  });
});

// Pour tester l'état de chargement, on force fetch à ne jamais se résoudre
it("affiche un état de chargement", () => {
  fetch.mockImplementationOnce(() => new Promise(() => {}));
  render(<AdminOrders />);
  expect(screen.getByText(/Chargement des commandes/i)).toBeInTheDocument();
});

it("affiche un message quand il n'y a pas de commandes", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
  await act(async () => {
    render(<AdminOrders />);
  });
  await waitFor(() => {
    expect(screen.getByText("Aucune commande trouvée")).toBeInTheDocument();
  });
});
