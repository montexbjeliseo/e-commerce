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
import { FunnelIcon } from "../../shared/Icons";
import { FullContainer } from "../../shared/components/FullContainer";


export const ProductsPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const [filters, setFilters] = useState<ProductFilters>(
        readProductFiltersFromSearchParams(searchParams)
    );

    const [filtersAsModal, setFiltersAsModal] = useState(false);

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

        setFiltersAsModal(false);

    }

    const clearFiltersHandler = () => {
        const newSearchParams = new URLSearchParams();
        navigate(`?${newSearchParams.toString()}`, { replace: true });
        setFilters({});
        setFiltersAsModal(false);
    }

    const handleFilterModal = () => {
        setFiltersAsModal(!filtersAsModal);
    }

    return (
        <>
            <FullContainer>
                <h2 className="title">Products</h2>
                <div className="product-container">
                    <button className={`toggle-filter-btn ${!filtersAsModal ? "active" : ""}`} onClick={handleFilterModal}><FunnelIcon /></button>
                    <aside className={`${filtersAsModal ? "asModal" : ""}`}>
                    <button className={`close-filter ${filtersAsModal ? "active" : ""}`} onClick={handleFilterModal}>X</button>
                        <h3>Filters</h3>
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
            </FullContainer>
        </>

    )
}