import { useQuery } from "react-query";
import { API_ENDPOINTS, QUERY_KEYS } from "../../constants";
import "./styles.css"
import { Loading } from "../../shared/components/Loading";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { CheckboxInput } from "../../shared/components/CheckboxInput";
import { Category, Product } from "../../types";
import { ProductList } from "../../shared/components/ProductList";


export const ProductsPage = () => {

    const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery(QUERY_KEYS.PRODUCTS, () => {
        const response = fetch(API_ENDPOINTS.PRODUCTS);
        return response.then((res) => res.json());
    });

    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery(QUERY_KEYS.CATEGORIES, () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        return response.then((res) => res.json());
    })

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
                        <ul>
                            <li>title</li>
                            <li>price range</li>
                            <li>category</li>
                        </ul>
                        <h3>Categories</h3>
                        <ul className="filter-category-list">
                            {(categories as Category[]).map((category) => (
                                <li key={category.id}>
                                    <CheckboxInput name="category" value={category.id} label={category.name} />
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <main>
                        <ProductList products={products as Product[]} />
                    </main>
                </div>
            </section>
        </>

    )
}