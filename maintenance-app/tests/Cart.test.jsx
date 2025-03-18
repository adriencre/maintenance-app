import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cart from '../src/components/Cart';
import { CartContext } from '../src/context/CartContext';

describe('Cart', () => {
  const mockCart = [
    { _id: '1', labelle: 'Test Product', prix: 10, quantity: 2 },
    { _id: '2', labelle: 'Another Product', prix: 15, quantity: 1 }
  ];

  const mockContext = {
    cart: mockCart,
    updateQuantity: vi.fn(),
    removeFromCart: vi.fn()
  };

  const renderWithContext = (component) => {
    return render(
      <CartContext.Provider value={mockContext}>
        {component}
      </CartContext.Provider>
    );
  };

  it('displays empty cart message when cart is empty', () => {
    const emptyContext = { ...mockContext, cart: [] };
    render(
      <CartContext.Provider value={emptyContext}>
        <Cart />
      </CartContext.Provider>
    );
    expect(screen.getByText('Votre panier est vide.')).toBeInTheDocument();
  });

  it('displays cart items correctly', () => {
    renderWithContext(<Cart />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();
    // Utilisation d'une expression régulière pour matcher le total même si des espaces apparaissent
    expect(screen.getByText(/Total:\s*35\.00\s*€/)).toBeInTheDocument();
  });

  it('calls updateQuantity when quantity buttons are clicked', () => {
    renderWithContext(<Cart />);
    const incrementButtons = screen.getAllByText('+');
    const decrementButtons = screen.getAllByText('-');

    fireEvent.click(incrementButtons[0]);
    expect(mockContext.updateQuantity).toHaveBeenCalledWith('1', 3);

    fireEvent.click(decrementButtons[0]);
    expect(mockContext.updateQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('calls removeFromCart when remove button is clicked', () => {
    renderWithContext(<Cart />);
    const removeButtons = screen.getAllByText('×');

    fireEvent.click(removeButtons[0]);
    expect(mockContext.removeFromCart).toHaveBeenCalledWith('1');
  });
});
