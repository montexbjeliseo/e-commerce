import styled from "styled-components";
import { useCart } from "../../../contexts/CartProvider";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const OrderSummaryPreview = () => {

    const { items } = useCart();

    return (
        <Container>
            <label>Cupon code: <br />
                <input className="text-input" type="text" placeholder="Enter cupon code here..." />
            </label>
            <p>Subtotal: ${items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
            <p>Shipping: <span>Calculated at checkout</span></p>
            <hr />
            <p>Total: ${items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
        </Container>
    )
}