import { useQuery } from "react-query";
import { API_ENDPOINTS, QUERY_KEYS } from "../../constants";
import "./styles.css"
import { Loading } from "../../shared/components/Loading";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Category, Product } from "../../types";
import { ProductList } from "../../shared/components/ProductList";
import { ProductFilterForm } from "../../shared/components/ProductFilterForm";
import { useState } from "react";
import { fetchProducts } from "../../api";


export const ProductsPage = () => {

    const [filters, setFilters] = useState({
        price_min: 0,
        price_max: 0,
        categoryId: 0,
        title: ''
    });

    const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts, refetch } = useQuery([QUERY_KEYS.PRODUCTS, filters], () => fetchProducts(filters));

    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery(QUERY_KEYS.CATEGORIES, async () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        const res = await response;
        return await res.json();
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

    if (isLoadingCategories || isLoadingProducts) {
        return (
            <Loading />
        )
    }

    if (isErrorCategories || isErrorProducts) {
        return (
            <ErrorMessage />
        )
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
                            allowedPriceRange={getAllowedPriceRange()}
                            filters={filters}
                            handleFilterChange={(newFilters) => {
                                setFilters(newFilters as any);
                                refetch();
                            }}
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