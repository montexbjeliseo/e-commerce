export type Category = {
    id: string;
    name: string;
    image: string;
}

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

export type PriceRange = {
    min: number;
    max: number;
}

export type ProductFilters = {
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    title?: string;
}

export type CartItem = {
    product_id: number;
    product: Product;
    quantity: number;
}

export type AddressInfoType = {
    address: string;
    apartment: string;
    city: string;
    country: string;
    first_name: string;
    last_name: string;
    optional?: string;
    zipcode: string;
}

export type ShippingInfoType = {
    shipping: string;
}

export type PaymentInfoType = {
    
}

export type OrderInfoType = {
    address: AddressInfoType;
    shipping: ShippingInfoType;
    payment: PaymentInfoType;
    items: CartItem[];
    date: Date;
    arrival: Date;
}