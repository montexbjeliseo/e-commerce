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

export const CartItemList = () => {
    const { items, removeItem } = useCart();
    
    return (
        <UList>
            {items.map((item) => (
                <li key={item.product.id}>
                    <CartItemCard
                        item={item}
                        handleRemove={removeItem}
                    />
                </li>
            ))}
        </UList>
    )
}