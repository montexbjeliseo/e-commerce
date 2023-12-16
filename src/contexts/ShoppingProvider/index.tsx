import { Context, createContext, useContext, useEffect, useState } from "react"
import { AddressInfoType, OrderInfoType } from "../../types";
import { DEFAULT_SHIPPING_METHODS } from "../../constants";

type ShippingContextType = {
    orders: OrderInfoType[];
    addressInfo: any;
    shippingInfo: any;
    paymentInfo: any;
    shippingMethods: any[];
    saveAddressInfo: (data: AddressInfoType) => void;
    saveShippingInfo: (data: any) => void;
    savePaymentInfo: (data: any) => void;
    addOrder: (data: any) => void;

    isAddressInfoValid: () => boolean;
    isShippingInfoValid: () => boolean;
}

const ShippingContext: Context<ShippingContextType> = createContext({} as ShippingContextType);

export const ShoppingProvider = ({ children }: any) => {

    const loadOrders = () : OrderInfoType[] => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            return JSON.parse(storedOrders);
        }
        return [];
    }

    const [orders, setOrders] = useState<OrderInfoType[]>(loadOrders());

    const [addressInfo, setAddressInfo] = useState({});

    const [shippingInfo, setShippingInfo] = useState({});

    const [paymentInfo, setPaymentInfo] = useState({});

    const [shippingMethods] = useState(DEFAULT_SHIPPING_METHODS);


    const saveAddressInfo = (data: AddressInfoType) => {
        setAddressInfo(data);
    }

    const saveShippingInfo = (data: any) => {
        setShippingInfo(data);
    }

    const addOrder = (data: OrderInfoType) => {
        setOrders([...orders, data]);
    }

    const isAddressInfoValid = () => {
        return Object.keys(addressInfo).length > 0;
    }

    const isShippingInfoValid = () => {
        return Object.keys(shippingInfo).length > 0;
    }

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    return (
        <ShippingContext.Provider value={{ orders, addressInfo, saveAddressInfo, shippingInfo, saveShippingInfo, paymentInfo, savePaymentInfo: setPaymentInfo, addOrder, shippingMethods, isAddressInfoValid, isShippingInfoValid }}>
            {children}
        </ShippingContext.Provider>
    )
}

export const useShopping = () => {
    return useContext(ShippingContext);
}