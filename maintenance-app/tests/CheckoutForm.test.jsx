import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CheckoutForm from '../src/components/CheckoutForm';
import { CartContext } from '../src/context/CartContext';

describe('CheckoutForm', () => {
  const mockCart = [
    { _id: '1', quantity: 2 },
    { _id: '2', quantity: 1 }
  ];

  const mockClearCart = vi.fn();

  const renderWithContext = (component) => {
    return render(
      <CartContext.Provider value={{ cart: mockCart, clearCart: mockClearCart }}>
        {component}
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    global.fetch = vi.fn();
    global.alert = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    renderWithContext(<CheckoutForm />);
    expect(screen.getByPlaceholderText('Adresse de livraison')).toBeInTheDocument();
    expect(screen.getByText('Payer')).toBeInTheDocument();
  });

  it('shows alert when submitting without address', async () => {
    renderWithContext(<CheckoutForm />);
    fireEvent.click(screen.getByText('Payer'));
    expect(global.alert).toHaveBeenCalledWith('Veuillez entrer une adresse de livraison');
  });

  it('submits the form successfully', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true });
    
    renderWithContext(<CheckoutForm />);
    fireEvent.change(screen.getByPlaceholderText('Adresse de livraison'), {
      target: { value: '123 Test Street' }
    });
    fireEvent.click(screen.getByText('Payer'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5001/api/commandes',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );
      expect(mockClearCart).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Commande passée avec succès !');
    });
  });

  it('handles submission error', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    
    renderWithContext(<CheckoutForm />);
    fireEvent.change(screen.getByPlaceholderText('Adresse de livraison'), {
      target: { value: '123 Test Street' }
    });
    fireEvent.click(screen.getByText('Payer'));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Erreur lors de la commande');
      expect(mockClearCart).not.toHaveBeenCalled();
    });
  });
});