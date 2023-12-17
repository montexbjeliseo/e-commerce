import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../constants";
import "./styles.css"
import { Loading } from "../../shared/components/Loading";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Category, Product, ProductFilters } from "../../types";
import { ProductList } from "../../shared/components/ProductList";
import { ProductFilterForm } from "../../shared/components/ProductFilterForm";
import { useState } from "react";
import { fetchCategories, fetchProducts } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";


export const ProductsPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const readSearchParams = (): ProductFilters => {

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

    const [filters, setFilters] = useState<ProductFilters>(readSearchParams());

    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts
    } = useQuery([QUERY_KEYS.PRODUCTS, filters], () => fetchProducts(filters));

    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery(QUERY_KEYS.CATEGORIES, () => fetchCategories());

    if (isLoadingProducts || (isLoadingCategories && !categories)) {
        return (
            <Loading />
        )
    }

    if ((isErrorCategories && !categories) || isErrorProducts) {
        return (
            <ErrorMessage />
        )
    }

    const filterChangeHandler = (newFilters: ProductFilters) => {
        
        const newSearchParams = new URLSearchParams();

        Object.entries(newFilters).forEach(([key, value]) => {
            newSearchParams.set(key, value as string);
        });

        navigate(`?${newSearchParams.toString()}`, { replace: true });

        setFilters(newFilters);

    }

    const clearFiltersHandler = () => {
        const newSearchParams = new URLSearchParams();
        navigate(`?${newSearchParams.toString()}`, { replace: true });
        setFilters({});
    }

    return (
        <>
            <section className="container center">
                <h1 className="title">Products</h1>
                <div className="product-container">
                    <aside>
                        <h2>Filters</h2>
                        <ProductFilterForm
                            categories={categories as Category[]}
                            allowedPriceRange={{min: 0, max: 99999}}
                            filters={filters}
                            handleFilterChange={filterChangeHandler}
                            handleClear={clearFiltersHandler}
                        />

                    </aside>
                    <main>
                        <ProductList products={products as Product[]} />
                    </main>
                </div>
            </section>
        </>

    )
}