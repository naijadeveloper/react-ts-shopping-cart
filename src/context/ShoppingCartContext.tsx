import { createContext, ReactNode, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartContextProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  isOpen: boolean,
  cartItems: CartItem[],
  cartQuantity: number,
  openCart: () => void,
  closeCart: () => void,
  getItemQuantity: (id: number) => number,
  increaseCartQuantity: (id: number) => void,
  decreaseCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void
}

type CartItem = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartContextProvider = ({children}: ShoppingCartContextProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((total, item) => item.quantity + total, 0);

  function openCart() {setIsOpen(true);}

  function closeCart() {setIsOpen(false);}

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id) == null) {
        return [...currItems, {id, quantity: 1}]
      }else {
        return currItems.map(item => {
          if(item.id === id) {
            return {...item, quantity: item.quantity + 1};
          }else {
            return item;
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if((currItems.find(item => item.id === id)?.quantity == 1) || !currItems.find(item => item.id == id)) {
        return currItems.filter(item => item.id !== id);
      }else {
        return currItems.map(item => {
          if(item.id === id) {
            return {...item, quantity: item.quantity - 1};
          }else {
            return item;
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    })
  }



  return (
    <ShoppingCartContext.Provider value={{isOpen, cartItems, cartQuantity, openCart, closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}