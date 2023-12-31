import styled from "styled-components"
import { Product } from "../../../types"
import { APP_ROUTES, IMAGE_PLACEHOLDER } from "../../../constants";
import { Link } from "react-router-dom";

type Props = {
    product: Product;
    flip?: boolean;
}

const LatestProductCardContainer = styled.article`
    display: flex;
    
    .col1 {
        grid-area: col1;
    }

    .col2 {
        grid-area: col2;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 18px;

        a {
            text-decoration: none;
            background-color: #0D0D0D;
            color: #fff;
            font-weight: 700;
            padding: 12px;
            border: 1px solid #0D0D0D;
        }

        a:active {
            background-color: #fff;
            color: #0D0D0D;
        }
    }

    img {
        width: 300px;
        height: 300px;
        object-fit: cover;
    }

    &.flip {
       flex-direction: row-reverse;
       justify-content: space-between;
    }

    @media (max-width: 576px) {
        width: 100%;
        flex-direction: column;
        padding: 0 20px;
        img {
            width: 100%;
        }
    }
`;

export const LatestProductCard: React.FC<Props> = ({ product, flip }) => {

    return (
        <LatestProductCardContainer className={flip ? "flip" : ""}>
            <div className="col1 product-image">
                <img src={product.images[0]} alt={product.title} onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} />
            </div>
            <div className="col2 product-info">
                <h1>{product.title}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p><Link to={APP_ROUTES.PRODUCT_DETAILS.replace(':id', product.id.toString())}>View Details</Link></p>
            </div>
        </LatestProductCardContainer>
    )
}