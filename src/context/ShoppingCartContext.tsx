import {createContext, ReactNode, useContext, useState} from "react";
import {ShoppingCart} from "../components/ShoppingCart";

type ShoppingCartProviderProps = { children: ReactNode }

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
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
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0

        //  метод массива find(), возвращает первый элемент массива, который удовлетворяет условию item.id === id .
        //  Если в массиве cartItems элемент с заданным id есть, то find() вернет его, иначе вернется undefined.
        //  ?.quantity - если find() вернул объект, то этот код извлекает его свойство quantity.
        //  Опциональный оператор, позволяет избежать ошибки "TypeError: Cannot read property 'quantity' of undefined",
        //  если find() вернул undefined.
        //  || 0 - если find() вернул undefined или объект без свойства quantity,то этот код вернет 0.
    }
    function increaseItemQuantity(id: number) {

        setCartItems(currentItems => {

            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, {id, quantity: 1}]
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

    }


    function decreaseItemQuantity(id: number) {
        setCartItems(currentItems => {
             if (currentItems.find(item => item.id === id)?.quantity === 0) {
                return currentItems.filter(item => item.id === id)
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
    }


    function removeFromCart(id: number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
        console.log(setCartItems)
    }


    return (
        <ShoppingCartContext.Provider
            value={{
                openCart,
                closeCart,
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            <ShoppingCart
            isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}
