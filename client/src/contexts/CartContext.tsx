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
              if (IdExist.id === item.id) {
                return {
                  ...item,
                  sizes: [...item.sizes, { size: size, q: 1 }],
                };
              } else {
                return item;
              }
            });
          });
        } else {
          setCart((currentItem) => {
            return currentItem.map((item) => {
              if (item.id === id) {
                console.log("size quantity increased");
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

  const DecreaseCartQuantity = (id: string, size: string) => {
    const product = cart.find((item) => item.id === id);
    const mySize = product?.sizes.find((item) => item.size === size);

    setCart((CartItems) => {
      return CartItems.filter((item) => {
        if (item.id === id) {
          if (item.sizes.length === 1) {
            const singleQ = item.sizes.find((si) => si.size === size);
            if (singleQ?.q == 1) {
              return item.id !== id;
            } else {
              item.sizes.map((si) => {
                return (si.q = si.q - 1);
              });
            }
          } else {
            console.log("more than one size");
            const siz = item.sizes.find((si) => si.size === size);
            console.log(siz);
            if (siz?.q == 1) {
              const filtered = item.sizes.filter((si) => si.size !== siz.size);
              return (item.sizes = filtered);
            } else {
              return item.sizes.filter((si) => {
                if (si.size === size) {
                  return (si.q = si.q - 1);
                }
              });
            }
          }
        } else {
          console.log("not");
        }
        return item;
      });
    });
  };
  console.log(cart);

  return (
    <CartContext.Provider
      value={{ cart, IncreaseCartQuantity, DecreaseCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
