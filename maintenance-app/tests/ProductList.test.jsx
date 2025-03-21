import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductList from '../src/components/ProductList';
import { CartContext } from '../src/context/CartContext';

describe('ProductList', () => {
  const mockProducts = [
    { _id: '1', labelle: 'Test Product 1', prix: 10 },
    { _id: '2', labelle: 'Test Product 2', prix: 20 }
  ];

  const mockAddToCart = vi.fn();

  const renderWithContext = (component) => {
    return render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        {component}
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    global.fetch.mockImplementationOnce(() =>
      new Promise(() => {})
    );

    renderWithContext(<ProductList />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('displays products after successful fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    });

    renderWithContext(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    renderWithContext(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des produits')).toBeInTheDocument();
    });
  });

  it('makes correct fetch call', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    });

    renderWithContext(<ProductList />);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5001/api/produits');
  });
});