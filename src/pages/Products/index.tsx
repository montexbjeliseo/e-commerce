import { useQuery } from "react-query";
import { API_ENDPOINTS, QUERY_KEYS } from "../../constants";
import "./styles.css"
import { Loading } from "../../shared/components/Loading";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Category, Product, ProductFilters } from "../../types";
import { ProductList } from "../../shared/components/ProductList";
import { ProductFilterForm } from "../../shared/components/ProductFilterForm";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";


export const ProductsPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const readSearchParams = () : ProductFilters => {

        const filters = {
            price_min: parseInt(searchParams.get('price_min') as string) || 0,
            price_max: parseInt(searchParams.get('price_max') as string) || 0,
            categoryId: parseInt(searchParams.get('category_id') as string) || 0,
            title: searchParams.get('title') || '',
        };
        return filters;
    }

    const [filters, setFilters] = useState<ProductFilters>(readSearchParams());

    const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts, refetch } = useQuery([QUERY_KEYS.PRODUCTS, filters], () => fetchProducts(filters), { enabled: false });

    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery(QUERY_KEYS.CATEGORIES, async () => {
        const response = await fetch(API_ENDPOINTS.CATEGORIES);
        const json = await response.json();
        return json;
    })

    function getAllowedPriceRange() {

        if (!products) {
            return {
                min: 0,
                max: 0
            }
        }

        const minPrice = Math.min(...(products as Product[]).map((product) => product.price));
        const maxPrice = Math.max(...(products as Product[]).map((product) => product.price));

        return {
            min: minPrice,
            max: maxPrice
        }

    }

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
        // Actualizar la cadena de consulta al cambiar los filtros
        const newSearchParams = new URLSearchParams();

        Object.entries(newFilters).forEach(([key, value]) => {
            newSearchParams.set(key, value as string);
        });

        if(newFilters.title && newFilters.title.length > 0 && newFilters.title.length < 100) {
            newSearchParams.set('title', newFilters.title);
        }

        if(newFilters.price_min 
            && newFilters.price_max 
            && newFilters.price_max > newFilters.price_min 
            && newFilters.price_min > 0){
            newSearchParams.set('price_min', newFilters.price_min.toString());
            newSearchParams.set('price_max', newFilters.price_max.toString());
        }

        navigate(`?${newSearchParams.toString()}`);
        // setFilters(newFilters);
        // refetch();
    }

    // useEffect(() => {

    //     // setFilters(readSearchParams());
    //     // refetch();

    // }, [location.search, refetch]);

    return (
        <>
            <section className="container center">
                <h1 className="title">Products</h1>
                <div className="product-container">
                    <aside>
                        <h2>Filters</h2>
                        <ProductFilterForm
                            categories={categories as Category[]}
                            allowedPriceRange={getAllowedPriceRange()}
                            filters={filters}
                            handleFilterChange={filterChangeHandler}
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