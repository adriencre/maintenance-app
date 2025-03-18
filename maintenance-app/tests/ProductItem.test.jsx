import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductItem from '../src/components/ProductItem';

describe('ProductItem', () => {
  const mockProduct = {
    _id: '1',
    labelle: 'Test Product',
    prix: 10,
    description: 'Test Description',
    image: 'test-image.jpg'
  };

  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductItem product={mockProduct} addToCart={mockAddToCart} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('10€')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('uses placeholder image when image is not provided', () => {
    const productWithoutImage = { ...mockProduct, image: null };
    render(<ProductItem product={productWithoutImage} addToCart={mockAddToCart} />);
    
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('shows default description when description is not provided', () => {
    const productWithoutDesc = { ...mockProduct, description: null };
    render(<ProductItem product={productWithoutDesc} addToCart={mockAddToCart} />);
    
    expect(screen.getByText('Aucune description disponible')).toBeInTheDocument();
  });

  it('calls addToCart and shows added state when clicking add button', () => {
    vi.useFakeTimers();
    render(<ProductItem product={mockProduct} addToCart={mockAddToCart} />);
    
    // Rechercher le bouton par son rôle avec le texte "Ajouter au panier"
    const addButton = screen.getByRole('button', { name: /Ajouter au panier/i });
    fireEvent.click(addButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    // Après le clic, le bouton doit afficher "✓ Ajouté"
    expect(screen.getByRole('button', { name: /✓ Ajouté/i })).toBeInTheDocument();
    
    // Avancer le timer pour que le texte revienne à "Ajouter au panier"
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole('button', { name: /Ajouter au panier/i })).toBeInTheDocument();
    
    vi.useRealTimers();
  });
});
