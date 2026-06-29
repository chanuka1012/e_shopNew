import { createContext, useContext, useReducer, useEffect } from "react";
import { users } from "../data/mockData";

const AppContext = createContext(null);

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  searchQuery: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, cart: [], wishlist: [] };

    case "ADD_TO_CART": {
      const existing = state.cart.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ).filter(i => i.qty > 0),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "TOGGLE_WISHLIST": {
      const inWishlist = state.wishlist.find(i => i.id === action.payload.id);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter(i => i.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem("shopwave_state");
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch { return init; }
  });

  useEffect(() => {
    localStorage.setItem("shopwave_state", JSON.stringify({
      user: state.user,
      cart: state.cart,
      wishlist: state.wishlist,
    }));
  }, [state.user, state.cart, state.wishlist]);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      dispatch({ type: "LOGIN", payload: safeUser });
      return { success: true, user: safeUser };
    }
    return { success: false };
  };

  const logout = () => dispatch({ type: "LOGOUT" });
  const addToCart = (product) => dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleWishlist = (product) => dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  const setSearch = (q) => dispatch({ type: "SET_SEARCH", payload: q });

  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const isInWishlist = (id) => state.wishlist.some(i => i.id === id);

  return (
    <AppContext.Provider value={{
      ...state, login, logout,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist, setSearch,
      cartTotal, cartCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};
