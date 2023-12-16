import styled from "styled-components";
import { useCart } from "../../../contexts/CartProvider";
import { CartItemCard } from "../../../pages/CartPage/CartItemCard";

const UList = styled.ul`
    list-style: none;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

type Props = {
    allowRemove?: boolean;
}

export const CartItemList: React.FC<Props> = ({ allowRemove }) => {
    const { items, removeItem } = useCart();

    return (
        <>
            {items && items.length > 0 ? (
                <UList>
                    {items.map((item) => (
                        <li key={item.product.id}>
                            <CartItemCard
                                item={item}
                                allowRemove={allowRemove}
                                handleRemove={removeItem}
                            />
                        </li>
                    ))}
                </UList>
            ) : (
                <p className="text-muted"><i>Your cart is empty</i></p>
            )}
        </>
    )
}