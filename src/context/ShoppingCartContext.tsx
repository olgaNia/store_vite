import {createContext, ReactNode, useContext, useState} from "react";

type ShoppingCartProviderProps = { children: ReactNode }

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems: CartItem[]
    cartQuantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [cartQuantity, setCartQuantity] = useState<number>(0)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseItemQuantity(id: number) {

        setCartItems(currentItems => {

            if (currentItems.find(item => item.id === id) === null) {
                return [...currentItems,{id, quantity: 1}]
            } else {

                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
         // setCartQuantity(quantity => quantity + 1)
    }


    function decreaseItemQuantity(id: number) {
        setCartItems(currentItems => {

            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
         // setCartQuantity(quantity => quantity - 1)
    }


    function removeFromCart(id: number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
         // setCartQuantity(quantity => quantity - getItemQuantity(id))
    }


    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeFromCart,
                cartItems,
                cartQuantity
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}
