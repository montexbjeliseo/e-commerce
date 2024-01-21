import styled from "styled-components";
import { useCart } from "../../../contexts/CartProvider";
import { InputText } from "../InputText";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;

    .divider {
        width: 100%;
        height: 2px;
        background: rgb(43, 43, 43);   
    }
`;

export const OrderSummaryPreview = () => {

    const { items } = useCart();

    return (
        <Container>
            <label>Cupon code: <br />
                <InputText width="100%" type="text" placeholder="Enter cupon code here..." />
            </label>
            <p>Subtotal: ${items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
            <p>Shipping: <span>Calculated at checkout</span></p>
            <div className="divider"></div>
            <p>Total: ${items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
        </Container>
    )
}