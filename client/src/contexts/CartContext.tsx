import { createContext, ReactNode, useContext, useState } from "react";

type cartProviderProps = {
  children: ReactNode;
};

type cartType = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cart: cartProps[];
  getItemQuantity: (id: string) => number;
  increaceCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

type cartProps = {
  id: string;
  q: number;
  size: string;
};

const CartContext = createContext({} as cartType);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: cartProviderProps) {
  const [cart, setCart] = useState<cartProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cartQuantity = cart.reduce((quantity, item) => item.q + quantity, 0);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const getItemQuantity = (id: string) => {
    return cart.find((item) => item.id === id)?.q || 0;
  };

  const increaceCartQuantity = (id: string, size: string) => {
    setCart((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, q: 1, size }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            // return { ...item, q: item.q + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: string) => {
    setCart((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.q === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, q: item.q - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaceCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cart,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
