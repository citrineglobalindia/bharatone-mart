import { createContext, useContext, useMemo, useReducer } from "react";

const CartCtx = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const ex = state.items.find((i) => i.id === action.product.id);
      if (ex)
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + (action.qty || 1) } : i
          ),
        };
      return { ...state, items: [...state.items, { ...action.product, qty: action.qty || 1 }] };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "qty":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const value = useMemo(() => {
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      items: state.items,
      count,
      subtotal,
      add: (product, qty) => dispatch({ type: "add", product, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      setQty: (id, qty) => dispatch({ type: "qty", id, qty }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
