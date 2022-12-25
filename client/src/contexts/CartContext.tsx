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
  sizes: {
    size: string;
    q: number;
  }[];
};

const CartContext = createContext({} as cartType);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: cartProviderProps) {
  const [cart, setCart] = useState<cartProps[]>([]);

  const IncreaseCartQuantity = (id: string, size: string) => {
    if (cart.length === 0) {
      setCart([...cart, { id: id, sizes: [{ size: size, q: 1 }] }]);
    } else {
      const IdExist = cart.find((item) => item.id === id);
      if (IdExist === undefined) {
        setCart([...cart, { id: id, sizes: [{ size: size, q: 1 }] }]);
      } else {
        const sizeExist = IdExist.sizes.find((item) => item.size === size);
        if (sizeExist === undefined) {
          setCart((currentItems) => {
            return currentItems.map((item) => {
              return { ...item, sizes: [...item.sizes, { size: size, q: 1 }] };
            });
          });
        } else {
          setCart((currentItem) => {
            return currentItem.map((item) => {
              if (item.id === id) {
                return {
                  id: item.id,
                  sizes: item.sizes.map((s) => {
                    if (s.size === size) {
                      return { size: size, q: s.q + 1 };
                    } else {
                      return s;
                    }
                  }),
                };
              } else {
                return item;
              }
            });
          });
        }
      }
    }
  };
  console.log(cart);

  const DecreaseCartQuantity = (id: string, size: string) => {};

  return (
    <CartContext.Provider
      value={{ cart, IncreaseCartQuantity, DecreaseCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
