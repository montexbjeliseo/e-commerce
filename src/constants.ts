export const QUERY_KEYS = {
    CATEGORIES: 'categories',
    PRODUCTS: 'products'
};

export const API_ENDPOINTS = {
    BASE_URL: 'https://api.escuelajs.co/api/v1',
    CATEGORIES: 'https://api.escuelajs.co/api/v1/categories',
    PRODUCTS: 'https://api.escuelajs.co/api/v1/products',
    
    LOGIN: 'https://api.escuelajs.co/api/v1/auth/login',
    REGISTER: 'https://api.escuelajs.co/api/v1/users/',

    PROFILE: 'https://api.escuelajs.co/api/v1/auth/profile',
};

export const IMAGE_PLACEHOLDER = { 
    IMAGE_300: 'https://via.placeholder.com/300' 
};

export const APP_ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    CATEGORIES: '/categories',
    PRODUCTS: '/products',
    PRODUCT_DETAILS: '/products/:id',
    PRODUCT_CREATE: '/products/create',
    PRODUCT_EDIT: '/products/edit/:id',
    CART: '/cart-detail',
    ABOUT: '/about',
    CHECKOUT_ADDRESS: '/checkout/address',
    CHECKOUT_SHIPPING: '/checkout/shipping',
    CHECKOUT_PAYMENT: '/checkout/payment',
}

export const ERROR = {
    NETWORK_ERROR: 'Network Error',
    UNAUTHORIZED: 401
}

export const AUTH_LOCAL_STORAGE = {
    ACCESS_TOKEN: 'accessToken'   
}

export const DEFAULT_SHIPPING_METHODS = [
    {
        id: 1,
        name: 'UPS/USPS Surepost',
        description: '5-10 business days'
    },
    {
        id: 2,
        name: 'FedEx',
        description: '2-5 business days'
    }
];

export const HEADERS = {
    DEFAULT_HEADERS: {
        'Host': 'localhost:5173',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-COntrol-Allow-Headers': 'Content-Type',
      }
}