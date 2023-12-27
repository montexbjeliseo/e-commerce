import { createContext, useContext, useEffect, useState } from "react"
import { CartItem, Product } from "../../types";
import { useAuth } from "../AuthProvider";

type CartContextType = {
    items: CartItem[];
    addItem: (product_id: number, product: Product, quantity: number) => void;
    updateItem: (product_id: number, quantity: number) => void;
    removeItem: (product_id: number) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

type CartProviderProps = {
    children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {

    const { currentUser, isAuthenticated } = useAuth();

    const [items, setItems] = useState<CartItem[]>([]);

    const loadCart = (): void => {

        const storedCart = localStorage.getItem('cart_' + currentUser.email);

        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }

    const saveCart = () => {
        if (currentUser && currentUser.email) {
            localStorage.setItem('cart_' + currentUser.email, JSON.stringify(items));
        }
    }

    const addItem = (product_id: number, product: Product, quantity: number) => {
        setItems([...items, { product_id, product, quantity }]);
    }

    const updateItem = (product_id: number, quantity: number) => {
        setItems(items.map((item) => item.product_id === product_id ? { ...item, quantity } : item));
    }

    const removeItem = (product_id: number) => {
        setItems(items.filter((item) => item.product_id !== product_id));
    }

    const clear = () => {
        setItems([]);
    }

    useEffect(() => {

        if (isAuthenticated && currentUser) {
            loadCart();
        } else {
            setItems([]);
        }
    }, [isAuthenticated, currentUser]);

    useEffect(() => {
        if (isAuthenticated) {
            saveCart();
        }
    }, [items]);

    return (
        <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clear }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => {
    return useContext(CartContext)
}