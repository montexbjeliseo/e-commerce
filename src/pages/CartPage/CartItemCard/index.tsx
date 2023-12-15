import styled from "styled-components"
import { CartItem } from "../../../types"

const CartItemCardContainer = styled.div`
display: flex;
gap: 20px;
position: relative;
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.image {
    width: 129px;
    height: 129px;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #000;

    /* Paragraph 04 */
    font-family: Public Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.4px;
}

.price, .title {
    color: #000;

    /* Heading 04 */
    font-family: Public Sans;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 136.364% */
    letter-spacing: -0.55px;
}
.btn-remove {
    color: #000;
    border: none;
    background-color: transparent;
    opacity: 0.5;
    outline: none;
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.btn-remove:hover {
    opacity: 1;
    cursor: pointer;
}
`;

type Props = {
    item: CartItem;
    handleRemove?: (id: number) => void;
    allowRemove?: boolean;
}


export const CartItemCard: React.FC<Props> = ({ item, handleRemove, allowRemove }) => {
    return (
        <CartItemCardContainer>
            <div className="image">
                <img src={item.product.images[0]} alt="" />
            </div>
            <div className="content">
                <p className="title">{item.product.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="price">${item.product.price}</p>
            </div>
            {
                handleRemove && allowRemove && (
                    <button
                        className="btn-remove"
                        type="button"
                        onClick={() => handleRemove(item.product.id)}>
                        Remove
                    </button>
                )
            }

        </CartItemCardContainer>
    )
}