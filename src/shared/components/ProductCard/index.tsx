import { Link } from "react-router-dom"
import { Product } from "../../../types"
import { IMAGE_PLACEHOLDER } from "../../../constants"
import './styles.css'

export const ProductCard: React.FC<Product> = ({ id, title, price, images, category }) => {
    return (
        <div className="product-card">
            <img src={images[0]} alt={title} title={title} onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} />
            <p className="product-title">{title} - <i>{category.name}</i></p>
            <p>${price}</p>
            <div className="overlay">
                <Link to={`/products/${id}`} title={title}>
                    View Details
                </Link>
            </div>
        </div>
    )
}