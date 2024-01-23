import { Link } from "react-router-dom"
import { Product } from "../../../types"
import { APP_ROUTES, IMAGE_PLACEHOLDER } from "../../../constants"
import { PencilSquareIcon, TrashIcon } from "../../Icons"
import styled from "styled-components"
import { AdminComponentGuard } from "../../../guards/AdminComponent"

const RoundedButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 5px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: transparent;

    &.primary {
        background: #0D0D0D;
        color: #fff;
    }

    &.danger {
        background: red;
    }

    &:hover {
        scale: 1.1;
    }
`;

const StyledProductCard = styled.article`
    position: relative;
    overflow: hidden;
    img {
        width: 100%;
        aspect-ratio: 1/1;
    }

    border: 2px solid #2b2b2b;
    border-radius: 7px;
    a {
        text-decoration: none;
        color: #fff;
    }

    &:hover {
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
        scale: 1.01;
    }
`;

const StyledCardInfo = styled.div`
    padding: 10px;
`;

const StyledAdminOverlay = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
`;

type Props = {
    data: Product;
    onDelete: (data: Product) => void,
    onEdit: (data: Product) => void
}

export const ProductCard: React.FC<Props> = ({ data, onDelete, onEdit }) => {

    return (
        <StyledProductCard>
            <Link to={APP_ROUTES.PRODUCT_DETAILS.replace(APP_ROUTES.ID, data.id.toString())} title={data.title}>
                <img
                    src={data.images[0]}
                    alt={data.title}
                    title={data.title}
                    onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300}
                    loading="lazy"
                />
                <StyledCardInfo>
                    <h4>{data.title}</h4>
                    <p>${data.price}</p>
                </StyledCardInfo>
            </Link>
            <AdminComponentGuard>
                <StyledAdminOverlay>
                    <RoundedButton
                        className="primary"
                        onClick={() => onEdit(data)}
                    >
                        <PencilSquareIcon />
                    </RoundedButton>
                    <RoundedButton
                        className="danger"
                        onClick={() => onDelete(data)}
                    >
                        <TrashIcon />
                    </RoundedButton>
                </StyledAdminOverlay>
            </AdminComponentGuard>
        </StyledProductCard>
    )
}