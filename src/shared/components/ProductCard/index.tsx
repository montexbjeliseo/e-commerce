import { Link } from "react-router-dom"
import { Product } from "../../../types"
import { APP_ROUTES, IMAGE_PLACEHOLDER } from "../../../constants"
import { PencilSquareIcon, TrashIcon } from "../../Icons"
import styled from "styled-components"
import { AdminComponentGuard } from "../../../guards/AdminComponent"

const Card = styled.article`
    img {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 1/1;
    }

    a {
        color: #111;
        text-decoration: none;
    }

    .product-title {
        color: #000;
        font-family: Public Sans;
        font-size: 17px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        /* 164.706% */
        letter-spacing: -0.4px;
    }

    position: relative;
    .cardInfo {
        display: none;
    }

    &:hover .cardInfo {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid rgb(43, 43, 43);
    }

    .cardInfo a {
        padding: 10px;
        border: 1px solid #fff;
        color: #fff;
        border-radius: 7px;
        font-size: 14px;
        font-weight: bold;
    }

    .overlay-admin {
        position: absolute;
        top: 5px;
        right: 1px;
        .btn-rounded {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding: 5px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: transparent;
        }

        .btn-rounded:hover {
            cursor: pointer;
        }

        .edit-btn {
            background: #0D0D0D;
            color: #fff;
        }

        .edit-btn:hover {
            background: #000;
        }

        .delete-btn {
            background: red;
            color: #fff;
        }
    }

`;

type Props = {
    data: Product;
    onDelete: (data: Product) => void,
    onEdit: (data: Product) => void
}

export const ProductCard: React.FC<Props> = ({ data, onDelete, onEdit }) => {

    return (
        <Card>
            <img
                src={data.images[0]}
                alt={data.title}
                title={data.title}
                onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300}
            />
            <div className="cardInfo">
                <h4>{data.title}</h4>
                <p>${data.price}</p>
                <Link to={APP_ROUTES.PRODUCT_DETAILS.replace(APP_ROUTES.ID, data.id.toString())} title={data.title}>
                    View
                </Link>
            </div>
            <AdminComponentGuard>
                <div className="overlay-admin">
                    <button
                        className="btn-rounded edit-btn"
                        onClick={() => onEdit(data)}
                    >
                        <PencilSquareIcon />
                    </button>
                    <button
                        className="btn-rounded delete-btn"
                        onClick={() => onDelete(data)}
                    >
                        <TrashIcon />
                    </button>
                </div>
            </AdminComponentGuard>
        </Card>
    )
}