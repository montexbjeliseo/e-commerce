import { Context, createContext, useContext, useState } from "react"
import { AddressInfoType } from "../../types";

type ShippingContextType = {
    purchases: any[];
    addressInfo: any;
    shippingInfo: any;
    paymentInfo: any;
    saveAddressInfo: (data: AddressInfoType) => void;
    saveShippingInfo: (data: any) => void;
    savePaymentInfo: (data: any) => void;
    addPurchase: (data: any) => void;
}

const ShippingContext: Context<ShippingContextType> = createContext({} as ShippingContextType);

export const ShoppingProvider = ({ children }: any) => {

    const [purchases, setPurchases] = useState([]);

    const [addressInfo, setAddressInfo] = useState({});

    const [shippingInfo, setShippingInfo] = useState({});

    const [paymentInfo, setPaymentInfo] = useState({});


    const saveAddressInfo = (data: AddressInfoType) => {
        setAddressInfo(data);
    }

    const saveShippingInfo = (data: any) => {
        setShippingInfo(data);
    }

    const addPurchase = (data: any) => {
        setPurchases([...purchases, data as never]);
    }

    return (
        <ShippingContext.Provider value={{ purchases, addressInfo, saveAddressInfo, shippingInfo, saveShippingInfo, paymentInfo, savePaymentInfo: setPaymentInfo, addPurchase }}>
            {children}
        </ShippingContext.Provider>
    )
}

export const useShopping = () => {
    return useContext(ShippingContext);
}