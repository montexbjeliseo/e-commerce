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