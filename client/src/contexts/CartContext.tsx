import { createContext, ReactNode, useContext, useState } from "react";

type cartProviderProps = {
  children: ReactNode;
};

type cartType = {};

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

  return (
    <CartContext.Provider
      value={{
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
