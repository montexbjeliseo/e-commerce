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
    price_min: number;
    price_max: number;
    categoryId?: number;
    title?: string;
}

export type CartItem = {
    product_id: number;
    product: Product;
    quantity: number;
}