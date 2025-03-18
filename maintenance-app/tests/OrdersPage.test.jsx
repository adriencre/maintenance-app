import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrdersPage from '../src/pages/OrdersPage';

describe('OrdersPage', () => {
  const mockOrders = [
    {
      _id: '1',
      produits: [
        {
          produit_id: {
            _id: 'p1',
            labelle: 'Test Product'
          },
          quantite: 2
        }
      ]
    },
    {
      _id: '2',
      produits: [
        {
          produit_id: null,
          quantite: 1
        }
      ]
    }
  ];

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {}));
    render(<OrdersPage />);
    expect(screen.getByText('Chargement des commandes...')).toBeInTheDocument();
  });

  it('displays orders after successful fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockOrders)
    });

    render(<OrdersPage />);

    await waitFor(() => {
      expect(screen.getByText('Commande #1')).toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('x2')).toBeInTheDocument();
      expect(screen.getByText('Produit indisponible')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    const errorMessage = 'Network error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<OrdersPage />);

    await waitFor(() => {
      expect(screen.getByText(`Erreur: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('displays no orders message when orders array is empty', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    render(<OrdersPage />);

    await waitFor(() => {
      expect(screen.getByText('Aucune commande trouvée')).toBeInTheDocument();
    });
  });
});