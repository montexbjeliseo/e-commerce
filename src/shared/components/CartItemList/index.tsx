import styled from "styled-components";
import { useCart } from "../../../contexts/CartProvider";
import { CartItemCard } from "../../../pages/CartPage/CartItemCard";
import { MutedText } from "../../../pages/Products/ProductLayout";

const ItemContainer = styled.section`
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
                <ItemContainer>
                    {items.map((item) => (
                        <article key={item.product.id}>
                            <CartItemCard
                                item={item}
                                allowRemove={allowRemove}
                                handleRemove={removeItem}
                            />
                        </article>
                    ))}
                </ItemContainer>
            ) : (
                <MutedText><i>Your cart is empty</i></MutedText>
            )}
        </>
    )
}