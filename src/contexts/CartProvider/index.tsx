import { createContext, useContext, useEffect, useState } from "react"
import { CartItem, Product } from "../../types";

type CartContextType = {
    items: CartItem[];
    addItem: (product_id: number, product: Product, quantity: number) => void;
    removeItem: (product_id: number) => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

type CartProviderProps = {
    children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {

    const loadCart = () : CartItem[] => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            return JSON.parse(storedCart);
        }
        return [];
    }

    const [items, setItems] = useState<CartItem[]>(loadCart());

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(items));
    }

    const addItem = (product_id: number, product: Product, quantity: number) => {
        setItems([...items, {product_id, product, quantity}]);
    }

    const removeItem = (product_id: number) => {
        setItems(items.filter((item) => item.product_id !== product_id));
    }

    useEffect(() => {
        saveCart();
    }, [items]);

    return (
        <CartContext.Provider value={{items, addItem, removeItem}}>
            {children}
        </CartContext.Provider>
    )
    
}

export const useCart = () => {
    return useContext(CartContext)
}