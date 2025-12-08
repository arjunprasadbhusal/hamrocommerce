import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { API_ENDPOINTS } from '../src/constant/api';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    } else {
      // Load from localStorage if not logged in
      const savedCart = localStorage.getItem('hamro_cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
  }, []);

  // Save cart to local storage on change (for non-logged-in users)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('hamro_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Fetch cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.MY_CART, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success && data.carts) {
        // Transform backend cart format to frontend format
        const transformedCart = data.carts.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          photo_url: item.product.photo_url,
          image: item.product.photo_url,
          stock: item.product.stock,
          quantity: item.quantity,
          category: item.product.category,
          brand: item.product.brand,
          description: item.product.description,
          cartId: item.id // Store cart ID for deletion
        }));
        setCart(transformedCart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Guest users: use localStorage
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          if (product.stock !== undefined && existing.quantity >= product.stock) {
            alert(`Sorry, only ${product.stock} units available in stock`);
            return prev;
          }
          return prev.map((item) =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1, stock: product.stock } 
              : item
          );
        }
        if (product.stock !== undefined && product.stock < 1) {
          alert('Sorry, this product is out of stock');
          return prev;
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      console.log('Item added to local cart (guest user)');
      return;
    }

    // Logged-in users: use API
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.CART, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Refresh cart from backend to get updated data
        await fetchCart();
        console.log('Item added to cart via API');
      } else {
        console.error('API returned error:', data.message);
        alert(data.message || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart via API:', error);
      
      // Fallback to localStorage if API fails
      console.log('Falling back to local cart due to API error');
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1, stock: product.stock } 
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Local cart
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }

    // Backend cart
    const cartItem = cart.find(item => item.id === productId);
    
    // If no cartId, just remove from local state (for items added locally)
    if (!cartItem || !cartItem.cartId) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.CART, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          dataid: cartItem.cartId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove from local state
        setCart((prev) => prev.filter((item) => item.id !== productId));
        console.log('Item removed from cart');
      } else {
        // Still remove from local state even if backend fails
        setCart((prev) => prev.filter((item) => item.id !== productId));
        console.error('Backend removal failed but removed locally:', data.message);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Still remove from local state even if API fails
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    const token = localStorage.getItem('token');
    const cartItem = cart.find(item => item.id === productId);
    
    if (!token) {
      // Guest users: update localStorage
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === productId) {
            if (item.stock !== undefined && quantity > item.stock) {
              alert(`Sorry, only ${item.stock} units available in stock`);
              return item;
            }
            return { ...item, quantity };
          }
          return item;
        })
      );
      return;
    }

    // Logged-in users: use API
    if (!cartItem || !cartItem.cartId) {
      console.error('Cart item not found or missing cartId');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.CART_UPDATE(cartItem.cartId), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Refresh cart from backend
        await fetchCart();
        console.log('Cart updated via API');
      } else {
        alert(data.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity via API:', error);
      alert('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
