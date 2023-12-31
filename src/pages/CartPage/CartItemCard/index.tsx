import styled from "styled-components"
import { CartItem } from "../../../types"
import { QuantityInput } from "../../../shared/components/QuantityInput";
import { useEffect, useState } from "react";
import { useCart } from "../../../contexts/CartProvider";

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
    gap: 5x;
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

@media screen and (max-width: 576px) {
    flex-direction: column;

    .image {
        width: 100%;
        height: 129px;
    }
}
`;

type Props = {
    item: CartItem;
    handleRemove?: (id: number) => void;
    allowRemove?: boolean;
}


export const CartItemCard: React.FC<Props> = ({ item, handleRemove, allowRemove }) => {

    const { updateItem } = useCart();

    const [quantity, setQuantity] = useState(item.quantity);

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(prev - 1, 1));
    }

    useEffect(() => {
        updateItem(item.product_id, quantity);
    }, [quantity]);

    return (
        <CartItemCardContainer>
            <div className="image">
                <img src={item.product.images[0]} alt="" />
            </div>
            <div className="content">
                <p className="title">{item.product.title}</p>
                {
                    allowRemove ? (
                        <QuantityInput
                            quantity={quantity}
                            incrementQuantity={incrementQuantity}
                            decrementQuantity={decrementQuantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        />
                    ) : (
                        <p>Quantity: {quantity}</p>
                    )
                }
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