import styled from "styled-components"
import { Product } from "../../../types"
import { APP_ROUTES, IMAGE_PLACEHOLDER } from "../../../constants";
import { Link } from "react-router-dom";

type Props = {
    product: Product;
}

const LatestProductCardContainer = styled.article`
    max-height: 200px; 
    padding: 0;
    box-sizing: border-box;
    display: flex;
    width: 100%;

    border: 2px solid rgb(43, 43, 43);
    border-radius: 7px;

    .product-information {
        width: 100%;
        padding: 0;
        margin: 0;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        a {
            text-decoration: none;
            background-color: #0D0D0D;
            color: #fff;
            font-weight: 700;
            padding: 10px;
            border: 2px solid rgb(43, 43, 43);
            border-radius: 7px;
        }

        a:hover {
            background-color: #010101;
        }

        a:active {
            background-color: #fff;
            color: #0D0D0D;
        }
    }

    img {
        max-width: 200px;
        max-height: 200px;
        object-fit: cover;
    }

    @media (max-width: 576px) {
        img {
            width: 40%;
        }
    }
`;

export const LatestProductCard: React.FC<Props> = ({ product }) => {

    return (
        <LatestProductCardContainer>
            {/* <div> */}
                <img src={product.images[0]} alt={product.title} onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} />
            {/* </div> */}
            <div className="product-information">
                <h1>{product.title}</h1>
                <p>${product.price}</p>
                <p><Link to={APP_ROUTES.PRODUCT_DETAILS.replace(':id', product.id.toString())}>View Details</Link></p>
            </div>
        </LatestProductCardContainer>
    )
}