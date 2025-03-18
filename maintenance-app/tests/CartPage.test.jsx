import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CartPage from '../src/pages/CartPage';
import { CartContext } from '../src/context/CartContext';

describe('CartPage', () => {
  const mockCart = [
    { _id: '1', labelle: 'Test Product', prix: 10, quantity: 2, image: 'test.jpg' },
    { _id: '2', labelle: 'Another Product', prix: 15, quantity: 1 }
  ];

  const renderWithContext = (component) => {
    return render(
      <CartContext.Provider value={{ cart: mockCart }}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </CartContext.Provider>
    );
  };

  it('displays cart items and total correctly', () => {
    renderWithContext(<CartPage />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();
    expect(screen.getByText('10€ x 2')).toBeInTheDocument();
    expect(screen.getByText('15€ x 1')).toBeInTheDocument();
    expect(screen.getByText('Total: 35.00€')).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', () => {
    render(
      <CartContext.Provider value={{ cart: [] }}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </CartContext.Provider>
    );
    
    expect(screen.getByText('Votre panier est vide.')).toBeInTheDocument();
    expect(screen.queryByText('Total:')).not.toBeInTheDocument();
  });

  it('renders checkout form when cart has items', () => {
    renderWithContext(<CartPage />);
    
    expect(screen.getByText('Payer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Adresse de livraison')).toBeInTheDocument();
  });

  it('displays back to products link', () => {
    renderWithContext(<CartPage />);
    
    const backLink = screen.getByText('⬅ Retour aux Produits');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });
});