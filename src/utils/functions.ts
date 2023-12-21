import { ProductFilters } from "../types";

export const readProductFiltersFromSearchParams = (searchParams: URLSearchParams): ProductFilters => {

    const filters = {
        
    } as ProductFilters;

    const title = searchParams.get("title");

    if (title && title.length > 0 && title.length < 100) {
        filters["title"] = title;
    }

    const price_min = searchParams.get("price_min");
    const price_max = searchParams.get("price_max");

    if (price_min && price_max && price_min.length > 0 && price_max.length > 0) {
        filters["price_min"] = Number(price_min);
        filters["price_max"] = Number(price_max);
        
    }

    const categoryId = searchParams.get("categoryId");

    if (categoryId && categoryId.length > 0) {
        filters["categoryId"] = Number(categoryId);
    }

    return filters;
}