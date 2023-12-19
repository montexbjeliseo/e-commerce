import { API_ENDPOINTS, HEADERS } from "./constants";
import { ProductFilters } from "./types";

type APIProductFilters = {
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  title?: string;
}

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
}

export const fetchCategories = async () => {
  const response = await fetch(API_ENDPOINTS.CATEGORIES);
  const json = await response.json();
  return json;
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

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    headers: HEADERS.DEFAULT_HEADERS,
    method: 'DELETE',
  });

  if(!response.ok) {
    throw new Error('Failed to delete product');
  }

  const data = await response.json();
  return data;
}

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

export const uploadImage = async (image: Blob) => {
  const formData = new FormData();
  formData.append('file', image);

  const response = await fetch(`${API_ENDPOINTS.UPLOAD}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image XD');
  }

  const data = await response.json();
  return data;
}

export const postCategory = async (categoryData: FormData, image: Blob) => {

  const newCategoryPayload = {
    name: categoryData.get('name') as string,
    image: ''
  }
  const { location: imageUrl } = await uploadImage(image);

  newCategoryPayload.image = imageUrl;

  const response = await fetch(`${API_ENDPOINTS.CATEGORIES}`, {
    headers: HEADERS.DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify(newCategoryPayload),
  });

  if (!response.ok) {

    throw new Error('Failed to create category');
  }

  const data = await response.json();
  return data;
}

export const updateCategory = async (categoryData: FormData, image: Blob | null, id: string) => {
  const newCategoryPayload = {
    name: categoryData.get('name') as string
  } as any

  if (image) {
    const { location: imageUrl } = await uploadImage(image);
    newCategoryPayload['image'] = imageUrl;
  }

  if (!id) {
    throw new Error('Failed to update category: no id');
  }

  const response = await fetch(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
    headers: HEADERS.DEFAULT_HEADERS,
    method: 'PUT',
    body: JSON.stringify(newCategoryPayload),
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }

  const data = await response.json();
  return data;

}

export const deleteCategory = async (id: string) => {
  const response = await fetch(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
    headers: HEADERS.DEFAULT_HEADERS,
    method: 'DELETE',
  });

  if(!response.ok) {
    throw new Error('Failed to delete category');
  }

  const data = await response.json();
  return data;
}

export const updateProduct = async (productData: any, id: string) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    headers: HEADERS.DEFAULT_HEADERS,
    method: 'PUT',
    body: JSON.stringify({
      ...productData
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  const data = await response.json();
  return data;
}

export const validateToken = async (token: string) => {
  const response = await fetch(`${API_ENDPOINTS.PROFILE}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data;
}