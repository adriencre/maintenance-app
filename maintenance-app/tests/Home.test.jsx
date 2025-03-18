import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home';
import { CartContext } from '../src/context/CartContext';

describe('Home', () => {
  const mockProducts = [
    { _id: '1', labelle: 'Test Product 1', prix: 10 },
    { _id: '2', labelle: 'Test Product 2', prix: 20 }
  ];

  const mockAddToCart = vi.fn();

  const renderWithContext = (component) => {
    return render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and cart link', () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([])
    });

    renderWithContext(<Home />);
    expect(screen.getByText('BlackMarket')).toBeInTheDocument();
    expect(screen.getByText('🛒 Voir le Panier')).toBeInTheDocument();
  });

  it('displays products after successful fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts)
    });

    renderWithContext(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    renderWithContext(<Home />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Erreur de récupération des produits :',
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });
});