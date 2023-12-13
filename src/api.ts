import { API_ENDPOINTS } from "./constants";
import { ProductFilters } from "./types";

type APIProductFilters = {
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    title?: string;
}

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  if(!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
}

export const fetchProducts = async (filters: ProductFilters) => {
  const { price_min, price_max, categoryId, title } = filters;

  let newFilters: APIProductFilters = {};

  if (price_min && price_min > -1 && price_max && price_max > price_min) {
    newFilters['price_min'] = price_min;
    newFilters['price_max'] = price_max;
  }

  if (categoryId && categoryId > 0) {
    newFilters['categoryId'] = categoryId;
  }

  if (title) {
    newFilters['title'] = title;
  }

  const queryParams = new URLSearchParams(newFilters as any);

  const url = `${API_ENDPOINTS.PRODUCTS}?${queryParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export const register = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, avatar: 'https://picsum.photos/800' }),
  });
  const data = await response.json();
  return data;
}