import { createSlice } from '@reduxjs/toolkit';

const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = {
  items: getCartFromLocalStorage(),
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, name, price, image, quantity });
      }
      
      // Update totals
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      
      // Save to localStorage
      saveCartToLocalStorage(state.items);
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Update totals
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      
      // Save to localStorage
      saveCartToLocalStorage(state.items);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
        
        // Update totals
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Save to localStorage
        saveCartToLocalStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      localStorage.removeItem('cart');
    },
    
    loadCart: (state) => {
      const cart = getCartFromLocalStorage();
      state.items = cart;
      state.total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
