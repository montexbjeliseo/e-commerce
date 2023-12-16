import styled from "styled-components";
import { CartItemList } from "../CartItemList"
import { OrderSummaryPreview } from "../OrderSummaryPreview";

const Container = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const PreviewCartItem = () => {

    return (
        <Container>
            <h2>Your cart</h2>
            <CartItemList />
            <OrderSummaryPreview />
        </Container>
    )
}