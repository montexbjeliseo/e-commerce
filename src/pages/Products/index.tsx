import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../constants";
import "./styles.css"
import { Loading } from "../../shared/components/Loading";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Category, ProductFilters } from "../../types";
import { ProductList } from "../../shared/components/ProductList";
import { ProductFilterForm } from "../../shared/components/ProductFilterForm";
import { useState } from "react";
import { fetchCategories } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { readProductFiltersFromSearchParams } from "../../utils/functions";


export const ProductsPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const [filters, setFilters] = useState<ProductFilters>(
        readProductFiltersFromSearchParams(searchParams)
    );

    const {
        data: categories,
        isLoading:
        isLoadingCategories,
        isError: isErrorCategories
    } = useQuery(QUERY_KEYS.CATEGORIES, () => fetchCategories());

    if (isLoadingCategories && !categories) {
        return (
            <Loading />
        )
    }

    if ((isErrorCategories && !categories)) {
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
                            allowedPriceRange={{ min: 0, max: 99999 }}
                            filters={filters}
                            handleFilterChange={filterChangeHandler}
                            handleClear={clearFiltersHandler}
                        />

                    </aside>
                    <main>
                        <ProductList filters={filters} />
                    </main>
                </div>
            </section>
        </>

    )
}