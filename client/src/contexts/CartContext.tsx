import { createContext, ReactNode, useContext, useState } from "react";

type cartProviderProps = {
  children: ReactNode;
};

type cartType = {
  cart: cartProps[];
  IncreaseCartQuantity: (id: string, size: string) => void;
  DecreaseCartQuantity: (id: string, size: string) => void;
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

  const IncreaseCartQuantity = (id: string, size: string) => {
    const find = cart.find((item) => item.id === id);

    if (find == null) {
      return setCart([...cart, { id, q: 1, size }]);
    } else if (find.size === size) {
      setCart((currentItems) => {
        return currentItems.map((item) => {
          return { ...item, q: item.q + 1 };
        });
      });
    } else if (find.size != size) {
      return setCart([...cart, { id, q: 1, size }]);
    }
  };

  const DecreaseCartQuantity = (id: string, size: string) => {
    const find = cart.find((item) => item.id === id);
    if (find == null) {
    } else {
      setCart((currentItems) => {
        if (currentItems.find((item) => item.id === id)?.q === 1) {
          return currentItems.filter((item) => item.id !== id);
        } else {
          return currentItems.map((item) => {
            return { ...item, q: item.q - 1 };
          });
        }
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, IncreaseCartQuantity, DecreaseCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
