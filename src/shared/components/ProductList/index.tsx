import { Product } from "../../../types"
import "./styles.css";
import { ProductCard } from "../ProductCard";

type ProductListProps = {
    products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {

    return (
        <div className="product-list">
            {(products as Product[]).map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    )
}