import { Product } from "../../../types"
import "./styles.css";
import { ProductCard } from "../ProductCard";

type ProductListProps = {
    products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {

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