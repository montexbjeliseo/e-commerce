import { Link } from "react-router-dom";
import { Product } from "../../../types"
import { APP_ROUTES } from "../../../constants";
import styled from "styled-components";

const HeroProductCardContainer = styled.div`
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    .product-image, 
    .product-info {
        width: 100%;
        height: 80vh;
    }
    .product-image {
        img {
            height: 100%;
            object-fit: cover;
        }
    }
    .product-info {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 18px;
        align-items: space-between;
        font-family: Public Sans;
        h1 {
            font-size: 2.5rem;
            font-weight: lighter;
            opacity: 0.8;
        }
        p a {
            padding: 12px;
            text-decoration: none;
            color: #fff;
            background: #0D0D0D;
        }

        @media (max-width: 576px) {
            color: #fff;
            text-shadow: 0 0 10px #000;
            position: absolute;
        }
    }

    .product-price {
        font-size: 1.5rem;
    }
    .product-description {
        opacity: 0.5;
        font-size: 1.1rem;
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`;

type Props = {
    product: Product;
}
export const HeroProductCard: React.FC<Props> = ({ product }) => {
    return (
        <HeroProductCardContainer>
            <div className="product-image">
                <img src={product.images[0]} />
            </div>
            <div className="product-info">
                <h1>{product.title}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p><Link to={APP_ROUTES.PRODUCT_DETAILS.replace(':id', product.id.toString())}>View Details</Link></p>
            </div>
        </HeroProductCardContainer>
    )
}