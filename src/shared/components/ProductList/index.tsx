import { Product, ProductFilters } from "../../../types"
import "./styles.css";
import { ProductCard } from "../ProductCard";
import { fetchProducts } from "../../../api";
import { QUERY_KEYS } from "../../../constants";
import { useQuery } from "react-query";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";

type ProductListProps = {
    filters: ProductFilters;
}

export const ProductList: React.FC<ProductListProps> = ({ filters }) => {

    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts
    } = useQuery([QUERY_KEYS.PRODUCTS, filters], () => fetchProducts(filters));

    if (isLoadingProducts) {
        <Loading />
    }

    if (isErrorProducts) {
        <ErrorMessage />
    }

    if (!products || products.length === 0) {
        return (
            <div className="product-list">
                <h2>There are no products : (</h2>
            </div>
        )
    }

    return (
        <div className="product-list">
            {(products as Product[]).map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    )
}