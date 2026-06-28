import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        calculateTotals(items);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Calculate totals
  const calculateTotals = (items) => {
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const price = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotalItems(count);
    setTotalPrice(price);
  };

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }
      
      calculateTotals(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      calculateTotals(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      calculateTotals(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    localStorage.removeItem('cart');
  };

  const value = {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
